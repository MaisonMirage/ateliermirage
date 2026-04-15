# Guide Photoshop — Retouche Photos Intérieurs Atelier Mirage

> Guide pas-à-pas pour les 6 photos de coupe (intérieurs) générées via Pomelli. Les intérieurs ont des enjeux différents des packshots extérieurs : lisibilité des strates, saturation maîtrisée des inserts, coulant crédible, cohérence éditoriale entre les 6.

**Fichiers à traiter :**
- `img/photos produits HD/produits interieur/arachide-int.png`
- `img/photos produits HD/produits interieur/cacahuete-int.png`
- `img/photos produits HD/produits interieur/framboise-int.png`
- `img/photos produits HD/produits interieur/mangue-int.png`
- `img/photos produits HD/produits interieur/passion-int.png`
- `img/photos produits HD/produits interieur/vanille-int.png`

---

## PHILOSOPHIE DE LA RETOUCHE INTÉRIEURS

La différence avec les packshots : ici on est en **mode studio intimité**, pas en mode théâtre graphite. La retouche vise trois objectifs :

1. **Architecture lisible** — chaque strate (ganache / insert / génoise / coque) doit se lire comme un manuscrit, sans bavure
2. **Insert héros** — la couleur de l'insert (rouge framboise, orange passion/mangue, ambre caramel) doit être saturée à 90% mais sans cartoon
3. **Cohérence série** — les 6 photos doivent lire comme une série, pas 6 tirages disparates. Même tonalité, même densité, même grain

Tu vas donc appliquer le même preset Camera Raw de base à tous, puis ajuster produit par produit sur les strates couleur et le coulant.

---

## AVANT DE COMMENCER

### Organisation des fichiers

Crée un dossier `intérieurs-retouchés/` à côté du dossier `produits interieur/`. Toutes les sauvegardes iront là.

### Ordre de traitement recommandé

1. **Passion** (le plus abouti, sert de référence pour les autres)
2. **Vanille** (contraste fort noir/ivoire, calibrage des noirs)
3. **Framboise** (saturation rouge à maîtriser, coulant organique)
4. **Mangue** (velours mat + cubes)
5. **Arachide** (⚠️ harmonisation de fond requise)
6. **Cacahuète** (calibrage caramel)

---

## COHÉRENCE DES FONDS — ✅ VALIDÉE

Après régénération de l'arachide, les 6 images partagent désormais la même logique de fond : **cyclorama mat infinity cove**, teintes pastel complémentaires à l'insert.

| Produit | Fond | Statut |
|---|---|---|
| Arachide | Beige chaud cyclo mat | ✅ OK (régénérée) |
| Cacahuète | Rose poudré cyclo mat | ✅ OK |
| Framboise | Rose poudré cyclo mat | ✅ OK (V7) |
| Mangue | Bleu poudré cyclo mat | ✅ OK |
| Passion | Ivoire crème cyclo mat | ✅ OK |
| Vanille | Beige chaud cyclo mat | ✅ OK |

Aucune harmonisation Photoshop n'est nécessaire sur les fonds. On passe directement au workflow de retouche.

---

## ÉTAPE 0 — PRÉPARATION COMMUNE (à faire sur chaque image)

1. **Fichier → Ouvrir** la photo `xxx-int.png`
2. **Clic droit** sur le calque « Arrière-plan » → **Dupliquer le calque** → OK
3. **Travaille toujours sur la copie**

---

## ÉTAPE 1 — CAMERA RAW (preset éditorial intérieurs)

**Filtre → Filtre Camera Raw**

### Preset commun à appliquer AVANT ajustements produit

| Curseur | Valeur | Pourquoi |
|---|---|---|
| Exposition | `+0.10` à `+0.20` | Les intérieurs Pomelli sortent un chouïa sombres |
| Contraste | `+12` | Donner du pep aux strates sans exagérer |
| Hautes lumières | `-20` | Récupérer détail dans les reflets brillants (glaçage passion, framboise, caramel) |
| Ombres | `+15` | Ouvrir les zones sombres de la coque vanille, du dôme passion |
| Blancs | `+8` | Faire chanter les highlights spéculaires |
| Noirs | `-8` | Ancrer la profondeur |
| Texture | `+8` | Révèle la structure des strates et la mie de la génoise |
| Clarté | `+5` | Très léger, pour ne pas cartooniser |
| Vibrance | `+10` | Prioritise les couleurs fades (rose poudré, ivoire) sans dé-saturer la peau humaine (non applicable ici mais bonne habitude) |
| Saturation | `+3` | Trop de saturation tue le côté éditorial |

### Température / Teinte

Vérifie l'équilibre. Les Pomelli tirent parfois magenta ou vert. Ajuste :
- **Température** : `-3` à `+3` selon la dominante (vers jaune si trop bleu, vers bleu si trop jaune)
- **Teinte** : `-2` à `+2` selon (vers vert si trop magenta)

Objectif : le fond cyclorama doit rendre **exactement la même couleur que le packshot extérieur correspondant**. Ouvre en parallèle le packshot dans un onglet Photoshop pour comparer.

### Courbe tonale (optionnel mais recommandé pour série)

Dans Camera Raw → onglet **Courbe** → mode **Paramétrique** :
- Hautes lumières : `+5`
- Tons clairs : `0`
- Tons foncés : `+3`
- Tons sombres : `-3`

Crée une légère courbe en S qui donne une signature éditoriale unifiée aux 6.

### Sauvegarder le preset

En haut à droite du panneau Camera Raw → clic sur l'icône à trois points → **Nouveau paramètre prédéfini** → nomme-le `Atelier Mirage — Intérieurs` → coche tous les sliders → **OK**. Tu pourras l'appliquer en un clic sur les 5 photos suivantes.

Clique **OK** pour appliquer Camera Raw.

---

## ÉTAPE 2 — TSL (SATURATION CIBLÉE PAR COULEUR)

Retour dans Camera Raw (ou en calque de réglage **Teinte/Saturation**). Cette étape sert à booster l'insert sans toucher au reste.

### Passion (insert orange + glaçage bordeaux)

- Orange : Saturation `+15`, Luminance `+5`
- Rouge : Saturation `+8` (le bordeaux du glaçage)
- Jaune : Saturation `+5` (flocons d'or)
- Bleu : Saturation `-5` (neutralise toute dominante parasite)

### Framboise (insert rouge + compotée à pépins)

- Rouge : Saturation `+15`, Luminance `-3` (pour un rouge profond pas pinkish)
- Magenta : Saturation `+10`
- Jaune : Saturation `+5` (les pépins de framboise)

### Mangue (insert orange saturé + cubes)

- Orange : Saturation `+18`, Luminance `+3`
- Jaune : Saturation `+10` (les cubes)
- Bleu : Saturation `-3` (le fond bleu poudré reste doux)

### Arachide / Cacahuète (insert caramel ambre)

- Orange : Saturation `+10` (le caramel ambre)
- Jaune : Saturation `+8` (la feuilletine dorée)
- Rouge : Saturation `+5`

### Vanille (caviar noir + caramel ambre)

- Orange : Saturation `+8` (le caramel/praliné)
- Jaune : Saturation `+5`
- Noir Cmd+K : ne pas toucher (on veut que les grains de vanille restent neutres noirs)

---

## ÉTAPE 3 — DODGE & BURN 50% GRIS (sculpter les volumes)

C'est la technique pro pour donner du relief sans cramer les blancs ni boucher les noirs.

### Créer le calque D&B

1. **Calque → Nouveau → Calque** (ou Shift+Cmd+N)
2. Nom : `D&B 50%`
3. **Mode** : **Incrustation**
4. **Cocher** : « Remplir avec une couleur neutre Incrustation (50% gris) »
5. **OK**

### Régler le pinceau

- Outil **Densité+** (D) = brûler (assombrir)
- Outil **Densité-** (O) = éclaircir
- Exposition : **8%** (très doux)
- Plage : **Tons moyens**
- Dureté : **0%**
- Taille : ~200 px pour les grandes zones, ~50 px pour les détails

### Zones à sculpter par produit

**Passion** — Éclaircir le sommet bombé du dôme bordeaux (highlight spéculaire) → Assombrir la base du dôme (ombre portée) → Éclaircir le dessus de la pulpe orange (humidité) → Éclaircir chaque graine noire individuellement (1 pixel chacune).

**Framboise** — Éclaircir la naissance de chaque drupéole (~15 drupéoles les plus visibles près de la coupe) → Assombrir les creux entre drupéoles → Éclaircir le dessus de la compotée (humidité) → Éclaircir les pépins jaunes un par un.

**Mangue** — Éclaircir les arêtes des cubes de pulpe (faces les plus exposées à la lumière) → Assombrir les creux entre cubes → Garder la coque velours mate uniforme (NE PAS sculpter le velours, il perdrait son côté daim).

**Arachide / Cacahuète** — Éclaircir le dessus du caramel (brillance humide) → Éclaircir chaque cacahuète individuellement → Assombrir les creux de la texture coque figure-8.

**Vanille** — Éclaircir le dessus bombé du dôme ganache → Assombrir les flancs → Éclaircir chaque grain de caviar noir un par un (minuscule highlight) → Éclaircir la strate feuilletine dorée.

**Temps estimé** : 10-15 min par photo. Ne pas se précipiter.

---

## ÉTAPE 4 — TAMPON DE DUPLICATION (corriger les hallucinations Pomelli)

C'est là qu'on corrige les artefacts que Pomelli a générés.

### Outil

- Raccourci **S**
- Opacité : **80-100%**
- Dureté : **30-50%**
- Taille : adaptée à la zone

**Technique** : Alt-clic sur une zone propre à copier → clic sur la zone à corriger → la source se déplace en même temps que tu peints.

### Zones à vérifier par produit

**Passion** — Vérifier qu'il n'y a PAS de double strate parasite (j'avais vu une bande bordeaux au-dessus de la génoise dans d'anciennes versions). La génoise doit être UNE seule bande fine horizontale. Si double bande : tamponner la bande parasite avec la texture ganache au-dessus.

**Framboise** — Vérifier qu'il n'y a **PAS de praliné/noisette/cacahuète** dans la coupe (hallucination fréquente). Si présent : tamponner avec la compotée rouge ou la ganache vanille selon la zone. Vérifier aussi les drupéoles : si Pomelli a créé un pattern trop régulier « polka-dot » sur une zone, varier en tamponnant une drupéole voisine de taille différente.

**Mangue** — Vérifier que la coque reste velours mat uniforme sans brillances parasites.

**Arachide / Cacahuète** — Vérifier que les cacahuètes entières autour de la coupe sont bien dessinées (pas d'hybride cacahuète-amande). Si forme bizarre : tamponner une cacahuète voisine bien formée.

**Vanille** — Vérifier la gousse : les pointes doivent être fines et courbées, sans aplat bizarre. Vérifier l'intérieur : pas de cube/carré parasite dans la ganache ou le praliné.

**Coulant** (toutes photos) — Si la flaque est trop large ou trop circulaire, tamponner les bords extérieurs avec le fond cyclorama pour réduire la surface. Garder juste un filet organique ou une perle.

---

## ÉTAPE 5 — ACCENTUATION (netteté finale)

**Filtre → Netteté → Accentuation**

Après avoir fusionné une copie des calques visibles (Shift+Cmd+Alt+E).

### Paramètres par produit

| Produit | Gain | Rayon | Seuil |
|---|---|---|---|
| Passion | `80%` | `1.2 px` | `3` |
| Framboise | `100%` | `1.5 px` | `3` |
| Mangue (velours) | `60%` | `1.0 px` | `4` |
| Arachide | `90%` | `1.2 px` | `3` |
| Cacahuète | `80%` | `1.2 px` | `3` |
| Vanille | `85%` | `1.2 px` | `3` |

**Attention** : Ne pas accentuer la mangue trop fort — le velours perdrait son aspect daim. Le seuil `4` protège justement les zones douces.

### Masquer l'accentuation (optionnel mais pro)

Pour accentuer uniquement la face de coupe sans accentuer le fond cyclorama :

1. Après le filtre, ajouter un **masque de fusion noir** (clic sur l'icône masque + Alt)
2. Avec pinceau blanc opacité 80% → peindre SEULEMENT sur la face de coupe et les textures (drupéoles, cacahuètes, graines)
3. Laisser le fond cyclorama masqué (reste flou/doux)

Ça crée une profondeur éditoriale : ton œil lit la coupe en HD, le fond reste silencieux.

---

## ÉTAPE 6 — EXPORT WEBP RESPONSIVE

### Tailles à exporter

| Usage | Taille | Qualité |
|---|---|---|
| Hero produit | `1500×1500` | 85 |
| Gallery strip (tablette) | `800×800` | 82 |
| Thumb (mobile/grid) | `400×400` | 80 |

### Procédure export

1. **Fichier → Exportation → Exporter sous**
2. **Format** : WebP
3. **Qualité** : 85 (hero), 82 (tablette), 80 (thumb)
4. **Métadonnées** : aucune
5. **Espace colorimétrique** : sRGB, **cocher Intégrer le profil**
6. Dimensions : **1500×1500** (hero)
7. **Exporter** → Nom : `{produit}-int.webp` → dossier `intérieurs-retouchés/`

Recommencer 2 fois de plus : 800×800 nommé `{produit}-int-800.webp`, 400×400 nommé `{produit}-int-400.webp`.

### Résultat attendu

Dossier `intérieurs-retouchés/` contient 18 fichiers :
```
arachide-int.webp
arachide-int-800.webp
arachide-int-400.webp
cacahuete-int.webp
cacahuete-int-800.webp
cacahuete-int-400.webp
framboise-int.webp
framboise-int-800.webp
framboise-int-400.webp
mangue-int.webp
mangue-int-800.webp
mangue-int-400.webp
passion-int.webp
passion-int-800.webp
passion-int-400.webp
vanille-int.webp
vanille-int-800.webp
vanille-int-400.webp
```

---

## CHECKLIST AVANT DE DÉCLARER « FINI »

Avant d'intégrer sur le site, vérifier ces 8 points sur chaque photo :

- [ ] Le fond cyclorama a exactement la même couleur que le packshot extérieur
- [ ] Les strates (ganache / insert / génoise / coque) sont toutes lisibles individuellement
- [ ] Le caviar de vanille est visible dans les préparations vanille (règle #4 du brief)
- [ ] Le coulant respecte les 3 variantes autorisées (contenu, suspendu, organique) — zéro flaque miroir
- [ ] Aucune hallucination Pomelli (praliné parasite dans la framboise, double génoise, etc.)
- [ ] La pièce intacte en arrière-plan est bien floue et lisible comme référence
- [ ] Les 6 photos ont le même niveau de contraste/saturation/netteté (cohérence série)
- [ ] Export WebP 1500 fait sans dégrader la netteté

---

## PROCHAINE ÉTAPE

Une fois les 6 images exportées en WebP, on intègre sur les pages produits en **gallery strip** sous le packshot hero. Template HTML/CSS à fournir.

Format attendu :

```
┌────────────────────────────────────┐
│                                    │
│         PACKSHOT HERO              │  ← Mode théâtre graphite
│         (1500×1500)                │
│                                    │
└────────────────────────────────────┘
    ○  ○  ○  ○
[thumb] [thumb] [thumb] [thumb]        ← Gallery 4 miniatures
 pack    int    détail1  détail2        cliquables
```

Quand tu cliques sur la thumb intérieur, le hero crossfade vers la photo de coupe. Discipline Salur.

---

**Durée totale estimée pour les 6 photos :**
- Camera Raw + TSL : 5 min par photo × 6 = 30 min
- D&B : 10-15 min par photo × 6 = 60-90 min
- Tampon : 5-10 min par photo × 6 = 30-60 min
- Accentuation + Export : 5 min par photo × 6 = 30 min
- **Total : 2h30 à 3h30**

Si tu veux gagner du temps, commence par Passion (référence), exporte, puis traite les 5 autres en batch avec le preset Camera Raw sauvegardé.
