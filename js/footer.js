/* ═══════════════════════════════════════════════
   FOOTER — accordéons repliables sur mobile (façon YC)
   Sur ≤768px, chaque colonne du footer se replie ;
   on tape le titre pour ouvrir/fermer. Aucun effet
   sur desktop (les colonnes restent déployées).
═══════════════════════════════════════════════ */
(function () {
  'use strict';

  var MQ = window.matchMedia('(max-width: 768px)');

  function setup() {
    var cols = document.querySelectorAll('.footer-cols .footer-col');
    Array.prototype.forEach.call(cols, function (col) {
      var title = col.querySelector('.footer-col-title');
      if (!title || title.getAttribute('data-acc') === '1') return;
      title.setAttribute('data-acc', '1');
      title.setAttribute('role', 'button');
      title.setAttribute('tabindex', '0');
      title.setAttribute('aria-expanded', 'false');

      function toggle() {
        if (!MQ.matches) return;
        var open = col.classList.toggle('is-open');
        title.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      title.addEventListener('click', toggle);
      title.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });
  }

  /* Repasse en desktop : on rouvre tout (l'accordéon ne vaut qu'en mobile) */
  function onChange() {
    if (MQ.matches) return;
    var open = document.querySelectorAll('.footer-cols .footer-col.is-open');
    Array.prototype.forEach.call(open, function (col) {
      col.classList.remove('is-open');
      var t = col.querySelector('.footer-col-title');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }
  if (MQ.addEventListener) { MQ.addEventListener('change', onChange); }
  else if (MQ.addListener) { MQ.addListener(onChange); }

  /* ─────────────────────────────────────────────────────────────
     NEWSLETTER (footer) → Formspree
     Les champs n'avaient pas de back-end (onsubmit="return false").
     On intercepte l'envoi et on POST vers Formspree, sans quitter la page.
  ───────────────────────────────────────────────────────────── */
  var NEWSLETTER_ENDPOINT = 'https://formspree.io/f/mreanzqp';
  function wireNewsletter() {
    var forms = document.querySelectorAll('.footer-newsletter');
    Array.prototype.forEach.call(forms, function (form) {
      if (form.dataset.nlBound === '1') return;
      form.dataset.nlBound = '1';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        if (!input || !input.value || !input.checkValidity()) { if (input) input.focus(); return; }
        var btn = form.querySelector('button');
        var orig = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = '…'; }
        var data = new FormData();
        data.append('email', input.value);
        data.append('_subject', 'Nouvelle inscription newsletter — Atelier Mirage');
        data.append('source', 'newsletter-footer');
        fetch(NEWSLETTER_ENDPOINT, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
          .then(function (r) {
            if (!r.ok) throw new Error('fail');
            form.innerHTML = '<p class="footer-newsletter-ok" style="font-size:.8rem;color:inherit;margin:0;">Merci, votre inscription est bien prise en compte.</p>';
          })
          .catch(function () {
            if (btn) { btn.disabled = false; btn.textContent = orig; }
            alert('Inscription momentanément indisponible. Réessayez ou écrivez-nous à contact@ateliermirage.fr.');
          });
      });
    });
  }

  function boot() { setup(); wireNewsletter(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
