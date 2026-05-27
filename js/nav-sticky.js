/* ────────────────────────────────────────────────────────────────
   nav-sticky.js — comportement YC partagé pour la navbar
   ─ Pages claires (.navbar--yc seul) : nav crème + sticky + masquage
     descendant / réapparition montante.
   ─ Pages sombres (.navbar--yc-dark + hero photo) : nav transparente
     sur le hero, devient crème (nav-solid) une fois le hero dépassé,
     avec swap des logos cream ↔ sombre. Le masquage ne s'active
     qu'après le hero.
   ─ S'active uniquement si la nav porte `.navbar--sticky`.
──────────────────────────────────────────────────────────────── */
(function () {
  function init() {
    var nav = document.getElementById('navbar');
    if (!nav || !nav.classList.contains('navbar--sticky')) return;

    // Évite tout double-binding (si une page a déjà sa propre logique sticky)
    if (nav.dataset.stickyBound === '1') return;
    nav.dataset.stickyBound = '1';

    var isDark = nav.classList.contains('navbar--yc-dark');

    // Détection du hero (premier grand bloc visuel VISIBLE sombre après la nav)
    // On filtre les display:none (cas mobile où le hero desktop est masqué)
    var heroCandidates = document.querySelectorAll('.hero, .pro-hero, .story-hero, [data-hero], .hero-mobile-stack');
    var hero = null;
    for (var i = 0; i < heroCandidates.length; i++) {
      var el = heroCandidates[i];
      if (window.getComputedStyle(el).display !== 'none' && el.offsetHeight > 0) {
        hero = el;
        break;
      }
    }
    if (!hero) hero = heroCandidates[0]; // fallback

    var sig = nav.querySelector('.brand-logo');
    var wm  = nav.querySelector('.brand-wordmark');
    var lastY = window.pageYOffset || 0;
    // Variante claire : démarre déjà solide (classe nav-solid posée en HTML).
    // Variante sombre : démarre transparente.
    var solid = !isDark;
    var ticking = false;

    function swapLogo(img, toSolid) {
      if (!img) return;
      var src = img.getAttribute('src');
      if (!src) return;
      if (toSolid) {
        // dark logo : on retire le suffixe -cream
        if (/-cream\.\w+$/.test(src)) {
          img.setAttribute('src', src.replace(/-cream(\.\w+)$/, '$1'));
        }
      } else {
        // cream logo : on l'ajoute s'il manque
        if (!/-cream\.\w+$/.test(src)) {
          img.setAttribute('src', src.replace(/(\.\w+)$/, '-cream$1'));
        }
      }
    }

    function apply() {
      ticking = false;
      var y = window.pageYOffset || 0;
      var limit = hero ? Math.max(80, hero.offsetHeight - nav.offsetHeight) : 80;
      var past = y > limit;

      // Pour la variante sombre : on bascule .nav-solid + on swap les logos
      // une fois le hero franchi.
      if (isDark) {
        if (past !== solid) {
          solid = past;
          nav.classList.toggle('nav-solid', solid);
          swapLogo(sig, solid);
          swapLogo(wm, solid);
        }
      }

      // Hide-on-scroll : la nav glisse vers le haut en descendant,
      // réapparaît en remontant.
      // Variante sombre : actif uniquement après le hero.
      // Variante claire : actif dès 20px de scroll pour libérer le haut
      // de viewport (sections avec catégories sticky, filtres, etc.).
      var canHide = isDark ? past : (y > 20);
      if (canHide && y > lastY + 5) {
        nav.classList.add('nav-hidden');
      } else if (y < lastY - 5 || !canHide) {
        nav.classList.remove('nav-hidden');
      }

      lastY = y;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(apply); ticking = true; }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
