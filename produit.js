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

/* Galerie produit — vignettes + zoom plein écran.
   Fonctionne avec N images : il suffit d'ajouter des <img> dans
   .product-img-main (après #mainImg) ; tout le reste est généré ici. */
function initProductGallery() {
  var gallery = document.querySelector('.product-gallery');
  if (!gallery) return;
  var stage = gallery.querySelector('.product-img-main');
  if (!stage || stage.classList.contains('is-carousel')) return;
  var imgEls = Array.prototype.slice.call(stage.querySelectorAll('img'));
  if (imgEls.length === 0) return;

  var mainImg = document.getElementById('mainImg') || imgEls[0];
  var shots = imgEls.map(function (im) {
    return { src: im.getAttribute('src'), alt: im.getAttribute('alt') || '' };
  });
  imgEls.forEach(function (im) { if (im !== mainImg && im.parentNode) im.parentNode.removeChild(im); });
  var current = 0;

  var zoom = document.createElement('button');
  zoom.type = 'button';
  zoom.className = 'product-zoom-btn';
  zoom.setAttribute('aria-label', 'Agrandir la photo');
  zoom.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="6.6" cy="6.6" r="5.1" stroke="currentColor" stroke-width="1.3"/><path d="M10.4 10.4 14.5 14.5M6.6 4.4v4.4M4.4 6.6h4.4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';
  stage.appendChild(zoom);

  var lb = document.createElement('div');
  lb.className = 'product-lightbox';
  lb.innerHTML =
    '<button type="button" class="plb-close" aria-label="Fermer">×</button>'
    + '<button type="button" class="plb-nav plb-prev" aria-label="Photo precedente">‹</button>'
    + '<img class="plb-img" alt="">'
    + '<button type="button" class="plb-nav plb-next" aria-label="Photo suivante">›</button>';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('.plb-img');

  function syncThumbs() {
    var thumbs = gallery.querySelectorAll('.product-thumb');
    Array.prototype.forEach.call(thumbs, function (t, ti) {
      t.classList.toggle('active', ti === current);
    });
  }
  function showMain(i, animate) {
    current = (i + shots.length) % shots.length;
    if (animate) {
      mainImg.style.opacity = '0';
      setTimeout(function () {
        mainImg.src = shots[current].src;
        mainImg.alt = shots[current].alt;
        mainImg.style.opacity = '1';
      }, 180);
    } else {
      mainImg.src = shots[current].src;
      mainImg.alt = shots[current].alt;
    }
    syncThumbs();
  }

  if (shots.length > 1) {
    var thumbWrap = document.createElement('div');
    thumbWrap.className = 'product-thumbs';
    shots.forEach(function (s, i) {
      var t = document.createElement('button');
      t.type = 'button';
      t.className = 'product-thumb' + (i === 0 ? ' active' : '');
      t.setAttribute('aria-label', 'Photo ' + (i + 1));
      t.innerHTML = '<img src="' + s.src + '" alt="">';
      t.addEventListener('click', function () { showMain(i, true); });
      thumbWrap.appendChild(t);
    });
    gallery.appendChild(thumbWrap);
  }

  function openLb() {
    lbImg.src = shots[current].src;
    lbImg.alt = shots[current].alt;
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    Array.prototype.forEach.call(lb.querySelectorAll('.plb-nav'), function (n) {
      n.style.display = shots.length > 1 ? '' : 'none';
    });
  }
  function closeLb() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function lbStep(d) {
    current = (current + d + shots.length) % shots.length;
    lbImg.src = shots[current].src;
    lbImg.alt = shots[current].alt;
    syncThumbs();
  }
  zoom.addEventListener('click', openLb);
  mainImg.style.cursor = 'zoom-in';
  mainImg.addEventListener('click', openLb);
  lb.querySelector('.plb-close').addEventListener('click', closeLb);
  lb.querySelector('.plb-prev').addEventListener('click', function () { lbStep(-1); });
  lb.querySelector('.plb-next').addEventListener('click', function () { lbStep(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') lbStep(-1);
    else if (e.key === 'ArrowRight') lbStep(1);
  });
}

document.addEventListener('DOMContentLoaded', () => {

  // 1bis. Carousels produit (Grolet-style) sur page produit
  window.AtelierMirage.initCarousels(document);

  // 1bis-2. Galerie produit — vignettes + zoom (prête pour N photos)
  initProductGallery();

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

  // 1ter. Quantité + Ajouter au panier (page produit)
  const qtyValue = document.getElementById('qtyValue');
  if (qtyValue) {
    const minusBtn = document.querySelector('.qty-minus');
    const plusBtn  = document.querySelector('.qty-plus');
    let qty = 1;
    const renderQty = () => { qtyValue.textContent = qty; if (minusBtn) minusBtn.disabled = qty <= 1; };
    if (minusBtn) minusBtn.addEventListener('click', () => { if (qty > 1)  { qty--; renderQty(); } });
    if (plusBtn)  plusBtn.addEventListener('click',  () => { if (qty < 99) { qty++; renderQty(); } });
    renderQty();
  }
  // Note : #addToCartBtn et .related-add sont branchés au vrai panier par cart.js

  // 1quater. Carrousel « dans la même collection »
  const relTrack = document.getElementById('relatedTrack');
  const relBar = document.getElementById('relatedProgress');
  if (relTrack && relBar) {
    const relPrev = document.getElementById('relPrev');
    const relNext = document.getElementById('relNext');
    const updateRel = () => {
      const filled = (relTrack.scrollLeft + relTrack.clientWidth) / relTrack.scrollWidth;
      relBar.style.width = Math.min(100, filled * 100) + '%';
      const maxScroll = relTrack.scrollWidth - relTrack.clientWidth;
      if (relPrev) relPrev.disabled = relTrack.scrollLeft <= 2;
      if (relNext) relNext.disabled = relTrack.scrollLeft >= maxScroll - 2;
    };
    const step = () => Math.max(220, relTrack.clientWidth * 0.75);
    if (relPrev) relPrev.addEventListener('click', () => relTrack.scrollBy({ left: -step(), behavior: 'smooth' }));
    if (relNext) relNext.addEventListener('click', () => relTrack.scrollBy({ left: step(), behavior: 'smooth' }));
    relTrack.addEventListener('scroll', updateRel, { passive: true });
    window.addEventListener('resize', updateRel);
    updateRel();
  }
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
