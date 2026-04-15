// ====================================
// ATELIER MIRAGE — JS PARTAGÉ PAGES PRODUIT
// ====================================

// Expose carousel init pour pouvoir l'appeler depuis le modal catalogue
window.AtelierMirage = window.AtelierMirage || {};
window.AtelierMirage.initCarousels = function(root) {
  const scope = root || document;
  scope.querySelectorAll('.product-img-main.is-carousel:not([data-carousel-inited])').forEach(carousel => {
    carousel.setAttribute('data-carousel-inited', 'true');
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
    const prev = carousel.querySelector('.carousel-arrow.prev');
    const next = carousel.querySelector('.carousel-arrow.next');
    if (!track || slides.length < 2) return;

    let current = 0;

    const updateCaption = (idx) => {
      const caption = carousel.parentElement.querySelector('.product-gallery-caption');
      if (!caption) return;
      const slideCaption = slides[idx].dataset.caption || '';
      caption.textContent = slideCaption;
    };

    const setActive = (idx) => {
      current = Math.max(0, Math.min(slides.length - 1, idx));
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
      if (prev) prev.toggleAttribute('disabled', current === 0);
      if (next) next.toggleAttribute('disabled', current === slides.length - 1);
      updateCaption(current);
    };

    const goTo = (idx) => {
      current = Math.max(0, Math.min(slides.length - 1, idx));
      slides[current].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      setActive(current);
    };

    let scrollTimeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const idx = Math.round(track.scrollLeft / track.clientWidth);
        if (idx !== current) setActive(idx);
      }, 80);
    });

    if (prev) prev.addEventListener('click', () => goTo(current - 1));
    if (next) next.addEventListener('click', () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
    });

    setActive(0);
  });
};

document.addEventListener('DOMContentLoaded', () => {

  // 1bis. Carousels produit (Grolet-style) sur page produit
  window.AtelierMirage.initCarousels(document);

  // 1. Galerie legacy — swap src si thumb clic (compat pages sans carousel)
  document.querySelectorAll('.product-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const mainImg = document.getElementById('mainImg');
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
