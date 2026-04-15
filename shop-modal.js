// ====================================
// ATELIER MIRAGE — MODAL PRODUIT CATALOGUE
// Desktop (>900px) : clic carte → modal lightbox
// Mobile  (<=900px) : navigation classique vers la page produit
// ====================================

// Carousel init standalone (même code que produit.js, on ne veut pas charger produit.js
// sur index.html pour éviter les conflits avec la JS de la homepage)
window.AtelierMirage = window.AtelierMirage || {};
if (!window.AtelierMirage.initCarousels) {
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
        caption.textContent = slides[idx].dataset.caption || '';
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
}

// === AWARD · Palette ambiante par produit ===
// Chaque dominant est choisi à la main pour harmoniser avec le packshot.
// Utilisé pour le backdrop du modal + effets d'ambiance.
const ATELIER_PALETTE = {
  'produit-passion.html':   { c1: '#F5A623', c2: '#C2410C', name: 'Passion' },
  'produit-mangue.html':    { c1: '#FDB842', c2: '#B45309', name: 'Mangue' },
  'produit-framboise.html': { c1: '#E11D48', c2: '#7F1D1D', name: 'Framboise' },
  'produit-vanille.html':   { c1: '#E8DDB5', c2: '#78350F', name: 'Vanille' },
  'produit-arachide.html':  { c1: '#C9862D', c2: '#5C2E0B', name: 'Arachide' },
  'produit-cacahuete.html': { c1: '#B87333', c2: '#4A2410', name: 'Cacahuète' },
  'produit-cacao.html':     { c1: '#6B3410', c2: '#1F1208', name: 'Cacao' },
  'produit-citron.html':    { c1: '#FACC15', c2: '#713F12', name: 'Citron' },
  'produit-datte.html':     { c1: '#9A5B2B', c2: '#3B1E0A', name: 'Datte' },
  'produit-fraise.html':    { c1: '#E11D48', c2: '#7F1D1D', name: 'Fraise' },
  'produit-peche.html':     { c1: '#F4A692', c2: '#9B3A1A', name: 'Pêche' },
  'produit-pistache.html':  { c1: '#84CC16', c2: '#365314', name: 'Pistache' },
  'produit-poulpe.html':    { c1: '#3A6FB0', c2: '#0F2A4A', name: 'Poulpe' },
};

(function() {
  const BP = window.matchMedia('(min-width: 901px)');
  const modal = document.getElementById('shop-modal');
  if (!modal) return;

  const panel = modal.querySelector('.shop-modal-panel');
  const body = modal.querySelector('.shop-modal-body');
  const prevBtn = modal.querySelector('.shop-modal-arrow.prev');
  const nextBtn = modal.querySelector('.shop-modal-arrow.next');
  const closeBtn = modal.querySelector('.shop-modal-close');
  const backdrop = modal.querySelector('.shop-modal-backdrop');

  const cards = Array.from(document.querySelectorAll('.boutique .shop-card'))
    .filter(c => {
      const href = c.getAttribute('href') || c.dataset.href || '';
      return href.startsWith('produit-') && href.endsWith('.html');
    });

  // === AWARD MODE : neutraliser la navigation native en desktop ===
  // On retire le href et on le stocke en data-href. Plus AUCUN handler natif
  // ne peut naviguer. Si on repasse en mobile, on remet le href.
  function syncHrefs() {
    if (BP.matches) {
      cards.forEach(c => {
        if (c.hasAttribute('href')) {
          c.dataset.href = c.getAttribute('href');
          c.removeAttribute('href');
        }
        c.setAttribute('role', 'button');
        c.setAttribute('tabindex', '0');
        c.style.cursor = 'zoom-in';
      });
    } else {
      cards.forEach(c => {
        if (!c.hasAttribute('href') && c.dataset.href) {
          c.setAttribute('href', c.dataset.href);
        }
        c.removeAttribute('role');
        c.style.cursor = '';
      });
    }
  }
  syncHrefs();
  BP.addEventListener?.('change', syncHrefs);

  console.log('[shop-modal] init · cards:', cards.length,
    '· products-data:', window.ATELIER_PRODUCTS ? Object.keys(window.ATELIER_PRODUCTS).length : 'MANQUANT',
    '· breakpoint match:', BP.matches);

  let currentIndex = -1;
  let lastFocus = null;
  const cache = new Map();

  async function fetchProductHero(url) {
    if (cache.has(url)) return cache.get(url);

    // 1) Données embarquées (products-data.js) — fonctionne en file:// comme en prod
    const key = url.split('/').pop();
    if (window.ATELIER_PRODUCTS && window.ATELIER_PRODUCTS[key]) {
      const entry = window.ATELIER_PRODUCTS[key];
      const result = { heroHTML: entry.html, title: entry.title || '' };
      cache.set(url, result);
      return result;
    }

    // 2) Fallback fetch (dev local avec serveur http, ou page non pré-extraite)
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Fetch failed ' + res.status);
    const text = await res.text();
    const doc = new DOMParser().parseFromString(text, 'text/html');
    const hero = doc.querySelector('.product-hero');
    if (!hero) throw new Error('No .product-hero in ' + url);
    const title = (doc.querySelector('.product-name')?.textContent || '').trim();
    const result = { heroHTML: hero.outerHTML, title };
    cache.set(url, result);
    return result;
  }

  // === AWARD · Cleanup bulletproof des view-transition-name ===
  // Un nom laissé traînant sur une img = layer de compositing qui échappe au
  // overflow:hidden du modal → image fantôme. On nettoie TOUT élément portant
  // un style view-transition-name, peu importe le sélecteur.
  function clearMorphNames() {
    document.querySelectorAll('[style*="view-transition-name"]').forEach(el => {
      el.style.viewTransitionName = '';
    });
  }

  // === AWARD · Auto-reveal narratif vers la slide "coupe" ===
  // Après l'installation du modal (morph + staggered reveal terminés), on
  // avance doucement vers la 2e slide pour *offrir* la révélation trompe-l'œil.
  // Annulable si l'utilisateur touche au carousel avant le déclenchement.
  let autoRevealTimer = null;
  const AUTO_REVEAL_DELAY = 1400; // ms — après la fin du staggered reveal

  function cancelAutoReveal() {
    if (autoRevealTimer) {
      clearTimeout(autoRevealTimer);
      autoRevealTimer = null;
    }
  }

  function scheduleAutoReveal() {
    cancelAutoReveal();
    autoRevealTimer = setTimeout(() => {
      const carousel = body.querySelector('.product-img-main.is-carousel');
      if (!carousel) return; // produit sans carousel → rien à révéler
      const dots = carousel.querySelectorAll('.carousel-dot');
      if (dots.length < 2) return;
      // L'utilisateur n'a pas encore interagi (sinon cancel aurait été appelé)
      dots[1].click(); // déclenche goTo(1) avec scroll smooth
    }, AUTO_REVEAL_DELAY);

    // Annule sur première interaction utilisateur (clic dot, swipe, touche clavier sur carousel)
    const carousel = body.querySelector('.product-img-main.is-carousel');
    if (!carousel) return;
    const onInteract = () => { cancelAutoReveal(); cleanup(); };
    const cleanup = () => {
      carousel.removeEventListener('pointerdown', onInteract);
      carousel.removeEventListener('keydown', onInteract);
      carousel.removeEventListener('wheel', onInteract, { passive: true });
    };
    carousel.addEventListener('pointerdown', onInteract, { once: true });
    carousel.addEventListener('keydown', onInteract, { once: true });
    carousel.addEventListener('wheel', onInteract, { once: true, passive: true });
  }

  // === AWARD · Mise à jour des previews des flèches prec/suiv ===
  // Affiche le nom + la vignette du produit adjacent pour lever toute
  // ambiguïté avec les dots du carousel.
  const prevPreviewImg  = prevBtn.querySelector('.shop-modal-arrow-thumb');
  const prevPreviewName = prevBtn.querySelector('.shop-modal-arrow-name');
  const nextPreviewImg  = nextBtn.querySelector('.shop-modal-arrow-thumb');
  const nextPreviewName = nextBtn.querySelector('.shop-modal-arrow-name');

  function updateArrowPreviews(index) {
    const prevCard = cards[index - 1];
    const nextCard = cards[index + 1];
    const fillFrom = (card, img, name) => {
      if (!card) { if (img) img.src = ''; if (name) name.textContent = ''; return; }
      const src = card.querySelector('.shop-card-main')?.getAttribute('src') || '';
      const label = card.querySelector('.shop-card-name')?.textContent?.trim() || '';
      if (img) img.src = src;
      if (name) name.textContent = label;
    };
    fillFrom(prevCard, prevPreviewImg, prevPreviewName);
    fillFrom(nextCard, nextPreviewImg, nextPreviewName);
  }

  // === AWARD · Résolution robuste de l'image cible dans le modal ===
  // Les produits avec carousel ont .carousel-slide img, ceux sans carousel ont
  // juste .product-img-main img ou #mainImg. On cherche dans cet ordre de priorité.
  function findTargetImg() {
    return body.querySelector('.carousel-slide img')
        || body.querySelector('.product-img-main img')
        || body.querySelector('#mainImg')
        || body.querySelector('.product-hero img');
  }

  async function openAt(index, { pushHistory = true, sourceCard = null } = {}) {
    if (index < 0 || index >= cards.length) return;

    // Nettoie tout nom résiduel d'une ouverture précédente avant de commencer
    clearMorphNames();

    currentIndex = index;
    const card = cards[index];
    const url = card.dataset.href || card.getAttribute('href');
    const palette = ATELIER_PALETTE[url] || { c1: '#1a1714', c2: '#3a2e1f' };

    // Applique la couleur ambiante AVANT le morph (backdrop prend la teinte du produit)
    modal.style.setProperty('--ambient-c1', palette.c1);
    modal.style.setProperty('--ambient-c2', palette.c2);

    const sourceImg = sourceCard?.querySelector('.shop-card-main');

    const runOpen = async () => {
      await doOpen(url, card);
      const targetImg = findTargetImg();
      if (targetImg) {
        targetImg.style.viewTransitionName = 'shop-hero-morph';
      } else {
        // Aucune cible trouvée : on annule le morph pour éviter l'image fantôme
        // en nettoyant la source dès maintenant (avant même le snapshot final).
        if (sourceImg) sourceImg.style.viewTransitionName = '';
      }
    };

    if (document.startViewTransition && sourceImg) {
      sourceImg.style.viewTransitionName = 'shop-hero-morph';
      const transition = document.startViewTransition(runOpen);

      // Nettoyage systématique — .then/.catch couvre succès et skipTransition
      transition.finished.then(clearMorphNames, clearMorphNames);
      transition.ready.catch(clearMorphNames); // si le snapshot rate
      // Filet ultime : timeout de sécurité
      setTimeout(clearMorphNames, 1500);
    } else {
      await runOpen();
    }

    if (pushHistory) {
      const state = { modal: true, url };
      if (history.state && history.state.modal) history.replaceState(state, '', url);
      else history.pushState(state, '', url);
    }
    return;
  }

  async function doOpen(url, card) {
    const index = cards.indexOf(card);
    panel.classList.add('is-loading');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('shop-modal-open');
    lastFocus = lastFocus || document.activeElement;

    // Update arrow states + previews
    prevBtn.toggleAttribute('disabled', index === 0);
    nextBtn.toggleAttribute('disabled', index === cards.length - 1);
    updateArrowPreviews(index);

    try {
      const { heroHTML, title } = await fetchProductHero(url);
      body.innerHTML = heroHTML;
      modal.setAttribute('aria-label', title || 'Fiche produit');
      if (window.AtelierMirage?.initCarousels) {
        window.AtelierMirage.initCarousels(body);
      }
      panel.classList.remove('is-loading');
      body.scrollTop = 0;
      // Staggered reveal du contenu — on retire puis remet la classe pour relancer les keyframes
      body.classList.remove('is-revealing');
      // reflow forcé pour que la suppression prenne effet avant le re-add
      void body.offsetWidth;
      body.classList.add('is-revealing');
      requestAnimationFrame(() => closeBtn.focus());
      // Auto-reveal narratif vers la coupe
      scheduleAutoReveal();
    } catch (e) {
      console.warn('Modal load failed, falling back to navigation:', e);
      close({ restoreHistory: false });
      window.location.href = url;
    }
  }

  function close({ restoreHistory = true } = {}) {
    cancelAutoReveal();
    clearMorphNames();
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('shop-modal-open');
    body.innerHTML = '';
    currentIndex = -1;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
    if (restoreHistory && history.state && history.state.modal) {
      history.back();
    }
  }

  // Click interception on cards — délégation en capture pour passer devant tout autre handler
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.boutique .shop-card');
    if (!card) return;
    if (!BP.matches) return;                        // mobile → navigation normale (href présent)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
      // Open-in-new-tab : on restaure href le temps du clic via data-href
      const href = card.dataset.href;
      if (href) window.open(href, '_blank');
      return;
    }
    const idx = cards.indexOf(card);
    const href = card.dataset.href || '';
    console.log('[shop-modal] click intercepté ·', href, '· idx:', idx);
    e.preventDefault();
    e.stopPropagation();
    if (idx >= 0) openAt(idx, { sourceCard: card });
  }, true); // capture

  // Clavier : Enter / Space ouvre le modal (puisque ce n'est plus un vrai lien)
  document.addEventListener('keydown', (e) => {
    if (!BP.matches) return;
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.boutique .shop-card');
    if (!card) return;
    const idx = cards.indexOf(card);
    if (idx < 0) return;
    e.preventDefault();
    openAt(idx, { sourceCard: card });
  });

  // Close handlers
  closeBtn.addEventListener('click', () => close());
  backdrop.addEventListener('click', () => close());

  // === AWARD · Morph entre produits dans le modal ===
  // Slide + fade cinématique : l'image actuelle part, la nouvelle entre depuis l'autre côté.
  async function stepTo(newIndex, direction) {
    if (newIndex < 0 || newIndex >= cards.length) return;
    if (newIndex === currentIndex) return;
    const newCard = cards[newIndex];
    const newUrl = newCard.dataset.href || newCard.getAttribute('href');
    const palette = ATELIER_PALETTE[newUrl] || { c1: '#1a1714', c2: '#3a2e1f' };

    clearMorphNames();

    // Direction : 'next' = nouvelle slide entre par la droite, ancienne part à gauche
    // 'prev' = inverse. On expose ça en CSS via attribut.
    modal.dataset.stepDirection = direction;

    const doStep = async () => {
      currentIndex = newIndex;
      // Màj flèches + previews adjacentes
      prevBtn.toggleAttribute('disabled', newIndex === 0);
      nextBtn.toggleAttribute('disabled', newIndex === cards.length - 1);
      updateArrowPreviews(newIndex);
      // Màj couleur ambiante (transition CSS douce)
      modal.style.setProperty('--ambient-c1', palette.c1);
      modal.style.setProperty('--ambient-c2', palette.c2);
      // Charge le nouveau produit
      try {
        const { heroHTML, title } = await fetchProductHero(newUrl);
        body.innerHTML = heroHTML;
          modal.setAttribute('aria-label', title || 'Fiche produit');
        if (window.AtelierMirage?.initCarousels) {
          window.AtelierMirage.initCarousels(body);
        }
        body.scrollTop = 0;
        body.classList.remove('is-revealing');
        void body.offsetWidth;
        body.classList.add('is-revealing');
        // Nomme la nouvelle img pour le morph slide
        const targetImg = findTargetImg();
        if (targetImg) targetImg.style.viewTransitionName = 'shop-step-hero';
        // Auto-reveal sur le nouveau produit
        scheduleAutoReveal();
      } catch (e) {
        console.warn('Step failed:', e);
      }

      // Màj URL (historique)
      const state = { modal: true, url: newUrl };
      if (history.state && history.state.modal) history.replaceState(state, '', newUrl);
    };

    if (document.startViewTransition) {
      // Nomme l'image actuelle avant le snapshot
      const currentImg = findTargetImg();
      if (currentImg) currentImg.style.viewTransitionName = 'shop-step-hero';
      const transition = document.startViewTransition(doStep);
      transition.finished.then(clearMorphNames, clearMorphNames);
      setTimeout(clearMorphNames, 1500);
    } else {
      await doStep();
    }
  }

  // Prev / next produit
  prevBtn.addEventListener('click', () => stepTo(currentIndex - 1, 'prev'));
  nextBtn.addEventListener('click', () => stepTo(currentIndex + 1, 'next'));

  // Clavier
  document.addEventListener('keydown', (e) => {
    if (modal.getAttribute('aria-hidden') !== 'false') return;
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowLeft' && !e.target.closest('.product-img-main.is-carousel')) {
      stepTo(currentIndex - 1, 'prev');
    } else if (e.key === 'ArrowRight' && !e.target.closest('.product-img-main.is-carousel')) {
      stepTo(currentIndex + 1, 'next');
    }
  });

  // Back button → close
  window.addEventListener('popstate', () => {
    if (modal.getAttribute('aria-hidden') === 'false') {
      close({ restoreHistory: false });
    }
  });

  // === AWARD · Deep linking ===
  // Supporte :
  //   index.html#produit-passion    (partage facile, SPA-style)
  //   index.html?p=passion          (alternatif court)
  //   /produit-passion.html         (URL canonique standalone pour SEO/fallback)
  // Si on arrive sur la home avec un deep-link, on auto-ouvre le modal au load.
  function resolveDeepLinkCard() {
    if (!BP.matches) return null; // mobile → laisse la nav normale se faire
    const hash = location.hash.replace('#', '');
    const params = new URLSearchParams(location.search);
    const qp = params.get('p');
    let slug = null;
    if (hash.startsWith('produit-')) {
      slug = hash.endsWith('.html') ? hash : hash + '.html';
    } else if (qp) {
      slug = `produit-${qp}.html`;
    }
    if (!slug) return null;
    return cards.findIndex(c => (c.dataset.href || c.getAttribute('href')) === slug);
  }

  function tryOpenFromURL() {
    const idx = resolveDeepLinkCard();
    if (idx != null && idx >= 0 && modal.getAttribute('aria-hidden') !== 'false') {
      // Petit délai pour laisser la page se stabiliser (évite scroll-jump)
      requestAnimationFrame(() => openAt(idx, { sourceCard: cards[idx], pushHistory: false }));
    }
  }

  // Au chargement initial
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    tryOpenFromURL();
  } else {
    document.addEventListener('DOMContentLoaded', tryOpenFromURL);
  }
  // Hash change (ex: clic sur un lien #produit-X depuis la même page)
  window.addEventListener('hashchange', tryOpenFromURL);

  // === AWARD · API exposée pour Mode Dégustation ===
  window.AtelierMirage.shopModal = {
    stepTo,
    openAt,
    close,
    getCurrentIndex: () => currentIndex,
    getCards: () => cards.slice()
  };

  // Gated si passe en mobile pendant une session : ferme le modal
  BP.addEventListener?.('change', (ev) => {
    if (!ev.matches && modal.getAttribute('aria-hidden') === 'false') {
      close({ restoreHistory: false });
    }
  });
})();
