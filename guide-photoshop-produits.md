# Guide Photoshop — Retouche Photos Produits Atelier Mirage

> Guide pas-à-pas pour débutant complet. On garde les arrière-plans d'origine. Chaque clic est détaillé.

---

## AVANT DE COMMENCER

### Ouvrir une photo
1. Lance Photoshop
2. En haut à gauche : **Fichier** → **Ouvrir**
3. Navigue jusqu'à ta photo (ex: `poulpe-gold.png`)
4. Clique **Ouvrir**

### Comprendre l'interface
- **En haut** : la barre de menus (Fichier, Edition, Image, Calque, Sélection, Filtre...)
- **À gauche** : la barre d'outils (les icônes pour sélectionner, peindre, etc.)
- **À droite** : les panneaux (Calques, Propriétés, Couleur...)
- **Au centre** : ta photo

### Règle d'or : travailler en non-destructif
Avant TOUTE modification, duplique ton calque :
1. Dans le panneau **Calques** (en bas à droite), tu vois un calque nommé "Arrière-plan"
2. Fais **clic droit** dessus → **Dupliquer le calque** → **OK**
3. Travaille toujours sur la copie. Si tu te trompes, tu peux supprimer la copie et recommencer.

### Raccourci magique : Annuler
- **Cmd+Z** (Mac) = annuler la dernière action
- Tu peux appuyer plusieurs fois pour annuler plusieurs actions

---

## ⚠️ RÈGLE IMPORTANTE — TEXTURE SELON LA TECHNIQUE

Toutes les photos ne se traitent PAS pareil pour la texture. Ça dépend de la technique utilisée pour créer le dessert :

**Desserts à surface LISSE (aérographe / glaçage / laque brillante) — Texture à 0, négative ou très légère :**
- La Pêche (aérographe) → Texture `-10` à `-15`
- Le Citron (aérographe) → Texture `-10` à `-15`
- La Mangue (aérographe) → Texture `0` à `-5`
- L'Arachide (glaçage) → Texture `0` à `+5`
- La Vanille (glaçage noir + brillance peinte au pinceau) → Texture `0`
- Le Cacao (laque chocolat) → Texture `+5` max

Pour ces desserts, ne PAS appliquer le Masque flou / Netteté optimisée à la fin (ça ferait ressortir les fils de pinceau / micro-textures qu'on veut cacher).

**Desserts à surface TEXTURÉE — Texture élevée (comme dans le guide de base) :**
- La Framboise (drupéoles grainées) → Texture `+20`
- Le Poulpe (feuille d'or texturée) → Texture `+10`
- La Fraise (petits akènes sur la peau) → Texture `+12`
- La Passion (éclats d'or) → Texture `+12`

Pour ces desserts, le Masque flou / Netteté optimisée est OK à la fin.

---

## LES 4 ÉTAPES COMMUNES (à faire sur chaque photo)

---

### ÉTAPE 1 : Filtre Camera Raw (le plus important)

C'est l'outil le plus puissant, tout-en-un. Il permet de régler luminosité, couleurs, netteté en un seul endroit.

1. Clique sur le calque copie (pas "Arrière-plan", mais "Arrière-plan copie")
2. Va dans le menu **Filtre** → **Filtre Camera Raw**
3. Un gros éditeur s'ouvre avec ta photo et des curseurs à droite

**Les curseurs importants (panneau de droite) :**

- **Exposition** : luminosité globale. Si ta photo est trop sombre, augmente (vers la droite). Si trop claire, diminue. Chaque photo a sa valeur spécifique (voir plus bas)

- **Contraste** : écart entre zones claires et sombres. Mets entre `+5` et `+15` pour donner du pep's

- **Hautes lumières** : contrôle les zones les plus claires. Baisse de `-10` à `-20` pour récupérer du détail dans les reflets de laque

- **Ombres** : contrôle les zones sombres. Augmente de `+10` à `+30` si des détails sont perdus dans le noir (surtout Cacao et Vanille)

- **Blancs** : le point le plus blanc. Augmente de `+5` à `+15` pour que les reflets brillent

- **Noirs** : le point le plus noir. Baisse de `-5` pour des noirs plus profonds

- **Texture** : renforce les micro-détails (grains, surface). Mets entre `+10` et `+25`. C'est ce qui fait ressortir la texture du trompe-l'œil

- **Clarté** (Clarity) : renforce le contraste des contours et la "présence". Mets entre `+12` et `+20`

- **Dehaze** (Suppression du voile) : enlève un aspect brumeux. Mets entre `+5` et `+10` si la photo semble "voilée"

- **Vibrance** : booste les couleurs subtiles intelligemment. Mets entre `+8` et `+15`

- **Saturation** : booste TOUTES les couleurs (attention, moins subtil). Mets entre `+5` et `+10` max

4. Quand tu es content du résultat, clique **OK**

---

### ÉTAPE 2 : Courbes (contraste avancé)

1. En bas du panneau **Calques**, clique sur l'icône en forme de **cercle coupé en deux** (noir et blanc). C'est le bouton "Créer un calque de réglage"
2. Choisis **Courbes**
3. Un graphique apparaît : une ligne diagonale du bas-gauche au haut-droite

**Comment lire le graphique :**
- Bas-gauche = les ombres (zones sombres)
- Milieu = les tons moyens
- Haut-droite = les hautes lumières (zones claires)
- Tirer un point vers le HAUT = éclaircir
- Tirer un point vers le BAS = assombrir

**Faire un "S" doux :**

1. Clique sur la ligne au **1er quart** (en bas à gauche, zone des ombres)
2. Tire ce point **légèrement vers le bas** (5 à 10 unités). Ça assombrit les ombres = plus de profondeur
3. Clique sur la ligne au **3ème quart** (en haut à droite, zone des clairs)
4. Tire ce point **légèrement vers le haut** (5 à 10 unités). Ça éclaircit les clairs = plus de brillance
5. Ta ligne forme maintenant un S subtil. C'est ce qui donne le côté "pro" à l'image

**Important :** le S doit être très léger. Si l'image te semble trop contrastée, tire moins fort. Tu peux toujours modifier ce calque de réglage après.

---

### ÉTAPE 3 : Teinte/Saturation ciblée

1. Même bouton (cercle coupé en deux) → choisis **Teinte/Saturation**
2. Tu vois 3 curseurs :
   - **Teinte** : décale la couleur (on y touche rarement)
   - **Saturation** : intensité. On va l'utiliser de manière ciblée
   - **Luminosité** : éclaircit ou assombrit une couleur

3. **L'astuce pro : cibler une seule couleur.** En haut du panneau, il y a un menu déroulant qui dit **"Global"**. Clique dessus et choisis la couleur à modifier :
   - **Rouges** : pour la Fraise, Framboise
   - **Jaunes** : pour le Citron, la Pêche, les dorures
   - **Verts** : pour les feuilles/tiges
   - **Magentas** : pour les violets (Passion)

4. Mets la Saturation de cette couleur entre `+8` et `+15`

---

### ÉTAPE 4 : Masque flou (netteté)

1. **IMPORTANT** : clique d'abord sur le calque de ta photo (pas sur un calque de réglage). C'est le calque "Arrière-plan copie" avec la vignette de ta photo
2. Va dans **Filtre** → **Renforcement** → **Masque flou**
3. Trois curseurs :
   - **Gain** (Amount) : la force. Mets entre `80%` et `100%`
   - **Rayon** (Radius) : la zone. Mets entre `1.0` et `1.5 px`
   - **Seuil** (Threshold) : protection du bruit. Mets `2`
4. Tu vois l'aperçu en temps réel sur ta photo. Clique **OK**

---

### ÉTAPE 5 : Exporter

1. **Fichier** → **Exporter** → **Exporter sous**
2. Format : **PNG**
3. Vérifie que la taille fait au moins **1500 px** de large
4. Clique **Exporter**
5. Choisis où sauvegarder et donne un nom (ex: `fraise-retouche.png`)

---

---

## RETOUCHES SPÉCIFIQUES — PRODUIT PAR PRODUIT

Pour chaque produit, fais d'abord les étapes 1-4 ci-dessus avec les valeurs indiquées, puis les retouches bonus si tu te sens à l'aise.

---

### 1. LE POULPE (poulpe-gold.png)

**Verdict : ta meilleure photo. Le doré est magnifique. Juste un polish.**

**Étape 1 — Camera Raw :**
1. **Filtre** → **Filtre Camera Raw**
2. Réglages :
   - Exposition : `0` (c'est déjà bien)
   - Contraste : `+8`
   - Hautes lumières : `-10`
   - Ombres : `+5`
   - Texture : `+10`
   - Clarté : `+15`
   - Vibrance : `+8`
3. Clique **OK**

**Étape 2 — Courbes :**
1. Cercle coupé en deux → **Courbes**
2. Clique au milieu de la ligne (tons moyens) → tire vers le haut de `+8`
3. Ça fait briller l'or sans toucher aux ombres

**Étape 3 — Teinte/Saturation :**
1. Cercle coupé en deux → **Teinte/Saturation**
2. Menu déroulant → **Jaunes**
3. Saturation : `+10` (boost les dorures)

**Étape 4 — Masque flou :**
1. Clique sur le calque photo
2. **Filtre** → **Renforcement** → **Masque flou**
3. Gain `80%`, Rayon `1.2 px`, Seuil `2` → **OK**

---

### 2. LA FRAISE (fraise.png)

**Verdict : le rouge manque de punch. Il faut un rouge plus profond, plus gourmand.**

**Étape 1 — Camera Raw :**
1. **Filtre** → **Filtre Camera Raw**
2. Réglages :
   - Exposition : `0`
   - Contraste : `+10`
   - Hautes lumières : `-15` (récupère le détail dans les reflets de la laque rouge)
   - Ombres : `+8`
   - Texture : `+12`
   - Clarté : `+12`
   - Dehaze : `+5`
   - Vibrance : `+10`
3. Clique **OK**

**Étape 2 — Courbes :**
1. Cercle coupé en deux → **Courbes**
2. Remonte les hautes lumières (point au 3ème quart) de `+8` pour faire briller la laque

**Étape 3 — Teinte/Saturation :**
1. Cercle coupé en deux → **Teinte/Saturation**
2. Menu déroulant → **Rouges**
3. Saturation : `+12`
4. Luminosité : `-5` (rouge plus profond, moins "flashy", plus gourmand)

**Étape 4 — Masque flou :**
- Gain `90%`, Rayon `1 px`, Seuil `2`

---

### 3. LA MANGUE (mangue.png)

**Verdict : couleurs sublimes (rose/orange/vert) mais légèrement froide. Il faut réchauffer.**
**⚠️ Technique aérographe — surface lisse, on ne cherche PAS à faire ressortir la texture.**

**Étape 1 — Camera Raw :**
1. **Filtre** → **Filtre Camera Raw**
2. Réglages :
   - Exposition : `+0.1`
   - Contraste : `+10`
   - Hautes lumières : `-10`
   - Ombres : `+8`
   - **Texture : `0` à `-5`** (négatif pour lisser l'aérographe)
   - Clarté : `+8`
   - **Température** : `+5` (c'est le curseur tout en haut, il tire vers le chaud/jaune)
   - Vibrance : `+15`
3. Clique **OK**

**Étape 2 — Courbes :**
1. Cercle coupé en deux → **Courbes**
2. S un peu plus prononcé : ombres `-8`, hautes lumières `+8`

**Étape 3 — Teinte/Saturation :**
1. Cercle coupé en deux → **Teinte/Saturation**
2. Menu déroulant → **Verts** → Saturation `+10` (booste la feuille/tige)
3. Reviens sur **Global** (en haut du panneau) → Saturation `+5`

**Étape 4 — Masque flou :**
- **⚠️ NE PAS APPLIQUER** pour la Mangue (aérographe — ferait ressortir les traces de pinceau)

---

### 4. LA FRAMBOISE (framboise.png)

**Verdict : la texture des drupéoles (petits grains) est l'atout n°1. Il faut la faire ressortir à fond.**

**Étape 1 — Camera Raw :**
1. **Filtre** → **Filtre Camera Raw**
2. Réglages :
   - Exposition : `0`
   - Contraste : `+8`
   - Hautes lumières : `-10`
   - Ombres : `+5`
   - **Texture : `+20`** (plus élevé que les autres — la texture fait tout sur une framboise)
   - Clarté : `+15`
   - Vibrance : `+10`
3. Clique **OK**

**Étape 2 — Courbes :**
1. Cercle coupé en deux → **Courbes**
2. Remonte les tons moyens-clairs (point entre le milieu et le 3ème quart) de `+6`

**Étape 3 — Teinte/Saturation :**
1. Cercle coupé en deux → **Teinte/Saturation**
2. Menu déroulant → **Rouges** → Saturation `+8`

**Étape 4 — Masque flou :**
- Gain `100%`, Rayon `0.8 px`, Seuil `1` (plus agressif — les petits grains vont ressortir)

---

### 5. LA PÊCHE (peche.png)

**Verdict : le dessert paraît plat, il manque de volume. Le dégradé jaune-rouge a besoin de plus de dimension.**
**⚠️ Technique aérographe — surface veloutée et lisse. Il faut PRÉSERVER le flouté, pas le détruire. Si tu vois des "fils de pinceau", c'est que tu as trop poussé la texture.**

**Étape 1 — Camera Raw :**
1. **Filtre** → **Filtre Camera Raw**
2. Réglages :
   - Exposition : `+0.1`
   - Contraste : `+12`
   - Hautes lumières : `-15`
   - Ombres : `+10`
   - **Texture : `-10` à `-15`** (NÉGATIF — ça lisse l'aérographe)
   - **Clarté : `+5`** (léger, on garde le velouté)
   - Vibrance : `+10`
3. **Section Détail** (descends dans le panneau) :
   - Réduction du bruit : `+15` (lisse encore les micro-grains)
   - Netteté : `20` max
4. Clique **OK**

**Étape 2 — Courbes :**
1. Cercle coupé en deux → **Courbes**
2. S plus prononcé : ombres `-10`, hautes lumières `+12` (ça crée du volume)

**Étape 3 — Teinte/Saturation :**
1. Cercle coupé en deux → **Teinte/Saturation**
2. Menu déroulant → **Jaunes** → Saturation `+8`
3. Menu déroulant → **Rouges** → Saturation `+5` (booste la joue rouge de la pêche)

**Étape 4 — Masque flou :**
- **⚠️ NE PAS APPLIQUER** pour la Pêche (aérographe — ferait ressortir les fils de pinceau)

**Bonus — Dodge & Burn (créer du volume) :**
C'est optionnel mais ça change tout. Ça éclaire le dessus et assombrit le dessous pour un effet 3D.
1. Tape **O** au clavier → ça active l'outil **Densité -** (Dodge = éclaircir)
2. En haut de l'écran, règle : **Gamme : Tons clairs**, **Exposition : 10%**
3. Peins doucement avec ta souris sur le **sommet** du dessert (là où la lumière tombe)
4. Pour assombrir : maintiens la touche **Alt** (ça passe en mode Burn = assombrir)
5. Peins sur la **base** du dessert
6. Le résultat : le dessert a l'air beaucoup plus tridimensionnel

---

### 6. LE CITRON (citron.png)

**Verdict : le jaune n'est pas assez pur, un peu verdâtre. Il faut un jaune lumineux, "zesté".**
**⚠️ Technique aérographe — surface lisse et veloutée. PRÉSERVER le flouté, pas révéler les traces de pinceau.**

**Étape 1 — Camera Raw :**
1. **Filtre** → **Filtre Camera Raw**
2. Réglages :
   - Exposition : `0`
   - Contraste : `+10`
   - Hautes lumières : `-10`
   - Ombres : `+5`
   - **Texture : `-10` à `-15`** (NÉGATIF — ça lisse l'aérographe)
   - **Clarté : `+5`** (léger, on garde le velouté)
   - Température : `+3` (un poil plus chaud)
   - Vibrance : `+12`
3. **Section Détail** (descends dans le panneau) :
   - Réduction du bruit : `+15`
   - Netteté : `20` max
4. Clique **OK**

**Étape 2 — Courbes :**
1. Cercle coupé en deux → **Courbes**
2. **Astuce pour le jaune :** en haut du panneau Propriétés, tu vois un menu déroulant qui dit **RVB**. Clique dessus et choisis **Bleu**
3. Tu vois maintenant la courbe du canal bleu uniquement
4. Clique sur la courbe dans la zone des ombres (bas-gauche) et tire **vers le bas** de `-5`
5. Ça retire du bleu dans les ombres = ça réchauffe et rend le jaune beaucoup plus pur
6. Reviens sur **RVB** pour la suite

**Étape 3 — Teinte/Saturation :**
1. Cercle coupé en deux → **Teinte/Saturation**
2. Menu déroulant → **Jaunes**
3. Saturation : `+15`
4. Teinte : `-3` (tire le jaune très légèrement vers l'orange = plus "citron mûr")

**Étape 4 — Masque flou :**
- **⚠️ NE PAS APPLIQUER** pour le Citron (aérographe — ferait ressortir les fils de pinceau)

---

### 7. LA PASSION (passion.png)

**Verdict : le violet + éclats d'or est TRÈS Atelier Mirage. Mais trop sombre et l'or ne brille pas assez.**

**Étape 1 — Camera Raw :**
1. **Filtre** → **Filtre Camera Raw**
2. Réglages :
   - **Exposition : `+0.3`** (c'est la photo qui a le plus besoin d'être éclaircie)
   - Contraste : `+10`
   - Hautes lumières : `-5`
   - **Ombres : `+15`** (débouche les zones sombres)
   - Blancs : `+10`
   - Texture : `+12`
   - Clarté : `+15`
   - Dehaze : `+8`
   - Vibrance : `+12`
3. Clique **OK**

**Étape 2 — Courbes :**
1. Cercle coupé en deux → **Courbes**
2. Remonte les hautes lumières de `+15` (la photo en a besoin)
3. Remonte légèrement les tons moyens de `+5`

**Étape 3 — Teinte/Saturation :**
1. Cercle coupé en deux → **Teinte/Saturation**
2. Menu déroulant → **Jaunes** → Saturation `+12` (boost les éclats d'or)
3. Menu déroulant → **Magentas** → Saturation `+8` (renforce le violet)

**Étape 4 — Masque flou :**
- Gain `85%`, Rayon `1 px`, Seuil `2`

**Bonus — Faire briller l'or :**
1. Va dans **Sélection** → **Plage de couleurs**
2. Un panneau s'ouvre avec une pipette. Clique avec la pipette **directement sur un éclat doré** dans ta photo
3. En bas, règle la **Tolérance** à `40`
4. Clique **OK** → les éclats dorés sont sélectionnés (fourmis qui marchent)
5. Maintenant, crée un calque de réglage **Courbes** (cercle coupé en deux → Courbes)
6. Ce calque de Courbes ne s'appliquera QU'aux éclats d'or (grâce à la sélection)
7. Remonte les hautes lumières de `+20` → l'or brille maintenant

---

### 8. LE CACAO (cacao.png)

**⚠️ PHOTO LA PLUS PROBLÉMATIQUE. Tout est sombre : dessert sombre + fond sombre. Il faut BEAUCOUP éclaircir.**
**⚠️ Surface laque chocolat lisse — pas de texture élevée.**

**Étape 1 — Camera Raw :**
1. **Filtre** → **Filtre Camera Raw**
2. Réglages (plus agressifs que les autres) :
   - **Exposition : `+0.5`** (grosse correction)
   - Contraste : `+10`
   - Hautes lumières : `0`
   - **Ombres : `+30`** (débouche toutes les zones noires)
   - **Blancs : `+15`**
   - Noirs : `0` (on ne veut pas les assombrir davantage)
   - **Texture : `0` à `+5`** (laque lisse — pas de texture)
   - **Clarté : `+15`**
   - Dehaze : `+10`
   - **Vibrance : `+15`**
3. Clique **OK**

**Étape 2 — Courbes :**
1. Cercle coupé en deux → **Courbes**
2. Courbe agressive :
   - Clique au milieu (tons moyens) → tire vers le haut de `+20`
   - Clique au 3ème quart (hautes lumières) → tire vers le haut de `+15`
3. L'image va paraître beaucoup plus lumineuse — c'est normal et nécessaire

**Étape 3 — Teinte/Saturation + Vibrance (deux calques séparés) :**
1. Cercle coupé en deux → **Teinte/Saturation** → **Global** → Saturation `+10`
2. Crée un deuxième calque : Cercle coupé en deux → **Vibrance** → Vibrance `+10` (les couleurs étaient étouffées par l'obscurité)

**Étape 4 — Masque flou :**
- Gain `70%`, Rayon `1 px`, Seuil `3` (léger — on ne veut pas casser la laque)

**Bonus — Faire briller la laque chocolat :**
1. Tape **O** au clavier → outil Densité - (Dodge)
2. En haut : **Gamme : Tons clairs**, **Exposition : 12%**
3. Peins doucement sur chaque **reflet de laque** sur la surface du chocolat (les petits points de lumière brillante)
4. Ça crée des points de brillance = aspect "chocolat glacé" luxueux
5. N'en fais pas trop — 5 à 10 passages légers sur chaque reflet

---

### 9. L'ARACHIDE (cacahuete.png)

**Verdict : la photo la plus "plate", manque de volume. Le travail sera surtout dans le Dodge & Burn pour sculpter du relief.**
**⚠️ Technique glaçage — surface lisse et brillante. Pas de texture agressive.**

**Étape 1 — Camera Raw :**
1. **Filtre** → **Filtre Camera Raw**
2. Réglages :
   - Exposition : `+0.1`
   - Contraste : `+12`
   - Hautes lumières : `-10`
   - Ombres : `+10`
   - **Texture : `0` à `+5`** (glaçage lisse — pas de texture)
   - **Clarté : `+10`** (garde un peu de présence sans casser le glaçage)
   - Température : `+3` (un poil plus chaud = plus gourmand)
   - Vibrance : `+10`
3. Clique **OK**

**Étape 2 — Courbes :**
1. Cercle coupé en deux → **Courbes**
2. S modéré : ombres `-8`, hautes lumières `+8`

**Étape 3 — Teinte/Saturation :**
1. Cercle coupé en deux → **Teinte/Saturation**
2. Menu déroulant → **Jaunes** → Saturation `+8` (rend le caramel/pralin plus riche)

**Étape 4 — Masque flou :**
- Gain `70%`, Rayon `1 px`, Seuil `3` (léger — préserve le glaçage brillant)

**Bonus — Dodge & Burn (indispensable ici, c'est ce qui va faire la différence) :**
1. Tape **O** → outil Densité - (Dodge)
2. **Gamme : Tons clairs**, **Exposition : 10%**
3. Peins sur le **sommet** et les **arêtes** du dessert → ça les fait ressortir
4. Maintiens **Alt** (passe en Burn/assombrir)
5. Peins sur la **base** et les **creux** → ça creuse les ombres
6. Résultat : le dessert a enfin du relief, il "sort" de la photo

---

### 10. LA VANILLE (vanille.png)

**⚠️ DEUXIÈME PHOTO LA PLUS PROBLÉMATIQUE. Comme le Cacao : trop sombre, manque de contraste. La vanille devrait évoquer la douceur — ici c'est trop austère.**
**⚠️ Technique glaçage noir + brillance peinte au pinceau. Surface lisse au global, mais les zones brillantes sont volontairement peintes — il faut les VALORISER sans révéler les coups de pinceau.**

**Étape 1 — Camera Raw :**
1. **Filtre** → **Filtre Camera Raw**
2. Réglages :
   - **Exposition : `+0.4`** (grosse correction, comme le Cacao)
   - Contraste : `+10`
   - Hautes lumières : `0`
   - **Ombres : `+25`** (débouche le glaçage noir)
   - **Blancs : `+15`** (boost les zones de brillance peintes)
   - **Texture : `0`** (glaçage lisse — pas de texture)
   - **Clarté : `+8`** (léger — préserve le glaçage)
   - **Température : `+5`** (ramène la chaleur "vanille", très important)
   - Vibrance : `+12`
3. **Section Détail** :
   - Réduction du bruit : `+10` (lisse les micro-imperfections)
4. Clique **OK**

**Étape 2 — Courbes :**
1. Cercle coupé en deux → **Courbes**
2. Remonte les tons moyens de `+15`
3. Remonte les ombres de `+10` (débouche)

**Étape 3 — Teinte/Saturation :**
1. Cercle coupé en deux → **Teinte/Saturation**
2. Menu déroulant → **Jaunes** → Saturation `+10` (ramène la couleur vanille)
3. Reviens sur **Global** (en haut du panneau) → Saturation `+5`

**Étape 4 — Masque flou :**
- **⚠️ NE PAS APPLIQUER** pour la Vanille (révélerait les coups de pinceau de la brillance peinte)

**Bonus — Renforcer la brillance peinte (sans révéler les coups de pinceau) :**
1. Tape **O** au clavier → outil Densité - (Dodge)
2. **Gamme : Tons clairs**, **Exposition : 8%** (très léger)
3. Peins **uniquement sur les zones de brillance déjà peintes** par l'artiste — pas ailleurs
4. Fais 2 à 3 passages légers maximum, pour intensifier la brillance existante sans en créer de nouvelles
5. Le but : que les highlights peints au pinceau ressortent davantage tout en restant fidèles à l'œuvre

---

---

## VÉRIFICATION FINALE

Une fois les 10 photos retouchées :

1. **Ouvre-les toutes** : Fichier → Ouvrir → sélectionne les 10 fichiers d'un coup
2. Va dans **Fenêtre** → **Réorganiser** → **Tout afficher**
3. Compare visuellement :
   - Est-ce que la **luminosité** est cohérente ? Le Cacao et la Vanille ne doivent pas rester plus sombres que les autres
   - Est-ce que la **température** est cohérente ? Pas de photo trop froide ou trop chaude par rapport aux autres
4. Si une photo détonne, rouvre-la et ajuste ses calques de réglage (double-clique dessus pour les modifier)

---

## ORDRE DE PRIORITÉ

Si tu manques de temps, retouche dans cet ordre :

1. **Le Cacao** et **La Vanille** — les plus urgentes (trop sombres)
2. **La Passion** — sous-exposée, l'or ne brille pas
3. **L'Arachide** — trop plate, pas de volume
4. **La Fraise** et **La Framboise** — manquent de punch rouge
5. **Le Citron** et **La Pêche** — corrections mineures
6. **La Mangue** — légèrement froide
7. **Le Poulpe** — déjà très bien, juste un polish

---

*Guide créé pour Atelier Mirage — Karim Farid*
