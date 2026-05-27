/* ═══════════════════════════════════════════════
   PANIER — Atelier Mirage (tiroir complet)
   État localStorage · tiroir · toast · retrait/livraison.
   Le paiement (Stripe) = Phase 2.
═══════════════════════════════════════════════ */
(function () {
  'use strict';

  var STORAGE_KEY = 'am_cart_v1';
  var NOTE_KEY = 'am_cart_note_v1';  // note de commande
  var PRICE = 9.9;                  // prix unique des créations (€)
  var DELIVERY_ZONE = /\b13\d{3}\b/; // zone livraison locale — codes postaux 13xxx
  var FREE_SHIP_THRESHOLD = 70;      // seuil de livraison offerte (€)

  /* Catalogue — pour les recommandations « Vous aimerez aussi » */
  var CATALOG = [
    { id: 'poulpe',        name: 'Poulpe',         img: 'img/poulpe-gold.webp', url: 'produit-poulpe.html' },
    { id: 'fraise',        name: 'Fraise',         img: 'img/fraise.webp',      url: 'produit-fraise.html' },
    { id: 'mangue',        name: 'Mangue',         img: 'img/mangue.webp',      url: 'produit-mangue.html' },
    { id: 'framboise',     name: 'Framboise',      img: 'img/framboise.webp',   url: 'produit-framboise.html' },
    { id: 'peche',         name: 'Pêche',          img: 'img/peche.webp',       url: 'produit-peche.html' },
    { id: 'citron',        name: 'Citron',         img: 'img/citron.webp',      url: 'produit-citron.html' },
    { id: 'passion',       name: 'Passion',        img: 'img/passion.webp',     url: 'produit-passion.html' },
    { id: 'baklava',       name: 'Baklava',        img: 'img/baklava.webp',     url: 'produit-baklava.html' },
    { id: 'pistache',      name: 'Pistache',       img: 'img/pistache.webp',    url: 'produit-pistache.html' },
    { id: 'cacao',         name: 'Cacao',          img: 'img/cacao.webp',       url: 'produit-cacao.html' },
    { id: 'arachide',      name: "Arachide",        img: 'img/arachide.webp',    url: 'produit-arachide.html' },
    { id: 'cacahuete',     name: 'Cacahuète',      img: 'img/cacahuete.webp',   url: 'produit-cacahuete.html' },
    { id: 'datte',         name: 'Datte',          img: 'img/datte.webp',       url: 'produit-datte.html' },
    { id: 'vanille',       name: 'Vanille',        img: 'img/vanille.webp',     url: 'produit-vanille.html' },
    { id: 'boule-cristal', name: 'Boule de Cristal', img: 'img/boule-cristal.webp', url: 'produit-boule-cristal.html' },
    { id: 'nigiri',        name: 'Nigiri',         img: 'img/nigiri.webp',      url: 'produit-nigiri.html' }
  ];

  /* ---------- État ---------- */
  function readCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }
  function writeCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) {}
  }
  function readNote() {
    try { return localStorage.getItem(NOTE_KEY) || ''; } catch (e) { return ''; }
  }
  function writeNote(v) {
    try { localStorage.setItem(NOTE_KEY, v); } catch (e) {}
  }
  var cart = readCart();
  var fulfillment = 'retrait';
  var deliveryValid = false;   // adresse de livraison validée

  function count() { return cart.reduce(function (n, i) { return n + i.qty; }, 0); }
  function total() { return cart.reduce(function (s, i) { return s + i.qty * i.price; }, 0); }
  function euro(n) { return n.toFixed(2).replace('.', ',') + ' €'; }
  function qtyOf(id) { for (var i = 0; i < cart.length; i++) { if (cart[i].id === id) return cart[i].qty; } return 0; }

  function add(item, n) {
    n = n > 0 ? n : 1;
    var found = null;
    for (var i = 0; i < cart.length; i++) { if (cart[i].id === item.id) { found = cart[i]; break; } }
    if (found) { found.qty += n; }
    else { cart.push({ id: item.id, name: item.name, img: item.img, url: item.url, price: PRICE, qty: n }); }
    writeCart(); render(); showToast(item.name + ' a été ajouté au panier');
  }
  function setQty(id, qty) {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id) { cart[i].qty = qty; if (cart[i].qty <= 0) cart.splice(i, 1); break; }
    }
    writeCart(); render();
  }
  /* Retrait d'une ligne avec animation de sortie */
  function animateRemove(row, id) {
    if (!row || row.classList.contains('is-removing')) return;
    row.classList.add('is-removing');
    setTimeout(function () { setQty(id, 0); }, 300);
  }

  /* ---------- Tiroir ---------- */
  var overlay, itemsEl, footEl, shipEl, shipMsg, shipFill, headCountEl, totalEl;
  var countEls = [];

  function buildDrawer() {
    overlay = document.createElement('div');
    overlay.id = 'cart-overlay';
    overlay.innerHTML =
      '<aside class="cart-panel" role="dialog" aria-label="Votre panier" aria-modal="true">'
      + '<div class="cart-header">'
        + '<span class="cart-title"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke-width="1" stroke="currentColor" d="m1.5 14.5 1-12h11l1 12h-13Z"/><path stroke-width="1" stroke="currentColor" d="M5.5 5c.238.833 1.071 2.5 2.5 2.5s2.262-1.667 2.5-2.5"/></svg> Panier <span class="cart-head-count">(0)</span></span>'
        + '<button class="cart-close" type="button" aria-label="Fermer le panier"><svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"/></svg></button>'
      + '</div>'
      + '<div class="cart-scroll">'
      + '<div class="cart-shipping-tracker"><p class="ship-msg"></p><div class="shipping-bar-bg"><div class="shipping-bar-fill"></div></div></div>'
      + '<div class="cart-items"></div>'
      + '<div class="cart-crosssell" hidden></div>'
      + '<div class="cart-foot">'
        + '<button class="cart-note-toggle" type="button" aria-controls="cart-note-popover" aria-expanded="false"><svg width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true"><path stroke-width="1" stroke="currentColor" d="M7.691 1.547h-5.41v8.906l1.875-1.172h6.563V4.845"/><path stroke-width="1" stroke="currentColor" d="M11.187 2.667 7.665 6.19H6.31V4.836l3.523-3.524 1.354 1.355Z"/></svg> Note de commande</button>'
        + '<label class="cart-cgv"><input type="checkbox" class="cart-cgv-check"><span>En validant mon panier, j\'accepte <a href="mentions-legales.html" target="_blank" rel="noopener">les conditions générales de vente et les conditions générales d\'utilisation</a> du site Atelier Mirage.</span></label>'
        + '<div class="cart-total"><span>Total</span><span class="cart-total-amt">0,00 €</span></div>'
        + '<div class="cart-fulfillment">'
          + '<button class="cart-fulfill-btn is-active" type="button" data-mode="retrait"><svg viewBox="0 0 35 35" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.20704 31.3853V15.0862C1.09389 15.0017 0.985146 14.9082 0.884068 14.8056C0.31832 14.2399 0 13.472 0 12.6724V4.22414C0 3.22394 0.810148 2.4138 1.81035 2.4138H9.71563C9.83331 1.83904 10.1169 1.30496 10.5393 0.884068C11.1051 0.31832 11.8729 0 12.6725 0H22.3277C23.1273 0 23.8952 0.318351 24.4609 0.884068C24.8833 1.30496 25.1669 1.839 25.2846 2.4138H33.1899C34.1901 2.4138 35.0002 3.22394 35.0002 4.22414V12.6724C35.0002 13.472 34.6819 14.2399 34.1161 14.8056C34.0151 14.9082 33.9064 15.0017 33.7933 15.0862V31.3853C34.4692 31.4457 35.0002 32.0144 35.0002 32.7069V33.6724C35.0002 34.4056 34.4058 35 33.6726 35H1.32773C0.594551 35 0.000139039 34.4056 0.000139039 33.6724V32.7069C0.000139039 32.0144 0.531174 31.4457 1.20704 31.3853ZM33.6726 32.586H1.32773C1.26135 32.586 1.20704 32.6404 1.20704 32.7067V33.6723C1.20704 33.7386 1.26135 33.7929 1.32773 33.7929H33.6726C33.739 33.7929 33.7933 33.7386 33.7933 33.6723V32.7067C33.7933 32.6404 33.739 32.586 33.6726 32.586ZM32.5862 31.3792H14.4827L14.4829 17.4996C14.4829 17.1662 14.2129 16.8962 13.8795 16.8962H4.22428C3.89087 16.8962 3.62083 17.1662 3.62083 17.4996V31.3792H2.41393V15.6292C2.61155 15.6684 2.81372 15.6896 3.01738 15.6896C3.81694 15.6896 4.58484 15.3712 5.15056 14.8055C5.25314 14.7044 5.34668 14.5958 5.43116 14.4827C5.51564 14.5958 5.60918 14.7044 5.71176 14.8055C6.27748 15.3712 7.04538 15.6896 7.84494 15.6896C8.64451 15.6896 9.4124 15.3712 9.97812 14.8055C10.0807 14.7044 10.1742 14.5958 10.2587 14.4827C10.3432 14.5958 10.4367 14.7044 10.5393 14.8055C11.105 15.3712 11.8729 15.6896 12.6725 15.6896C13.4721 15.6896 14.24 15.3712 14.8057 14.8055C14.9083 14.7044 15.0018 14.5958 15.0863 14.4827C15.1708 14.5958 15.2643 14.7044 15.3669 14.8055C15.9326 15.3712 16.7005 15.6896 17.5001 15.6896C18.2996 15.6896 19.0675 15.3712 19.6332 14.8055C19.7358 14.7044 19.8294 14.5958 19.9139 14.4827C19.9983 14.5958 20.0919 14.7044 20.1945 14.8055C20.7602 15.3712 21.5281 15.6896 22.3276 15.6896C23.1272 15.6896 23.8951 15.3712 24.4608 14.8055C24.5634 14.7044 24.6569 14.5958 24.7414 14.4827C24.8259 14.5958 24.9194 14.7044 25.022 14.8055C25.5877 15.3712 26.3556 15.6896 27.1552 15.6896C27.9548 15.6896 28.7227 15.3712 29.2884 14.8055C29.391 14.7044 29.4845 14.5958 29.569 14.4827C29.6535 14.5958 29.747 14.7044 29.8496 14.8055C30.4153 15.3712 31.1832 15.6896 31.9828 15.6896C32.1864 15.6896 32.3886 15.6684 32.5862 15.6292V31.3792ZM13.2758 31.3792H4.82754V20.5171V19.3102V18.1033H13.2758V19.3102V20.5171V31.3792ZM1.20684 8.44808H4.82754V12.6724C4.82754 13.1522 4.63745 13.6138 4.29651 13.9517C3.95857 14.2927 3.49694 14.4828 3.01719 14.4828C2.53745 14.4828 2.07581 14.2927 1.73788 13.9517C1.39693 13.6138 1.20684 13.1522 1.20684 12.6724V8.44808ZM20.5172 12.6724V8.44808H24.1379V12.6724C24.1379 13.1522 23.9478 13.6138 23.6069 13.9517C23.269 14.2927 22.8073 14.4828 22.3276 14.4828C21.8478 14.4828 21.3862 14.2927 21.0483 13.9517C20.7073 13.6138 20.5172 13.1522 20.5172 12.6724ZM30.1724 8.44808H33.7931V12.6724C33.7931 13.1522 33.603 13.6138 33.2621 13.9517C32.9241 14.2927 32.4625 14.4828 31.9828 14.4828C31.503 14.4828 31.0414 14.2927 30.7034 13.9517C30.3625 13.6138 30.1724 13.1522 30.1724 12.6724V8.44808ZM6.03444 8.44808H9.65514V12.6724C9.65514 13.1522 9.46505 13.6138 9.1241 13.9517C8.78617 14.2927 8.32453 14.4828 7.84479 14.4828C7.36504 14.4828 6.90341 14.2927 6.56547 13.9517C6.22453 13.6138 6.03444 13.1522 6.03444 12.6724V8.44808ZM15.6896 8.44808H19.3103V12.6724C19.3103 13.1522 19.1202 13.6138 18.7793 13.9517C18.4414 14.2927 17.9797 14.4828 17.5 14.4828C17.0202 14.4828 16.5586 14.2927 16.2207 13.9517C15.8797 13.6138 15.6896 13.1522 15.6896 12.6724V8.44808ZM25.3448 8.44808H28.9655V12.6724C28.9655 13.1522 28.7754 13.6138 28.4345 13.9517C28.0965 14.2927 27.6349 14.4828 27.1552 14.4828C26.6754 14.4828 26.2138 14.2927 25.8759 13.9517C25.5349 13.6138 25.3448 13.1522 25.3448 12.6724V8.44808ZM10.862 8.44808H14.4827V12.6724C14.4827 13.1522 14.2926 13.6138 13.9517 13.9517C13.6138 14.2927 13.1521 14.4828 12.6724 14.4828C12.1926 14.4828 11.731 14.2927 11.3931 13.9517C11.0521 13.6138 10.862 13.1522 10.862 12.6724V8.44808ZM1.81049 3.62049H9.65514L9.65533 7.24118H1.20704V4.22394C1.20704 3.89053 1.47708 3.62049 1.81049 3.62049ZM10.862 7.24118H24.1379V3.01684C24.1379 2.5371 23.9478 2.07546 23.6069 1.73753C23.269 1.39658 22.8073 1.2065 22.3276 1.2065H12.6724C12.1926 1.2065 11.731 1.39658 11.3931 1.73753C11.0521 2.07546 10.862 2.5371 10.862 3.01684V7.24118ZM33.7931 7.24118H25.3448L25.345 3.62049H33.1897C33.5231 3.62049 33.7931 3.89053 33.7931 4.22394V7.24118Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M30.7767 16.8965C31.1101 16.8965 31.3801 17.1665 31.3801 17.4999V29.5689C31.3801 29.9023 31.1101 30.1724 30.7767 30.1724H16.2939C15.9605 30.1724 15.6904 29.9023 15.6904 29.5689V17.4999C15.6904 17.1665 15.9605 16.8965 16.2939 16.8965H30.7767ZM30.1732 28.9653V27.7584V26.5515V18.1032H16.8973V26.5515V27.7584V28.9653H30.1732Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.24206 27.1554V24.7416C7.24206 24.4082 6.97201 24.1382 6.63861 24.1382C6.3052 24.1382 6.03516 24.4082 6.03516 24.7416V27.1554C6.03516 27.4888 6.3052 27.7589 6.63861 27.7589C6.97201 27.7589 7.24206 27.4888 7.24206 27.1554Z" fill="currentColor"></path><path d="M33.793 5.36182C34.0682 5.43863 34.3587 5.48096 34.6592 5.48096C34.7744 5.48094 34.888 5.47419 35 5.4624V12.6724C35 13.4718 34.6818 14.2395 34.1162 14.8052C34.0151 14.9078 33.9061 15.0019 33.793 15.0864V15.6167C33.7298 15.5493 33.6707 15.474 33.6211 15.3872C33.4135 15.0303 33.1846 14.6318 32.9385 14.2065C33.0544 14.1341 33.1639 14.0503 33.2617 13.9517C33.6027 13.6137 33.793 13.1521 33.793 12.6724V8.44775H30.1729V9.3833C29.7319 8.60488 29.3192 7.87098 28.9707 7.24072H33.793V5.36182ZM31.4727 2.41357C31.4884 2.84372 31.5882 3.25113 31.7568 3.62061H27.4375C27.3685 3.22079 27.3338 2.81714 27.332 2.41357H31.4727Z" fill="currentColor"></path></svg><span>Retrait en Boutique</span></button>'
          + '<button class="cart-fulfill-btn" type="button" data-mode="livraison"><svg viewBox="0 0 46 35" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M45.0498 29.3453H42.1286C42.2626 32.4273 39.7971 35 36.7152 35C33.66 35 31.1945 32.4273 31.3285 29.3453H13.5605C13.7213 32.4273 11.2557 35 8.17381 35C5.11868 35 2.65314 32.4273 2.78714 29.3453H0.696784C0.294793 29.3453 0 29.0237 0 28.6485V3.61792C0 1.63476 1.60796 0 3.61792 0H26.3706C28.3537 0 29.9617 1.63476 29.9617 3.61792V6.05666H35.4556C36.6884 6.05666 37.6799 7.07504 37.6799 8.28101V9.11179C38.1891 9.11179 39.0735 8.951 39.3415 9.48698L45.6394 20.9839L45.7465 21.3055V28.6485C45.7465 29.0505 45.425 29.3453 45.0498 29.3453ZM41.8606 27.9518H44.353V27.0406H43.1202C42.1018 27.0406 41.2711 26.2098 41.2711 25.1646C41.2711 24.441 41.1103 23.3155 42.1822 23.3155H44.353V22.0023H32.6417C32.2665 22.0023 31.9717 21.7075 31.9717 21.3055V13.3461C31.9717 12.9709 32.2665 12.6493 32.6417 12.6493H39.5023L38.3231 10.5054H29.9617V27.9518H31.5965C33.1776 22.9939 40.2795 22.9939 41.8606 27.9518ZM43.8706 20.6355L40.2795 14.0429H33.3384V20.6355H43.8706ZM28.5681 24.7894V3.61792C28.5681 2.38515 27.5766 1.39357 26.3706 1.39357H3.61792C2.38515 1.39357 1.39357 2.38515 1.39357 3.61792V24.7894H5.73507C6.48545 24.4142 7.31623 24.1998 8.17381 24.1998C9.05819 24.1998 9.88897 24.4142 10.6126 24.7894H28.5681ZM1.39357 26.183V27.9518H3.02833C3.24273 27.3086 3.59112 26.6922 4.01991 26.183H1.39357ZM13.3193 27.9518H28.5681V26.183H12.3545C12.7833 26.6922 13.1049 27.3086 13.3193 27.9518ZM8.17381 31.9985C6.86064 31.9985 5.78867 30.9265 5.78867 29.6133C5.78867 28.3002 6.86064 27.2014 8.17381 27.2014C9.48698 27.2014 10.5858 28.3002 10.5858 29.6133C10.5858 30.9265 9.48698 31.9985 8.17381 31.9985ZM8.17381 28.5949C6.86064 28.5949 6.86064 30.6049 8.17381 30.6049C9.48698 30.6049 9.51378 28.5949 8.17381 28.5949ZM8.17381 25.5934C5.94946 25.5934 4.1539 27.4426 4.1539 29.6133C4.1539 31.8109 5.97626 33.6332 8.17381 33.6332C10.3982 33.6332 12.1937 31.8109 12.1937 29.6133C12.1937 27.389 10.3982 25.5934 8.17381 25.5934ZM29.9617 9.11179H36.2864C36.2864 8.46861 36.4204 7.45023 35.4556 7.45023H29.9617V9.11179ZM42.6378 24.709C42.6378 25.8614 42.7986 25.647 44.353 25.647V24.709H42.6378ZM36.7152 31.9985C35.402 31.9985 34.33 30.9265 34.33 29.6133C34.33 28.3002 35.402 27.2014 36.7152 27.2014C38.0551 27.2014 39.1271 28.3002 39.1271 29.6133C39.1271 30.9265 38.0551 31.9985 36.7152 31.9985ZM36.7152 28.5949C35.402 28.5949 35.402 30.6049 36.7152 30.6049C38.0551 30.6049 38.0551 28.5949 36.7152 28.5949ZM36.7152 25.5934C34.4908 25.5934 32.722 27.4426 32.722 29.6133C32.722 31.8109 34.5176 33.6332 36.7152 33.6332C38.9395 33.6332 40.7351 31.8109 40.7351 29.6133C40.7351 27.389 38.9395 25.5934 36.7152 25.5934Z" fill="currentColor"></path><path d="M20.3324 0.739258H7.625V14.9715L13.9787 9.88857L20.3324 14.9715V0.739258Z" stroke="currentColor" stroke-linejoin="round"></path></svg><span>Livraison par coursier</span></button>'
        + '</div>'
        + '<div class="cart-address" hidden>'
          + '<p>Tapez votre adresse ci-dessous afin de vérifier si vous pouvez avoir accès à la livraison locale.</p>'
          + '<div class="cart-address-field"><svg class="cart-address-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"></path></svg><input class="cart-address-input" type="text" placeholder="Tapez votre adresse…" autocomplete="off"><ul class="cart-addr-suggest" role="listbox"></ul></div>'
          + '<p class="cart-address-msg" aria-live="polite"></p>'
          + '<div class="cart-deliv-step" hidden>'
            + '<div class="cart-datepicker">'
              + '<button type="button" class="cart-deliv-field cart-deliv-date" aria-haspopup="dialog"></button>'
              + '<div class="cart-cal" role="dialog" aria-label="Choisir une date"></div>'
            + '</div>'
          + '</div>'
          + '<div class="cart-slot-step" hidden>'
            + '<label class="cart-deliv-label">Créneau horaire</label>'
            + '<div class="cart-slots">'
              + '<button type="button" class="cart-slot-opt">10:00 – 11:00</button>'
              + '<button type="button" class="cart-slot-opt">11:00 – 12:00</button>'
              + '<button type="button" class="cart-slot-opt">12:00 – 13:00</button>'
              + '<button type="button" class="cart-slot-opt">13:00 – 14:00</button>'
              + '<button type="button" class="cart-slot-opt">14:00 – 15:00</button>'
              + '<button type="button" class="cart-slot-opt">15:00 – 16:00</button>'
              + '<button type="button" class="cart-slot-opt">16:00 – 17:00</button>'
              + '<button type="button" class="cart-slot-opt">17:00 – 18:00</button>'
              + '<button type="button" class="cart-slot-opt">18:00 – 19:00</button>'
              + '<button type="button" class="cart-slot-opt">19:00 – 20:00</button>'
              + '<button type="button" class="cart-slot-opt">20:00 – 21:00</button>'
              + '<button type="button" class="cart-slot-opt">21:00 – 22:00</button>'
              + '<button type="button" class="cart-slot-opt">22:00 – 23:00</button>'
              + '<button type="button" class="cart-slot-opt">23:00 – 00:00</button>'
            + '</div>'
            + '<label class="cart-deliv-label">Instructions de livraison (facultatif)</label>'
            + '<textarea class="cart-deliv-field cart-deliv-instr" placeholder="Code, étage, précisions…"></textarea>'
          + '</div>'
        + '</div>'
        + '<button class="cart-checkout" type="button">Passer la commande</button>'
        + '<p class="cart-foot-note">Taxes incluses. Frais d\'expédition calculés à l\'étape de paiement.</p>'
      + '</div>'
      + '</div>'
      + '<div class="cart-note-scrim"></div>'
      + '<div class="cart-note-popover" id="cart-note-popover" role="dialog" aria-label="Note de commande">'
        + '<div class="cart-note-pop-head">'
          + '<span>Note de commande</span>'
          + '<button class="cart-note-close" type="button" aria-label="Fermer la note"><svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"/></svg></button>'
        + '</div>'
        + '<div class="cart-note-field">'
          + '<textarea class="cart-note-area" id="cartNoteArea" rows="5" placeholder=" "></textarea>'
          + '<label class="cart-note-floating" for="cartNoteArea">Ajouter une note</label>'
        + '</div>'
        + '<button class="cart-note-save" type="button">Enregistrer</button>'
      + '</div>'
      + '</aside>';
    document.body.appendChild(overlay);

    itemsEl = overlay.querySelector('.cart-items');
    footEl = overlay.querySelector('.cart-foot');
    shipEl = overlay.querySelector('.cart-shipping-tracker');
    shipMsg = overlay.querySelector('.ship-msg');
    shipFill = overlay.querySelector('.shipping-bar-fill');
    headCountEl = overlay.querySelector('.cart-head-count');
    totalEl = overlay.querySelector('.cart-total-amt');

    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeCart(); });
    overlay.querySelector('.cart-close').addEventListener('click', closeCart);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        if (notePopover && notePopover.classList.contains('is-open')) closeNote();
        else closeCart();
      }
    });

    /* Note de commande — popover façon YC */
    var notePopover = overlay.querySelector('.cart-note-popover');
    var noteScrim = overlay.querySelector('.cart-note-scrim');
    var noteToggle = overlay.querySelector('.cart-note-toggle');
    var noteArea = overlay.querySelector('.cart-note-area');
    noteArea.value = readNote();
    function openNote() {
      notePopover.classList.add('is-open');
      noteScrim.classList.add('is-open');
      noteToggle.classList.add('is-open');
      noteToggle.setAttribute('aria-expanded', 'true');
      setTimeout(function () { noteArea.focus(); }, 220);
    }
    function closeNote() {
      notePopover.classList.remove('is-open');
      noteScrim.classList.remove('is-open');
      noteToggle.classList.remove('is-open');
      noteToggle.setAttribute('aria-expanded', 'false');
    }
    noteToggle.addEventListener('click', function () {
      if (notePopover.classList.contains('is-open')) closeNote(); else openNote();
    });
    noteScrim.addEventListener('click', closeNote);
    overlay.querySelector('.cart-note-close').addEventListener('click', closeNote);
    overlay.querySelector('.cart-note-save').addEventListener('click', function () {
      writeNote(noteArea.value);
      closeNote();
      showToast('Note enregistrée');
    });

    var addressBox = overlay.querySelector('.cart-address');
    overlay.querySelectorAll('.cart-fulfill-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        overlay.querySelectorAll('.cart-fulfill-btn').forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
        fulfillment = b.dataset.mode;
        addressBox.hidden = (fulfillment !== 'livraison');
      });
    });

    setupDelivery();

    overlay.querySelector('.cart-checkout').addEventListener('click', checkout);
  }

  var revealTimer;
  function openCart() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.classList.add('cart-revealing');
    clearTimeout(revealTimer);
    revealTimer = setTimeout(function () { overlay.classList.remove('cart-revealing'); }, 800);
  }
  function closeCart() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

  /* ---------- Sélecteur de date — calendrier sur-mesure ---------- */
  function setupDatePicker(onPick) {
    var field = overlay.querySelector('.cart-deliv-date');
    var cal = overlay.querySelector('.cart-cal');
    if (!field || !cal) return null;
    var MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    var WD = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    var min = new Date(); min.setHours(0, 0, 0, 0); min.setDate(min.getDate() + 1);
    var selected = null;
    var viewY = min.getFullYear(), viewM = min.getMonth();

    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
    function label(d) { return d.getDate() + ' ' + MONTHS[d.getMonth()].toLowerCase() + ' ' + d.getFullYear(); }
    function same(a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
    function placeholder() { field.textContent = 'Choisir la date et l’heure'; field.classList.add('is-placeholder'); field.removeAttribute('data-value'); }
    function showSelected() { field.textContent = label(selected); field.classList.remove('is-placeholder'); field.setAttribute('data-value', iso(selected)); }

    function draw() {
      var first = new Date(viewY, viewM, 1);
      var offset = (first.getDay() + 6) % 7;
      var nDays = new Date(viewY, viewM + 1, 0).getDate();
      var h = '<div class="cart-cal-head">'
        + '<button type="button" class="cart-cal-nav" data-nav="-1" aria-label="Mois précédent">‹</button>'
        + '<span class="cart-cal-title">' + MONTHS[viewM] + ' ' + viewY + '</span>'
        + '<button type="button" class="cart-cal-nav" data-nav="1" aria-label="Mois suivant">›</button>'
        + '</div><div class="cart-cal-grid">';
      for (var w = 0; w < 7; w++) h += '<span class="cart-cal-wd">' + WD[w] + '</span>';
      for (var e = 0; e < offset; e++) h += '<span></span>';
      for (var d = 1; d <= nDays; d++) {
        var cur = new Date(viewY, viewM, d);
        var off = cur < min;
        var c = 'cart-cal-day';
        if (off) c += ' is-disabled';
        if (same(cur, selected)) c += ' is-selected';
        h += '<button type="button" class="' + c + '"' + (off ? ' disabled' : '') + ' data-d="' + d + '">' + d + '</button>';
      }
      cal.innerHTML = h + '</div>';
      cal.querySelectorAll('[data-nav]').forEach(function (b) {
        b.addEventListener('click', function () {
          viewM += parseInt(b.getAttribute('data-nav'), 10);
          if (viewM < 0) { viewM = 11; viewY--; }
          else if (viewM > 11) { viewM = 0; viewY++; }
          draw();
        });
      });
      cal.querySelectorAll('.cart-cal-day:not(.is-disabled)').forEach(function (b) {
        b.addEventListener('click', function () {
          selected = new Date(viewY, viewM, parseInt(b.getAttribute('data-d'), 10));
          showSelected();
          cal.classList.remove('open');
          if (onPick) onPick(selected);
        });
      });
    }

    placeholder();
    field.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !cal.classList.contains('open');
      if (willOpen) {
        var base = selected || min;
        viewY = base.getFullYear(); viewM = base.getMonth();
        draw();
      }
      cal.classList.toggle('open', willOpen);
    });
    cal.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', function () { cal.classList.remove('open'); });

    return { reset: function () { selected = null; placeholder(); cal.classList.remove('open'); } };
  }

  /* ---------- Livraison — adresse + flux progressif ---------- */
  function setupDelivery() {
    var input = overlay.querySelector('.cart-address-input');
    var suggest = overlay.querySelector('.cart-addr-suggest');
    var msg = overlay.querySelector('.cart-address-msg');
    var dateStep = overlay.querySelector('.cart-deliv-step');
    var slotStep = overlay.querySelector('.cart-slot-step');
    if (!input || !suggest) return;
    var timer;
    var dp = setupDatePicker(function () {
      if (slotStep) {
        slotStep.hidden = false;
        slotStep.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });

    function clearSuggest() { suggest.innerHTML = ''; suggest.classList.remove('open'); }

    function pick(label, postcode) {
      input.value = label;
      clearSuggest();
      var ok = /^13/.test(postcode || '');
      deliveryValid = ok;
      if (ok) {
        msg.textContent = 'Super ! Vous avez accès à la livraison.';
        msg.className = 'cart-address-msg is-ok';
        if (dateStep) {
          dateStep.hidden = false;
          dateStep.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      } else {
        msg.textContent = 'Désolés, pas de livraison possible dans votre secteur.';
        msg.className = 'cart-address-msg is-ko';
        if (dateStep) dateStep.hidden = true;
        if (slotStep) slotStep.hidden = true;
        if (dp) dp.reset();
      }
    }

    function renderSuggest(items) {
      if (!items.length) { clearSuggest(); return; }
      var h = '';
      for (var i = 0; i < items.length; i++) {
        var safe = String(items[i].label).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
        h += '<li role="option" data-label="' + safe + '" data-pc="' + (items[i].pc || '') + '">' + safe + '</li>';
      }
      suggest.innerHTML = h;
      suggest.classList.add('open');
      suggest.querySelectorAll('li').forEach(function (li) {
        li.addEventListener('click', function () {
          pick(li.getAttribute('data-label'), li.getAttribute('data-pc'));
        });
      });
    }

    function lookup(q) {
      fetch('https://api-adresse.data.gouv.fr/search/?limit=5&q=' + encodeURIComponent(q))
        .then(function (r) { return r.json(); })
        .then(function (data) {
          var feats = (data && data.features) || [];
          renderSuggest(feats.map(function (f) {
            return { label: f.properties.label, pc: f.properties.postcode };
          }));
        })
        .catch(function () {
          var m = q.match(/\b(13\d{3})\b/);
          renderSuggest([{ label: q, pc: m ? m[1] : '' }]);
        });
    }

    input.addEventListener('input', function () {
      deliveryValid = false;
      msg.textContent = ''; msg.className = 'cart-address-msg';
      if (dateStep) dateStep.hidden = true;
      if (slotStep) slotStep.hidden = true;
      if (dp) dp.reset();
      var q = input.value.trim();
      clearTimeout(timer);
      if (q.length < 3) { clearSuggest(); return; }
      timer = setTimeout(function () { lookup(q); }, 280);
    });
    document.addEventListener('click', function (e) {
      if (!suggest.contains(e.target) && e.target !== input) clearSuggest();
    });

    overlay.querySelectorAll('.cart-slot-opt').forEach(function (b) {
      b.addEventListener('click', function () {
        overlay.querySelectorAll('.cart-slot-opt').forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
      });
    });
  }

  function render() {
    var empty = cart.length === 0;
    shipEl.style.display = empty ? 'none' : '';
    footEl.style.display = empty ? 'none' : '';

    if (!empty) {
      var st = total();
      if (st >= FREE_SHIP_THRESHOLD) {
        shipMsg.innerHTML = 'Frais de livraison offerts ✓';
        shipFill.style.width = '100%';
      } else {
        shipMsg.innerHTML = 'Dépensez <strong>' + euro(FREE_SHIP_THRESHOLD - st) + '</strong> de plus pour bénéficier des frais de livraison offerts.';
        shipFill.style.width = Math.min(100, st / FREE_SHIP_THRESHOLD * 100) + '%';
      }
    }

    if (empty) {
      itemsEl.innerHTML = '<div class="cart-empty" data-bg="Panier"><p class="cart-empty-title">Votre panier est vide</p><button type="button" class="cart-empty-btn">Découvrir la collection</button></div>';
      var eb = itemsEl.querySelector('.cart-empty-btn');
      if (eb) eb.addEventListener('click', function () { window.location.href = 'collection.html'; });
    } else {
      var rows = '';
      for (var i = 0; i < cart.length; i++) {
        var it = cart[i];
        var href = it.url || '#';
        rows += '<div class="cart-item" data-id="' + it.id + '" style="--i:' + i + '">'
          + '<a class="cart-item-img" href="' + href + '"><img src="' + it.img + '" alt=""></a>'
          + '<div class="cart-item-info">'
            + '<a class="cart-item-name" href="' + href + '">' + it.name + '</a>'
            + '<div class="cart-item-sub">Pièce individuelle</div>'
            + '<div class="cart-item-actions">'
              + '<div class="cart-item-qty">'
                + '<button class="cart-qty-btn" type="button" data-act="dec" aria-label="Retirer un"><svg width="9" height="9" viewBox="0 0 8 2" fill="none" aria-hidden="true"><path d="M0 1H8" stroke="currentColor" stroke-width="1.5"/></svg></button>'
                + '<span class="cart-qty-num">' + it.qty + '</span>'
                + '<button class="cart-qty-btn" type="button" data-act="inc" aria-label="Ajouter un"><svg width="9" height="9" viewBox="0 0 8 8" fill="none" aria-hidden="true"><path d="M0 4H8" stroke="currentColor" stroke-width="1.5"/><path d="M4 0V8" stroke="currentColor" stroke-width="1.5"/></svg></button>'
              + '</div>'
              + '<button class="cart-item-remove" type="button" data-act="remove"><svg width="14" height="14" viewBox="0 0 16 17" fill="none" aria-hidden="true"><path stroke="currentColor" fill="none" d="M2 4.5h12M3.5 4.5h9v10h-9v-10ZM6.5 7v5M9.5 7v5M5.5 4.5a2.5 2.5 0 1 1 5 0"/></svg><span>Supprimer</span></button>'
            + '</div>'
          + '</div>'
          + '<div class="cart-item-price">' + euro(it.qty * it.price) + '</div>'
        + '</div>';
      }
      itemsEl.innerHTML = rows;
      itemsEl.querySelectorAll('.cart-item').forEach(function (row) {
        var id = row.getAttribute('data-id');
        row.querySelector('[data-act="inc"]').addEventListener('click', function () { setQty(id, qtyOf(id) + 1); });
        row.querySelector('[data-act="dec"]').addEventListener('click', function () {
          if (qtyOf(id) <= 1) { animateRemove(row, id); } else { setQty(id, qtyOf(id) - 1); }
        });
        row.querySelector('[data-act="remove"]').addEventListener('click', function () { animateRemove(row, id); });
      });
      totalEl.textContent = euro(total());
    }
    renderCrossSell();

    var c = count();
    if (headCountEl) headCountEl.textContent = '(' + c + ')';
    countEls.forEach(function (el) { el.textContent = c; el.style.display = c > 0 ? '' : 'none'; });
  }

  /* ---------- Recommandations « Vous aimerez aussi » ---------- */
  function renderCrossSell() {
    var crossEl = overlay.querySelector('.cart-crosssell');
    if (!crossEl) return;
    var inCart = {};
    for (var a = 0; a < cart.length; a++) { inCart[cart[a].id] = true; }
    var recs = [];
    for (var b = 0; b < CATALOG.length && recs.length < 8; b++) {
      if (!inCart[CATALOG[b].id]) recs.push(CATALOG[b]);
    }
    if (cart.length === 0 || recs.length === 0) {
      crossEl.hidden = true;
      crossEl.innerHTML = '';
      return;
    }
    var nav = recs.length > 1
      ? '<div class="cart-crosssell-nav">'
        + '<button type="button" class="cx-nav" data-dir="-1" aria-label="Précédent"><svg width="7" height="11" viewBox="0 0 7 11" fill="none" aria-hidden="true"><path d="M6 1 1.5 5.5 6 10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
        + '<button type="button" class="cx-nav" data-dir="1" aria-label="Suivant"><svg width="7" height="11" viewBox="0 0 7 11" fill="none" aria-hidden="true"><path d="m1 1 4.5 4.5L1 10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
        + '</div>'
      : '';
    var h = '<div class="cart-crosssell-head"><p class="cart-crosssell-title">Vous aimerez aussi</p>' + nav + '</div>'
      + '<div class="cart-crosssell-track">';
    for (var k = 0; k < recs.length; k++) {
      var p = recs[k];
      h += '<article class="cx-card">'
        + '<a class="cx-card-img" href="' + p.url + '"><img src="' + p.img + '" alt="" loading="lazy"></a>'
        + '<div class="cx-card-body">'
          + '<a class="cx-card-name" href="' + p.url + '">' + p.name + '</a>'
          + '<span class="cx-card-price">' + euro(PRICE) + '</span>'
        + '</div>'
        + '<button class="cx-card-add" type="button" data-id="' + p.id + '" aria-label="Ajouter ' + p.name + ' au panier">'
          + '<svg width="12" height="12" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M5.5 1v9M1 5.5h9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
        + '</button>'
      + '</article>';
    }
    h += '</div>';
    crossEl.innerHTML = h;
    crossEl.hidden = false;
    var track = crossEl.querySelector('.cart-crosssell-track');
    crossEl.querySelectorAll('.cx-nav').forEach(function (n) {
      n.addEventListener('click', function () {
        var dir = parseInt(n.getAttribute('data-dir'), 10);
        track.scrollBy({ left: dir * (track.clientWidth + 16), behavior: 'smooth' });
      });
    });
    crossEl.querySelectorAll('.cx-card-add').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-id');
        for (var m = 0; m < CATALOG.length; m++) {
          if (CATALOG[m].id === id) { add(CATALOG[m], 1); break; }
        }
      });
    });
  }

  function checkout() {
    if (!overlay.querySelector('.cart-cgv-check').checked) {
      showToast('Merci d\'accepter les conditions générales de vente.');
      return;
    }
    if (fulfillment === 'livraison' && !deliveryValid) {
      showToast('Choisissez une adresse de livraison dans la zone desservie.');
      overlay.querySelector('.cart-address-input').focus();
      return;
    }
    if (!cart.length) { showToast('Votre panier est vide.'); return; }

    /* Paiement — session Stripe Checkout créée par /api/checkout */
    var btn = overlay.querySelector('.cart-checkout');
    if (btn) { btn.disabled = true; btn.textContent = 'Redirection…'; }

    var addrEl = overlay.querySelector('.cart-address-input');
    var payload = {
      items: cart.map(function (i) { return { id: i.id, qty: i.qty }; }),
      fulfillment: fulfillment,
      address: (fulfillment === 'livraison' && addrEl) ? addrEl.value : '',
      note: readNote()
    };

    fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) {
        return r.json().then(function (d) {
          if (!r.ok || !d || !d.url) throw new Error((d && d.error) || 'Erreur');
          return d;
        });
      })
      .then(function (d) { window.location.href = d.url; })
      .catch(function () {
        showToast('Le paiement n\'a pas pu démarrer. Réessayez.');
        if (btn) { btn.disabled = false; btn.textContent = 'Passer la commande'; }
      });
  }

  /* ---------- Toast ---------- */
  var toastEl, toastTimer;
  function buildToast() {
    toastEl = document.createElement('div');
    toastEl.id = 'cart-toast';
    toastEl.setAttribute('role', 'status');
    toastEl.innerHTML =
      '<svg class="cart-toast-ico" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">'
      + '<path d="M3 8.4l3.3 3.3L13 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      + '<span class="cart-toast-msg"></span>';
    document.body.appendChild(toastEl);
  }
  function showToast(msg) {
    if (!toastEl) return;
    var m = toastEl.querySelector('.cart-toast-msg');
    if (m) { m.textContent = msg; } else { toastEl.textContent = msg; }
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2800);
  }

  /* ---------- Bouton panier (nav) ---------- */
  function buildCartButton() {
    var btn = document.createElement('button');
    btn.className = 'cart-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Ouvrir le panier');
    btn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">'
      + '<path stroke-width="1" stroke="currentColor" d="m1.5 14.5 1-12h11l1 12h-13Z"/><path stroke-width="1" stroke="currentColor" d="M5.5 5c.238.833 1.071 2.5 2.5 2.5s2.262-1.667 2.5-2.5"/>'
      + '</svg><span class="cart-count" aria-hidden="true">0</span>';
    btn.addEventListener('click', openCart);
    var navRight = document.querySelector('.nav-right');
    if (navRight) { navRight.appendChild(btn); }
    else { btn.classList.add('cart-toggle--float'); document.body.appendChild(btn); }
    countEls.push(btn.querySelector('.cart-count'));
  }

  /* ---------- Boutons « Ajouter » ---------- */
  function flash(el) {
    var t = el.textContent;
    el.textContent = 'Ajouté ✓';
    el.classList.add('is-added');
    setTimeout(function () { el.textContent = t; el.classList.remove('is-added'); }, 1100);
  }

  function wireCollectionCards() {
    document.querySelectorAll('.hc-card').forEach(function (card) {
      var imgWrap = card.querySelector('.hc-card-img');
      var nameEl = card.querySelector('.hc-card-name');
      if (!imgWrap || !nameEl || imgWrap.querySelector('.hc-add')) return;
      var imgEl = imgWrap.querySelector('img');
      if (!imgEl) return;
      var url = card.getAttribute('href') || '';
      var id = url.replace(/^produit-/, '').replace(/\.html$/, '') || nameEl.textContent.trim();
      var addBtn = document.createElement('span');
      addBtn.className = 'hc-add';
      addBtn.setAttribute('role', 'button');
      addBtn.setAttribute('tabindex', '0');
      addBtn.textContent = 'Ajouter au panier';
      function doAdd(e) {
        e.preventDefault();
        e.stopPropagation();
        add({ id: id, name: nameEl.textContent.trim(), img: imgEl.getAttribute('src'), url: url });
        flash(addBtn);
      }
      addBtn.addEventListener('click', doAdd);
      addBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') doAdd(e);
      });
      imgWrap.appendChild(addBtn);
    });
  }

  /* Bouton « Ajouter au panier » au survol des cartes de la page collection */
  function wireShopCards() {
    document.querySelectorAll('.shop-card').forEach(function (card) {
      var imgWrap = card.querySelector('.shop-card-img-wrap');
      var nameEl = card.querySelector('.shop-card-name');
      if (!imgWrap || !nameEl || imgWrap.querySelector('.shop-card-add')) return;
      var imgEl = imgWrap.querySelector('img');
      if (!imgEl) return;
      var url = card.getAttribute('href') || '';
      var id = url.replace(/^produit-/, '').replace(/\.html$/, '') || nameEl.textContent.trim();
      var addBtn = document.createElement('span');
      addBtn.className = 'shop-card-add';
      addBtn.setAttribute('role', 'button');
      addBtn.setAttribute('tabindex', '0');
      addBtn.textContent = 'Ajouter au panier';
      function doAdd(e) {
        e.preventDefault();
        e.stopPropagation();
        add({ id: id, name: nameEl.textContent.trim(), img: imgEl.getAttribute('src'), url: url });
        flash(addBtn);
      }
      addBtn.addEventListener('click', doAdd);
      addBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') doAdd(e);
      });
      imgWrap.appendChild(addBtn);
    });
  }

  function wireProductPage() {
    var path = location.pathname.split('/').pop() || '';
    if (!/^produit-/.test(path)) return;
    var slug = path.replace(/^produit-/, '').replace(/\.html$/, '');
    var mainBtn = document.getElementById('addToCartBtn');
    var nameEl = document.querySelector('.product-name');
    var mainImg = document.getElementById('mainImg') || document.querySelector('.product-img-main img');
    if (mainBtn && nameEl && mainImg && slug) {
      mainBtn.addEventListener('click', function () {
        var qtyEl = document.getElementById('qtyValue');
        var n = qtyEl ? (parseInt(qtyEl.textContent, 10) || 1) : 1;
        add({ id: slug, name: nameEl.textContent.trim(), img: mainImg.getAttribute('src'), url: path }, n);
        flash(mainBtn);
      });
    }
    document.querySelectorAll('.related-card').forEach(function (rc) {
      var addEl = rc.querySelector('.related-add');
      if (!addEl) return;
      var url = rc.getAttribute('href') || '';
      var rid = url.replace(/^produit-/, '').replace(/\.html$/, '');
      var rname = rc.querySelector('.related-card-name');
      var rimg = rc.querySelector('.related-card-img img');
      if (!rid || !rname || !rimg) return;
      addEl.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        add({ id: rid, name: rname.textContent.trim(), img: rimg.getAttribute('src'), url: url }, 1);
        flash(addEl);
      });
    });
  }

  /* ---------- Init ---------- */
  function init() {
    buildToast();
    buildDrawer();
    buildCartButton();
    wireCollectionCards();
    wireShopCards();
    wireProductPage();
    render();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
