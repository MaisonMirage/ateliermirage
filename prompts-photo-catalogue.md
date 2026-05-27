# Atelier Mirage — Prompts photo pour le catalogue événementiel

Objectif : générer des photos sur mesure pour remplacer les visuels actuels du
catalogue et se rapprocher au maximum du niveau de Yann Couvreur. Aujourd'hui le
catalogue réutilise les photos du site — correctes, mais qui « sentent » l'image
générée : arrangements trop parfaits, lumière plate, textures lisses.

Les prompts ci-dessous sont **en anglais** : les modèles d'image (Pomelli,
Midjourney, etc.) rendent nettement mieux en anglais. Chacun est complet et
prêt à copier-coller tel quel.

---

## Pourquoi nos images font « fausses » — et comment corriger

Tu l'as bien vu sur les mignardises : **alignées à la perfection, en grille
régulière**. Aucun photographe ni styliste culinaire ne dispose les pièces
comme ça. C'est le réflexe n°1 qui trahit une image générée.

Les quatre choses qui font qu'une image paraît réelle :

1. **L'arrangement** — un styliste pose les pièces en grappe organique : nombre
   impair, angles tous différents, espacements irréguliers, une ou deux pièces
   plus rapprochées, jamais une grille. C'est « désordonné avec intention ».
2. **La lumière** — une seule grande source douce et directionnelle (lumière de
   fenêtre). Elle crée des ombres douces mais nettes et des reflets francs. La
   lumière plate / multi-sources = look 3D.
3. **Les imperfections** — micro-textures, vrais reflets de l'environnement dans
   le glaçage, légère poussière de profondeur de champ, ombres de contact, une
   pièce pas tout à fait parfaite. La perfection absolue = plastique.
4. **L'étalonnage** — couleurs chaudes, légèrement désaturées, grain de film
   discret. Pas de saturation criarde.

---

## Réglages communs à tous les prompts

**Format (aspect ratio) selon l'usage dans le catalogue :**

- Couverture, fiches création, sur-mesure, mignardises → **3:4 vertical**
- Page « La Maison » (portrait artisan) → **4:5 vertical**
- Page « Les pièces signature » (bandeau large) → **16:9 horizontal**

**Negative prompt** (à coller dans le champ prévu, si le modèle le permet) :

```
3D render, CGI, octane render, plastic look, perfectly symmetrical,
grid arrangement, evenly spaced, identical repeated pieces, harsh flash,
oversaturated colors, HDR, cartoon, illustration, low resolution, blurry,
watermark, text, logo, hands with extra fingers
```

**Conseil d'usage :** génère 4 variations par prompt, garde la meilleure,
relance-la en variation. Vise toujours la version la moins « propre ».

---

## 1 — Couverture · Pièce montée

*Catalogue : panneau image de la couverture. Format 3:4 vertical.*

```
Editorial food photography for a luxury pâtisserie catalogue, in the style of a
high-end Cédric Grolet / Yann Couvreur monograph. A spectacular croquembouche-
style pyramid built on a slim four-tier gold metal stand. Each tier holds
trompe-l'œil pastry entremets sculpted to look exactly like real fruit: glossy
ruby-red strawberries with delicate green pastry leaves, golden airbrushed
lemons, plump red raspberries, milk-chocolate dates. The fruits are placed
naturally — varied angles, a few leaning, slightly uneven spacing, never a rigid
grid. Soft warm-beige seamless paper backdrop. Shot on a medium-format camera
with a 120mm macro lens at f/5.6, ISO 100; a single large soft light from the
upper left (diffused north-window light) giving gentle directional highlights
and soft-edged natural shadows; the front pieces tack-sharp with a slight
natural focus falloff toward the top of the tower. Hyper-real surface micro-
texture, true specular highlights with faint real reflections in the glaze, a
soft contact shadow under the stand. Warm, refined, slightly muted color grade
with a hint of fine film grain. Generous negative space above the tower.
Absolutely photorealistic, indistinguishable from a real photograph — not a 3D
render, not CGI. Vertical composition, aspect ratio 3:4.
```

---

## 2 — La Maison · L'artisan à l'atelier

*Catalogue : colonne image de la page « La Maison ». Format 4:5 vertical.*

```
An intimate editorial portrait of a pastry chef at work in his Marseille
atelier, photographed candidly mid-gesture as he finishes a trompe-l'œil fruit
dessert with fine tweezers. He wears a clean white chef's jacket and black
nitrile gloves. Warm low-key lighting: a single warm light source pools on his
hands and the dessert while the background falls into soft shadow. His hands and
the pastry are tack-sharp, shallow depth of field, the rest gently soft.
Documentary, unposed, quiet concentration. Shot on a medium-format camera with
an 80mm lens at f/2.8, ISO 200. Warm, refined, slightly muted color grade with
fine film grain. Absolutely photorealistic, indistinguishable from a real
photograph — not a 3D render, not CGI. Vertical portrait, aspect ratio 4:5.
```

---

## 3 — Les pièces signature · Table d'événement

*Catalogue : bandeau large en haut de la page. Format 16:9 horizontal.*

```
A styled dessert table at an elegant private event, refined wedding-editorial
style. A long table dressed in a soft natural-linen cloth, covered with dozens
of trompe-l'œil fruit pâtisseries displayed on white porcelain cake stands and
directly on the linen. Dried pampas grass, sprigs of baby's breath, slim ivory
taper candles and a small printed place card. Soft daylight pours from a tall
window on the left — airy, warm, slightly hazy. The pieces are scattered
naturally across the table, not aligned. Shot on a medium-format camera with a
50mm lens at f/4, ISO 100; soft directional window light, gentle natural
shadows; foreground sharp with a soft focus falloff into the room. Warm, refined,
slightly muted color grade, fine film grain. Absolutely photorealistic,
indistinguishable from a real photograph — not a 3D render, not CGI. Wide
landscape composition, aspect ratio 16:9.
```

---

## 4 — Fiche · Le Poulpe

*Catalogue : colonne image de la fiche. Format 3:4 vertical.*

```
Studio food photography for a luxury pâtisserie catalogue. A loose, organic
cluster of five small trompe-l'œil pastry entremets, each sculpted in the shape
of a tiny octopus with curling tentacles, finished in a luminous gold mirror
glaze with subtle airbrushed shading. They rest on a warm chocolate-brown
seamless paper backdrop. Arranged the way a food stylist would: five pieces
(odd number) in a relaxed cluster, every piece at a different angle, uneven and
intentional spacing, one piece slightly apart — never a grid, never aligned.
Shot from a 40-degree high angle on a medium-format camera with a 120mm macro
lens at f/5.6, ISO 100; a single large soft light from the upper left with
gentle directional highlights and soft-edged shadows; front pieces tack-sharp
with a slight focus falloff behind. Hyper-real surface micro-texture, true gold
specular highlights with faint real reflections in the glaze, soft contact
shadows on the paper. Warm, refined, slightly muted color grade, fine film
grain. Absolutely photorealistic — not a 3D render, not CGI. Aspect ratio 3:4.
```

---

## 5 — Fiche · La Fraise

*Catalogue : colonne image de la fiche. Format 3:4 vertical.*

```
Studio food photography for a luxury pâtisserie catalogue. A loose, organic
cluster of six trompe-l'œil pastry entremets shaped exactly like ripe
strawberries — a flawless glossy ruby-red mirror glaze, each crowned with a
small delicate green pastry calyx of leaves. They rest on a soft coral-pink
seamless paper backdrop. Arranged the way a food stylist would: a relaxed
cluster, every berry at a different angle, uneven and intentional spacing, two
pieces casually closer together — never a grid, never aligned. Shot from a
40-degree high angle on a medium-format camera with a 120mm macro lens at f/5.6,
ISO 100; a single large soft light from the upper left, gentle directional
highlights and soft-edged shadows; front berries tack-sharp with a slight focus
falloff behind. Hyper-real surface micro-texture, true specular highlights with
faint real reflections in the glossy glaze, soft contact shadows. Warm, refined,
slightly muted color grade, fine film grain. Absolutely photorealistic — not a
3D render, not CGI. Aspect ratio 3:4.
```

---

## 6 — Fiche · La Pêche

*Catalogue : colonne image de la fiche. Format 3:4 vertical.*

```
Studio food photography for a luxury pâtisserie catalogue. A loose, organic
cluster of five trompe-l'œil pastry entremets shaped exactly like ripe peaches —
a soft matte airbrushed skin graduating from warm yellow to an orange-red blush,
with a fine velvety peach-fuzz texture and a subtle natural seam. They rest on a
warm beige seamless paper backdrop. Arranged the way a food stylist would: five
peaches in a relaxed cluster, each at a different angle, uneven intentional
spacing, one slightly apart — never a grid, never aligned. Shot from a 40-degree
high angle on a medium-format camera with a 120mm macro lens at f/5.6, ISO 100;
a single large soft light from the upper left, gentle directional highlights
that reveal the velvety matte texture, soft-edged natural shadows; front pieces
tack-sharp with a slight focus falloff behind. Hyper-real micro-texture, soft
contact shadows. Warm, refined, slightly muted color grade, fine film grain.
Absolutely photorealistic — not a 3D render, not CGI. Aspect ratio 3:4.
```

---

## 7 — Fiche · La Framboise

*Catalogue : colonne image de la fiche. Format 3:4 vertical.*

```
Studio food photography for a luxury pâtisserie catalogue. A loose, organic
cluster of five trompe-l'œil pastry entremets shaped exactly like raspberries —
a domed cluster of tiny rounded drupelets, deep red, finished in a soft red
velvet spray (matte, suede-like, NOT glossy). They rest on a dusty-rose seamless
paper backdrop. Arranged the way a food stylist would: a relaxed cluster, each
piece at a different angle, uneven intentional spacing, two casually closer —
never a grid, never aligned. Shot from a 40-degree high angle on a medium-format
camera with a 120mm macro lens at f/5.6, ISO 100; a single large soft light from
the upper left, gentle directional light that reveals the matte velvet texture
and every drupelet, soft-edged natural shadows; front pieces tack-sharp with a
slight focus falloff behind. Hyper-real micro-texture, soft contact shadows.
Warm, refined, slightly muted color grade, fine film grain. Absolutely
photorealistic — not a 3D render, not CGI. Aspect ratio 3:4.
```

---

## 8 — Fiche · Le Citron

*Catalogue : colonne image de la fiche. Format 3:4 vertical.*

```
Studio food photography for a luxury pâtisserie catalogue. A loose, organic
cluster of five trompe-l'œil pastry entremets shaped exactly like lemons — a
matte airbrushed lemon-yellow skin with a finely pored, dimpled citrus-peel
texture and tiny green stem ends. They rest on a soft cream seamless paper
backdrop. Arranged the way a food stylist would: five lemons in a relaxed
cluster, each at a different angle, uneven intentional spacing, one slightly
apart — never a grid, never aligned. Shot from a 40-degree high angle on a
medium-format camera with a 120mm macro lens at f/5.6, ISO 100; a single large
soft light from the upper left, gentle raking light that reveals the pored peel
texture, soft-edged natural shadows; front pieces tack-sharp with a slight focus
falloff behind. Hyper-real micro-texture, soft contact shadows. Warm, refined,
slightly muted color grade, fine film grain. Absolutely photorealistic — not a
3D render, not CGI. Aspect ratio 3:4.
```

---

## 9 — Fiche · La Passion

*Catalogue : colonne image de la fiche. Format 3:4 vertical.*

```
Studio food photography for a luxury pâtisserie catalogue. A loose, organic
cluster of five trompe-l'œil pastry entremets — glossy domed spheres glazed in
deep violet shading into gold, scattered with a few flecks of edible gold leaf,
evoking exotic passion fruit. They rest on a muted mauve-brown seamless paper
backdrop. Arranged the way a food stylist would: five spheres in a relaxed
cluster, each turned differently, uneven intentional spacing, two casually
closer — never a grid, never aligned. Shot from a 40-degree high angle on a
medium-format camera with a 120mm macro lens at f/5.6, ISO 100; a single large
soft light from the upper left, gentle directional highlights with crisp real
reflections in the glossy glaze, soft-edged natural shadows; front pieces
tack-sharp with a slight focus falloff behind. Hyper-real micro-texture, soft
contact shadows. Warm, refined, slightly muted color grade, fine film grain.
Absolutely photorealistic — not a 3D render, not CGI. Aspect ratio 3:4.
```

---

## 10 — Fiche · Le Cacao

*Catalogue : colonne image de la fiche. Format 3:4 vertical.*

```
Studio food photography for a luxury pâtisserie catalogue. A loose, organic
cluster of five trompe-l'œil pastry entremets shaped like cocoa beans / small
cacao pods — a dark chocolate shell with a sculpted ridged, faceted texture,
semi-matte with soft glossy highlights. They rest on a deep dark-brown seamless
paper backdrop, low-key and moody. Arranged the way a food stylist would: five
pieces in a relaxed cluster, each at a different angle, uneven intentional
spacing, one slightly apart — never a grid, never aligned. Shot from a 40-degree
high angle on a medium-format camera with a 120mm macro lens at f/5.6, ISO 100;
a single large soft light from the upper left raking across the surface to
reveal the ridged texture, soft-edged natural shadows; front pieces tack-sharp
with a slight focus falloff behind. Hyper-real micro-texture, soft contact
shadows. Warm, refined, slightly muted color grade, fine film grain. Absolutely
photorealistic — not a 3D render, not CGI. Aspect ratio 3:4.
```

---

## 11 — Fiche · La Datte

*Catalogue : colonne image de la fiche. Format 3:4 vertical.*

```
Studio food photography for a luxury pâtisserie catalogue. A loose, organic
cluster of six trompe-l'œil pastry entremets shaped exactly like Medjool dates —
a milk-chocolate shell hand-painted to look like wrinkled amber date skin, with
natural folds, honeyed reflections and a soft satin sheen. They rest on a warm
taupe seamless paper backdrop. Arranged the way a food stylist would: six dates
in a relaxed cluster, each at a different angle, uneven intentional spacing, two
casually closer — never a grid, never aligned. Shot from a 40-degree high angle
on a medium-format camera with a 120mm macro lens at f/5.6, ISO 100; a single
large soft light from the upper left, gentle directional highlights that catch
the satin sheen and painted folds, soft-edged natural shadows; front pieces
tack-sharp with a slight focus falloff behind. Hyper-real micro-texture, soft
contact shadows. Warm, refined, slightly muted color grade, fine film grain.
Absolutely photorealistic — not a 3D render, not CGI. Aspect ratio 3:4.
```

---

## 12 — La création sur mesure · Pièce grand format

*Catalogue : colonne image de la page sur-mesure. Format 3:4 vertical.*

```
Studio food photography for a luxury pâtisserie catalogue. A single oversized,
show-stopping trompe-l'œil centerpiece — a giant raspberry entremets the size of
a melon, a flawless domed cluster of glossy deep-red drupelets — presented alone
as a sculptural object on a soft warm-coral seamless paper backdrop. Dramatic
single-source side light rakes across the surface from the left, revealing every
facet and drupelet, with a crisp specular highlight and a long soft shadow to
the right. Shot on a medium-format camera with a 120mm macro lens at f/8, ISO
100; the piece tack-sharp front to back, a soft contact shadow and faint
reflection on the paper. Generous negative space around the piece to feel
monumental. Warm, refined, slightly muted color grade, fine film grain.
Absolutely photorealistic, indistinguishable from a real photograph — not a 3D
render, not CGI. Vertical composition, aspect ratio 3:4.
```

---

## 13 — Les mignardises · Plateau

*Catalogue : colonne image de la page mignardises. Format 3:4 vertical.*
*C'est LA photo à reprendre — la version actuelle est en grille parfaite.*

```
Studio food photography for a luxury pâtisserie catalogue. An assortment of
trompe-l'œil pâtisserie mignardises — small fruit-shaped desserts: mini glossy
red strawberries with green pastry leaves, little airbrushed peaches, plump
raspberries, violet-and-gold glazed spheres — presented on a white marble
serving board. CRITICAL: the pieces are NOT lined up in rows and NOT in a grid.
A food stylist has placed them in a loose, organic, slightly clustered
arrangement: varied angles, uneven and natural gaps, a few pieces casually
touching or closer together, others with more space, the whole composition
relaxed and imperfect, following the rule of thirds. Soft daylight from a window
on the left. Shot from a 35-degree high angle on a medium-format camera with a
100mm macro lens at f/4.5, ISO 100; gentle directional light, soft natural
shadows, the front pieces tack-sharp with a soft focus falloff toward the back
of the board. Hyper-real surface micro-texture, true specular highlights with
faint real reflections, soft contact shadows on the marble. Warm, refined,
slightly muted color grade, fine film grain. Absolutely photorealistic,
indistinguishable from a real photograph — not a 3D render, not CGI. Aspect
ratio 3:4.
```

---

## Pour aller plus loin

- **Cohérence de série** : garde le même fond, la même lumière et le même angle
  pour les 8 fiches — c'est ce qui donne l'effet « collection » d'un vrai
  catalogue. Si un modèle te sort une belle lumière, réutilise exactement la
  même formulation pour les autres.
- **Réalisme** : si une image reste trop « propre », ajoute dans le prompt
  *« with tiny natural imperfections, one piece slightly off, a faint dusting of
  cocoa / a stray crumb on the surface »*.
- **Le test** : si les pièces semblent posées par une règle et un compas, relance.
  Une vraie photo a toujours un petit désordre.
