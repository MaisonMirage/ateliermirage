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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
