/* ═══════════════════════════════════════════════════════════════
   ATELIER MIRAGE — Webhook Stripe · POST /api/stripe-webhook
   À chaque commande payée (checkout.session.completed), envoie un
   e-mail récapitulatif à l'atelier (produits + client + adresse + note).
   Aucune commande ratée, même sans ouvrir le dashboard Stripe.

   Variables d'environnement (Vercel → Settings → Environment Variables) :
   ─ STRIPE_SECRET_KEY      : déjà présente (clé secrète Stripe)
   ─ STRIPE_WEBHOOK_SECRET  : « whsec_… » donné par Stripe à la création
                              du endpoint webhook
   ─ RESEND_API_KEY         : clé API Resend (resend.com) pour l'envoi d'e-mail
   ─ ORDER_EMAIL            : adresse qui reçoit les commandes
                              (ex. contact@ateliermirage.fr)
   ─ ORDER_FROM (optionnel) : expéditeur. Par défaut onboarding@resend.dev
                              (fonctionne sans domaine vérifié, vers ORDER_EMAIL).
                              En prod : « Atelier Mirage <commandes@ateliermirage.fr> »
                              après vérification du domaine dans Resend.
   ═══════════════════════════════════════════════════════════════ */

const Stripe = require('stripe');

/* Stripe a besoin du corps BRUT (non parsé) pour vérifier la signature */
module.exports.config = { api: { bodyParser: false } };

function rawBody(req) {
  return new Promise(function (resolve, reject) {
    var chunks = [];
    req.on('data', function (c) { chunks.push(Buffer.from(c)); });
    req.on('end', function () { resolve(Buffer.concat(chunks)); });
    req.on('error', reject);
  });
}

function euro(cents) {
  return (cents / 100).toFixed(2).replace('.', ',') + ' €';
}

async function sendEmail(subject, text, html) {
  var key = process.env.RESEND_API_KEY;
  var to = process.env.ORDER_EMAIL;
  var from = process.env.ORDER_FROM || 'Atelier Mirage <onboarding@resend.dev>';
  if (!key || !to) { console.error('RESEND_API_KEY ou ORDER_EMAIL manquant'); return false; }
  var r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: from, to: [to], subject: subject, text: text, html: html })
  });
  if (!r.ok) { console.error('Resend error', await r.text()); return false; }
  return true;
}

module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Méthode non autorisée.');
  }

  var secret = process.env.STRIPE_SECRET_KEY;
  var whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !whSecret) {
    return res.status(500).json({ error: 'Configuration webhook manquante.' });
  }
  var stripe = Stripe(secret);

  /* 1. Vérifier la signature Stripe */
  var event;
  try {
    var raw = await rawBody(req);
    var sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(raw, sig, whSecret);
  } catch (e) {
    return res.status(400).send('Signature webhook invalide : ' + e.message);
  }

  /* 2. Traiter uniquement les commandes payées */
  if (event.type === 'checkout.session.completed') {
    var session = event.data.object;
    try {
      var li = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
      var lignes = li.data.map(function (it) {
        return '• ' + it.quantity + ' × ' + it.description + ' — ' + euro(it.amount_total);
      }).join('\n');

      var md = session.metadata || {};
      var cd = session.customer_details || {};
      var nom = cd.name || '—';
      var mail = cd.email || session.customer_email || '—';
      var tel = cd.phone || '—';
      var mode = md.mode === 'livraison' ? 'Livraison par coursier' : 'Retrait à l\'atelier';
      var adresse = md.adresse || '—';
      var note = md.note || '—';
      var total = euro(session.amount_total);

      var text =
        'NOUVELLE COMMANDE — Atelier Mirage\n' +
        '====================================\n\n' +
        'Client   : ' + nom + '\n' +
        'Email    : ' + mail + '\n' +
        'Téléphone: ' + tel + '\n\n' +
        'Mode     : ' + mode + '\n' +
        'Adresse  : ' + adresse + '\n\n' +
        'Produits :\n' + lignes + '\n\n' +
        'TOTAL    : ' + total + '\n\n' +
        'Note du client : ' + note + '\n\n' +
        '------------------------------------\n' +
        'Réf. Stripe : ' + session.id + '\n';

      var html =
        '<div style="font-family:Arial,Helvetica,sans-serif;color:#2d1e14;max-width:560px;">' +
        '<h2 style="color:#6d4833;margin:0 0 4px;">Nouvelle commande</h2>' +
        '<p style="margin:0 0 16px;color:#9b8568;font-size:13px;">Atelier Mirage</p>' +
        '<table style="font-size:14px;line-height:1.6;border-collapse:collapse;">' +
        '<tr><td style="padding-right:12px;color:#9b8568;">Client</td><td>' + nom + '</td></tr>' +
        '<tr><td style="padding-right:12px;color:#9b8568;">Email</td><td>' + mail + '</td></tr>' +
        '<tr><td style="padding-right:12px;color:#9b8568;">Téléphone</td><td>' + tel + '</td></tr>' +
        '<tr><td style="padding-right:12px;color:#9b8568;">Mode</td><td>' + mode + '</td></tr>' +
        '<tr><td style="padding-right:12px;color:#9b8568;vertical-align:top;">Adresse</td><td>' + adresse + '</td></tr>' +
        '</table>' +
        '<h3 style="color:#6d4833;margin:18px 0 6px;">Produits</h3>' +
        '<pre style="font-family:inherit;font-size:14px;white-space:pre-wrap;margin:0;">' + lignes + '</pre>' +
        '<p style="font-size:16px;font-weight:bold;margin:14px 0;">Total : ' + total + '</p>' +
        '<h3 style="color:#6d4833;margin:14px 0 6px;">Note du client</h3>' +
        '<p style="font-size:14px;margin:0;">' + note + '</p>' +
        '<p style="font-size:11px;color:#b3a18d;margin-top:18px;">Réf. Stripe : ' + session.id + '</p>' +
        '</div>';

      await sendEmail('🧁 Nouvelle commande — ' + total + ' (' + mode + ')', text, html);
    } catch (e) {
      console.error('Erreur traitement commande :', e);
      /* On renvoie 200 quand même : la commande est payée, inutile que
         Stripe retente en boucle pour un souci d'e-mail. */
    }
  }

  return res.status(200).json({ received: true });
};
