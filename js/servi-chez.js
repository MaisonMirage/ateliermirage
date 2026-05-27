/* ═══════════════════════════════════════════════════════════════════
   ATELIER MIRAGE — "Servi chez" chip
   Affiche discrètement, sur chaque carte produit, l'adresse partenaire
   qui sert cette pièce. Preuve sociale concrète, ancrée local.
   ▸ Modifier la mapping ci-dessous pour ajuster.
   ▸ Si un produit n'a pas de partenaire attribué, aucun chip n'est rendu.
   ═══════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  // ── Mapping produit → partenaire
  // clef = slug du href produit (produit-XXX.html)
  // valeur = { name, href?, city? }
  const MAP = {
    poulpe:    { name: "Full Dessert",       city: "Marseille" },
    fraise:    { name: "L'Avenue Grill",     city: "Marseille" },
    mangue:    { name: "Dubai Sweet" },
    framboise: { name: "Royal Pâtisserie" },
    peche:     { name: "Full Dessert",       city: "Marseille" },
    citron:    { name: "L'Avenue Grill",     city: "Marseille" },
    passion:   { name: "Dubai Sweet" },
    pistache:  { name: "Aslan Kadaifs" },
    cacao:     { name: "Royal Pâtisserie" },
    arachide:  { name: "Magnus Sushi" },
    cacahuete: { name: "La Graille Mobile" },
    datte:     { name: "Aslan Kadaifs" },
    vanille:   { name: "Full Dessert",       city: "Marseille" },
  };

  const extractSlug = (href) => {
    const m = /produit-([a-z]+)\.html/i.exec(href || "");
    return m ? m[1].toLowerCase() : null;
  };

  const init = () => {
    const cards = document.querySelectorAll('.shop-grid .shop-card');
    if (!cards.length) return;

    cards.forEach((card) => {
      const slug = extractSlug(card.getAttribute('href'));
      if (!slug) return;
      const p = MAP[slug];
      if (!p || !p.name) return;

      // Éviter doublon si script re-joué
      if (card.querySelector('.shop-card-servi')) return;

      // Badge non-interactif : la carte entière pointe déjà vers la fiche produit,
      // on ne veut pas créer un second target de navigation (imbrication <a> interdite).
      const chip = document.createElement('span');
      chip.className = 'shop-card-servi';
      chip.setAttribute('aria-label', `Servi chez ${p.name}${p.city ? ', ' + p.city : ''}`);
      chip.innerHTML = `
        <span class="shop-card-servi-label">Servi chez</span>
        <span class="shop-card-servi-name">${p.name}</span>
        ${p.city ? `<span class="shop-card-servi-city">· ${p.city}</span>` : ''}
      `;

      // On insère le chip en fin de carte (après les textes)
      card.appendChild(chip);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
