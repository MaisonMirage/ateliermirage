/* ═══════════════════════════════════════════════════════════════
   ATELIER MIRAGE — Création d'une session Stripe Checkout
   Fonction serverless Vercel · POST /api/checkout

   La clé secrète Stripe est lue dans la variable d'environnement
   STRIPE_SECRET_KEY (à définir dans le dashboard Vercel —
   Settings → Environment Variables). Elle ne figure JAMAIS
   dans le code ni dans le dépôt.
   ═══════════════════════════════════════════════════════════════ */

const Stripe = require('stripe');

/* Catalogue serveur — source de vérité des prix.
   Prix unique : 9,90 € = 990 centimes. Le navigateur n'envoie
   que des identifiants + quantités ; jamais les prix. */
const PRICE_CENTS = 990;
const PRODUITS = {
  'poulpe': 'Le Poulpe',
  'fraise': 'La Fraise',
  'mangue': 'La Mangue',
  'framboise': 'La Framboise',
  'peche': 'La Pêche',
  'citron': 'Le Citron',
  'passion': 'La Passion',
  'baklava': 'Le Baklava',
  'pistache': 'La Pistache',
  'cacao': 'Le Cacao',
  'arachide': "L'Arachide",
  'cacahuete': 'La Cacahuète',
  'datte': 'La Datte',
  'vanille': 'La Vanille',
  'boule-cristal': 'La Boule de Cristal',
  'nigiri': 'Le Nigiri'
};

const FRAIS_LIVRAISON_CENTS = 490;   // 4,90 € — livraison par coursier
const SEUIL_FRANCO_CENTS = 7000;     // livraison offerte dès 70 €

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return res.status(500).json({ error: 'Configuration de paiement manquante.' });
  }
  const stripe = Stripe(secret);

  try {
    const body = typeof req.body === 'string'
      ? JSON.parse(req.body || '{}')
      : (req.body || {});

    const items = Array.isArray(body.items) ? body.items : [];
    const fulfillment = body.fulfillment === 'livraison' ? 'livraison' : 'retrait';

    /* Lignes de commande — noms et prix recalculés ici, côté serveur */
    const line_items = [];
    let sousTotal = 0;
    for (const it of items) {
      const id = String((it && it.id) || '');
      const nom = PRODUITS[id];
      if (!nom) continue;                       // identifiant inconnu → ignoré
      let qty = parseInt(it && it.qty, 10);
      if (!Number.isFinite(qty) || qty < 1) continue;
      if (qty > 99) qty = 99;
      sousTotal += PRICE_CENTS * qty;
      line_items.push({
        quantity: qty,
        price_data: {
          currency: 'eur',
          unit_amount: PRICE_CENTS,
          product_data: { name: nom }
        }
      });
    }

    if (!line_items.length) {
      return res.status(400).json({ error: 'Panier vide ou invalide.' });
    }

    /* Livraison — 4,90 € si livraison sous 70 €, offerte au-delà ;
       retrait en boutique → aucun frais */
    if (fulfillment === 'livraison' && sousTotal < SEUIL_FRANCO_CENTS) {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: FRAIS_LIVRAISON_CENTS,
          product_data: { name: 'Livraison par coursier' }
        }
      });
    }

    const origin = req.headers.origin
      || (req.headers.host ? 'https://' + req.headers.host : '');

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale: 'fr',
      line_items: line_items,
      success_url: origin + '/confirmation.html?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: origin + '/index.html',
      metadata: {
        mode: fulfillment,
        adresse: fulfillment === 'livraison'
          ? String(body.address || '').slice(0, 480)
          : 'Retrait à l\'atelier',
        note: String(body.note || '').slice(0, 480)
      }
    });

    return res.status(200).json({ url: session.url });
  } catch (e) {
    return res.status(500).json({ error: 'Le paiement n\'a pas pu être initié.' });
  }
};
