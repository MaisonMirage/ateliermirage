/* ═══════════════════════════════════════════════════════════════
   ATELIER MIRAGE — Consentement cookies (RGPD / CNIL), sans librairie
   Google Analytics n'est chargé QU'APRÈS accord explicite.
   Choix mémorisé (localStorage) · bouton discret pour revenir dessus.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var GA_ID = 'G-JCL4B8SJY0';
  var KEY = 'am_cookie_consent';          // 'granted' | 'denied'
  var POLICY = 'mentions-legales.html';

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  /* ---------- Google Analytics (chargé seulement après accord) ---------- */
  function loadGA() {
    if (window.__amGA) return; window.__amGA = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }

  /* ---------- Styles (injectés) ---------- */
  function injectCSS() {
    if (document.getElementById('am-consent-css')) return;
    var st = document.createElement('style');
    st.id = 'am-consent-css';
    st.textContent =
      '#am-consent{position:fixed;left:1rem;right:1rem;bottom:1rem;max-width:520px;margin:0 auto;z-index:9000;' +
      'background:#fffaf3;color:#4a3527;border:1px solid rgba(109,72,51,.16);border-radius:14px;' +
      'box-shadow:0 18px 50px rgba(45,30,20,.22);padding:1.15rem 1.25rem;' +
      'font-family:"Jost",system-ui,sans-serif;opacity:0;transform:translateY(14px);transition:opacity .4s ease,transform .4s ease;}' +
      '#am-consent.show{opacity:1;transform:none;}' +
      '#am-consent p{margin:0 0 .9rem;font-size:.82rem;line-height:1.5;font-weight:300;color:#6d4833;}' +
      '#am-consent a{color:#4a3527;text-decoration:underline;}' +
      '#am-consent .am-c-row{display:flex;gap:.6rem;flex-wrap:wrap;}' +
      '#am-consent button{flex:1 1 auto;min-width:120px;cursor:pointer;border-radius:999px;padding:.62rem 1rem;' +
      'font-family:inherit;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;font-weight:500;transition:opacity .2s;}' +
      '#am-consent button:hover{opacity:.85;}' +
      '#am-consent .am-c-accept{background:#4a3527;color:#fffaf3;border:none;}' +
      '#am-consent .am-c-refuse{background:transparent;color:#6d4833;border:1px solid rgba(109,72,51,.3);}' +
      '#am-consent-reopen{position:fixed;left:.9rem;bottom:.9rem;z-index:8000;width:38px;height:38px;border-radius:50%;' +
      'background:#fffaf3;border:1px solid rgba(109,72,51,.2);box-shadow:0 6px 18px rgba(45,30,20,.16);' +
      'cursor:pointer;display:none;align-items:center;justify-content:center;color:#6d4833;padding:0;}' +
      '#am-consent-reopen svg{width:18px;height:18px;}' +
      '@media(max-width:600px){#am-consent .am-c-row{flex-direction:column-reverse;}}';
    document.head.appendChild(st);
  }

  var banner, reopen;

  function buildReopen() {
    if (reopen) return reopen;
    reopen = document.createElement('button');
    reopen.id = 'am-consent-reopen';
    reopen.type = 'button';
    reopen.setAttribute('aria-label', 'Gérer les cookies');
    reopen.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z"/><circle cx="9" cy="11" r="1"/><circle cx="14" cy="15" r="1"/><circle cx="15.5" cy="9.5" r=".6"/></svg>';
    reopen.addEventListener('click', showBanner);
    document.body.appendChild(reopen);
    return reopen;
  }

  function showReopen() { buildReopen().style.display = 'flex'; }

  function buildBanner() {
    if (banner) return banner;
    banner = document.createElement('div');
    banner.id = 'am-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Consentement aux cookies');
    banner.innerHTML =
      '<p>Nous utilisons des cookies de mesure d\'audience (Google Analytics) pour améliorer le site. ' +
      'Vous pouvez accepter ou refuser. <a href="' + POLICY + '">En savoir plus</a>.</p>' +
      '<div class="am-c-row">' +
      '<button type="button" class="am-c-refuse">Refuser</button>' +
      '<button type="button" class="am-c-accept">Accepter</button>' +
      '</div>';
    document.body.appendChild(banner);
    banner.querySelector('.am-c-accept').addEventListener('click', function () {
      store('granted'); loadGA(); hideBanner(); showReopen();
    });
    banner.querySelector('.am-c-refuse').addEventListener('click', function () {
      store('denied'); hideBanner(); showReopen();
    });
    return banner;
  }

  function showBanner() {
    buildBanner();
    requestAnimationFrame(function () { banner.classList.add('show'); });
  }
  function hideBanner() {
    if (!banner) return;
    banner.classList.remove('show');
    setTimeout(function () { if (banner) banner.style.display = 'none'; }, 400);
  }

  function init() {
    injectCSS();
    var choice = read();
    if (choice === 'granted') { loadGA(); showReopen(); }
    else if (choice === 'denied') { showReopen(); }
    else { showBanner(); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
