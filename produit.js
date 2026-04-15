// ====================================
// ATELIER MIRAGE — JS PARTAGÉ PAGES PRODUIT
// ====================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Galerie d'images — switch packshot ↔ intérieur + legacy src swap
  document.querySelectorAll('.product-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const mainContainer = document.querySelector('.product-img-main');
      const mainImg = document.getElementById('mainImg');
      const view = thumb.dataset.view;

      if (mainContainer && mainContainer.classList.contains('has-interior') && (view === 'interior' || view === 'packshot')) {
        // Mode double-calque : toggle crossfade
        if (view === 'interior') {
          mainContainer.classList.add('show-interior');
        } else {
          mainContainer.classList.remove('show-interior');
        }
        return;
      }

      // Mode legacy : swap src
      if (mainImg && thumb.dataset.src) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
          mainImg.src = thumb.dataset.src;
          if (thumb.dataset.alt) mainImg.alt = thumb.dataset.alt;
          mainImg.style.opacity = '1';
        }, 200);
      }
    });
  });

  // 2. Burger menu — avec Escape, close on bg, navbar inversion
  const navBurger = document.getElementById('navBurger');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const navbar = document.getElementById('navbar');

  if (navBurger && mobileOverlay && navbar) {
    function toggleMenu() {
      const opening = !navBurger.classList.contains('open');
      navBurger.classList.toggle('open');
      navBurger.setAttribute('aria-expanded', opening);
      mobileOverlay.classList.toggle('open');
      navbar.classList.toggle('menu-open');
      document.body.style.overflow = opening ? 'hidden' : '';
      document.body.classList.toggle('menu-active', opening);
    }
    function closeMenu() {
      navBurger.classList.remove('open');
      navBurger.setAttribute('aria-expanded', 'false');
      mobileOverlay.classList.remove('open');
      navbar.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.body.classList.remove('menu-active');
    }

    navBurger.addEventListener('click', toggleMenu);
    document.querySelectorAll('.mobile-nav-item').forEach(l => l.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && mobileOverlay.classList.contains('open')) closeMenu(); });
    mobileOverlay.addEventListener('click', e => { if (e.target === mobileOverlay) closeMenu(); });
  }

  // 3. Navbar scroll effect
  const waitGSAP = setInterval(() => {
    if (window.gsap && window.ScrollTrigger) {
      clearInterval(waitGSAP);
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.create({
        start: 'top -60',
        onEnter: () => document.getElementById('navbar').classList.add('scrolled'),
        onLeaveBack: () => document.getElementById('navbar').classList.remove('scrolled')
      });
    }
  }, 50);

});
