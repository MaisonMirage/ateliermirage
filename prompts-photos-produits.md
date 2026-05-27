# Atelier Mirage — Prompts photos produits (Pomelli)

Objectif : générer **48 photos** cohérentes, niveau Yann Couvreur — **16 produits × 3 prises**.
Version 3 — passage à 3 photos par produit pour alimenter la galerie empilée des fiches.

---

## 1. Ce que fait YC (et qu'on reproduit)

En décortiquant les vraies photos YC, les principes qui reviennent :

1. **Plusieurs pièces sur la photo de couverture.** Jamais une pièce isolée pour le plan principal. Une **grande pièce XL** ancre la composition, entourée de **3 à 5 pièces individuelles** plus petites, disposées avec intention. Ça crée l'abondance et montre les formats.
2. **Vue en plongée haute** sur la composition (~60°), façon flatlay maîtrisé — on voit l'ensemble tout en gardant le volume.
3. **Une pièce tranchée.** Toujours une pièce coupée qui révèle le cœur crémeux. Pour du trompe-l'œil c'est ESSENTIEL : ça dévoile l'illusion, ça prouve que c'est une pâtisserie.
4. **Fonds tonals par famille.** Pas de fond unique : rose poudré pour les fruits rouges, beige pour les fruits secs, brun chocolat profond pour le chocolat. Le fond complète le produit — une famille, un ton.
5. **Pièces non identiques.** Finition main au glaçage et à l'aérographe : subtiles variations de teinte et de reflets entre pièces. Jamais des clones parfaits. L'IA a tendance à dupliquer ; le prompt l'en empêche.

---

## 2. Les 3 prises par produit

Chaque fiche produit empile **3 photos** dans sa galerie. On génère donc 3 prises par produit, toutes sur **le même fond tonal** (galerie cohérente) :

- **Photo 1 — Composition.** Le plan multi-pièces en plongée 60°, avec une pièce tranchée. C'est la photo de couverture — elle sert aussi de visuel sur la grille Collection.
- **Photo 2 — Pièce seule.** Un seul entremet, gros plan trois-quarts, pour montrer le galbe et la finition.
- **Photo 3 — Coupe.** Macro sur une pièce tranchée net, couches internes révélées. La preuve du trompe-l'œil.

### Les 3 prompts-socles

On change toujours 3 variables : `[PIÈCE]`, `[CŒUR]`, `[FOND]`. Le reste reste identique mot pour mot.

**Socle 1 — Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil [PIÈCE] : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître [CŒUR], révélant la nature pâtissière de l'illusion. Fond de studio sans couture [FOND]. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Socle 2 — Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil [PIÈCE], posé seul et bien centré, occupant largement le cadre, mettant en valeur le galbe, la finition faite main et les reflets du glaçage. Fond de studio sans couture [FOND]. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Socle 3 — Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil [PIÈCE], nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : [CŒUR DÉTAILLÉ]. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture [FOND]. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

---

## 3. Les 48 prompts prêts à copier

### 1 — Le Poulpe (signature)

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil en forme de petit poulpe au glaçage miroir doré chatoyant aux reflets ambrés, tentacules ondulants modelés avec précision : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur de ganache montée vanille Bourbon, révélant la nature pâtissière de l'illusion. Fond de studio sans couture brun chocolat profond et dramatique. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil en forme de petit poulpe au glaçage miroir doré chatoyant aux reflets ambrés, tentacules ondulants modelés avec précision, posé seul et bien centré, occupant largement le cadre, mettant en valeur le galbe, la finition faite main et les reflets du glaçage. Fond de studio sans couture brun chocolat profond et dramatique. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de petit poulpe au glaçage miroir doré, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : ganache montée vanille Bourbon, croustillant praliné noisette à la fleur de sel et un insert « sang bleu » d'un bleu profond, crémeux coco-spiruline. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture brun chocolat profond et dramatique. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

### 2 — La Fraise

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil en forme de fraise parfaite au glaçage miroir rouge écarlate intense, fines graines en relief et collerette de feuilles vertes en pâte d'amande : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur de ganache montée vanille et de confit de fraise, révélant la nature pâtissière de l'illusion. Fond de studio sans couture rose poudré doux. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil en forme de fraise parfaite au glaçage miroir rouge écarlate intense, fines graines en relief et collerette de feuilles vertes en pâte d'amande, posé seul et bien centré, occupant largement le cadre, mettant en valeur le galbe, la finition faite main et les reflets du glaçage. Fond de studio sans couture rose poudré doux. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de fraise au glaçage miroir rouge, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : mousse vanille de Madagascar, confit de fraise gariguette, ganache montée vanille et biscuit amande moelleux. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture rose poudré doux. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

### 3 — La Mangue

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil en forme de mangue à la finition velours floqué mat dégradée du jaune doré à l'orange et au rouge carmin : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur coulant de mangue Alphonso, révélant la nature pâtissière de l'illusion. Fond de studio sans couture sable chaud abricoté. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil en forme de mangue à la finition velours floqué mat dégradée du jaune doré à l'orange et au rouge carmin, posé seul et bien centré, occupant largement le cadre, mettant en valeur le galbe, la finition faite main et le velours mat. Fond de studio sans couture sable chaud abricoté. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de mangue au velours floqué, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : mousse légère au fruit de la passion, cœur coulant de mangue Alphonso et croustillant coco. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture sable chaud abricoté. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

### 4 — La Framboise

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil en forme de framboise, surface en alvéoles arrondies régulières et finition velours mat rouge framboise profond : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur de crémeux framboise-litchi, révélant la nature pâtissière de l'illusion. Fond de studio sans couture rose poudré profond. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil en forme de framboise, surface en alvéoles arrondies régulières et finition velours mat rouge framboise profond, posé seul et bien centré, occupant largement le cadre, mettant en valeur le galbe, le relief des alvéoles et la finition faite main. Fond de studio sans couture rose poudré profond. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de framboise au velours mat, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : mousse vanille de Madagascar, crémeux framboise-litchi et insert de framboise intense. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture rose poudré profond. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

### 5 — La Pêche

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil en forme de pêche, finition velours floqué duveteux dégradée du jaune à l'orange et au rouge, léger sillon central : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur de mousse pêche-verveine, révélant la nature pâtissière de l'illusion. Fond de studio sans couture pêche poudré beige rosé. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil en forme de pêche, finition velours floqué duveteux dégradée du jaune à l'orange et au rouge, léger sillon central, posé seul et bien centré, occupant largement le cadre, mettant en valeur le galbe, le duvet velouté et la finition faite main. Fond de studio sans couture pêche poudré beige rosé. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de pêche au velours duveteux, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : mousse pêche-verveine, confit de pêche blanche et biscuit financier noisette. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture pêche poudré beige rosé. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

### 6 — Le Citron

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil en forme de citron, glaçage jaune vif texturé reproduisant le grain de l'écorce d'agrume : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur de crémeux citron givré, révélant la nature pâtissière de l'illusion. Fond de studio sans couture beige chaud lumineux. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil en forme de citron, glaçage jaune vif texturé reproduisant le grain de l'écorce d'agrume, posé seul et bien centré, occupant largement le cadre, mettant en valeur le galbe, le grain de l'écorce et la finition faite main. Fond de studio sans couture beige chaud lumineux. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de citron, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : meringue italienne, crémeux citron de Menton et confit citron-basilic. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture beige chaud lumineux. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

### 7 — La Passion

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil en forme de fruit de la passion, glaçage miroir bombé violet aubergine profond aux reflets pourpres, fines mouchetures et feuilles d'or : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur de crémeux exotique au fruit de la passion, révélant la nature pâtissière de l'illusion. Fond de studio sans couture taupe chaud profond. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil en forme de fruit de la passion, glaçage miroir bombé violet aubergine profond aux reflets pourpres, fines mouchetures et feuilles d'or, posé seul et bien centré, occupant largement le cadre, mettant en valeur le galbe, la brillance miroir et les feuilles d'or. Fond de studio sans couture taupe chaud profond. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de fruit de la passion au glaçage miroir violet, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : insert passion-mangue, crémeux chocolat blanc-passion et biscuit moelleux. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture taupe chaud profond. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

### 8 — La Pistache

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil de forme galet organique, glaçage vert pistache doux marbré de touches orangées, brillance satinée : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur de mousse pistache et un insert framboise, révélant la nature pâtissière de l'illusion. Fond de studio sans couture beige lin naturel. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil de forme galet organique, glaçage vert pistache doux marbré de touches orangées, brillance satinée, posé seul et bien centré, occupant largement le cadre, mettant en valeur le galbe, le marbré et la finition faite main. Fond de studio sans couture beige lin naturel. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil de forme galet, glaçage vert pistache satiné, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : mousse pistache de Sicile, insert framboise et coulis de framboise. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture beige lin naturel. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

### 9 — Le Cacao

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil en forme de cabosse de cacao, surface texturée brun chocolat profond reproduisant le relief nervuré d'une cabosse, reflets satinés : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur de ganache chocolat noir grand cru, révélant la nature pâtissière de l'illusion. Fond de studio sans couture brun chocolat profond. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil en forme de cabosse de cacao, surface texturée brun chocolat profond reproduisant le relief nervuré d'une cabosse, reflets satinés, posé seul et bien centré, occupant largement le cadre, mettant en valeur le galbe, le relief nervuré et la finition faite main. Fond de studio sans couture brun chocolat profond. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de cabosse de cacao, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : ganache chocolat noir Tanzanie 75%, croustillant praliné noisette et biscuit chocolat sans farine. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture brun chocolat profond. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

### 10 — L'Arachide

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil en forme de cacahuète décortiquée à la silhouette oblongue, glaçage miroir caramel ambré profond et brillant aux reflets praliné : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur de praliné cacahuète coulant, révélant la nature pâtissière de l'illusion. Fond de studio sans couture brun caramel sombre. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil en forme de cacahuète décortiquée à la silhouette oblongue, glaçage miroir caramel ambré profond et brillant aux reflets praliné, posé seul et bien centré, occupant largement le cadre, mettant en valeur le galbe, la brillance miroir et la finition faite main. Fond de studio sans couture brun caramel sombre. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de cacahuète au glaçage miroir caramel, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : mousse chocolat au lait, caramel beurre salé et praliné cacahuète coulant. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture brun caramel sombre. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

### 11 — La Cacahuète

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil en forme de cacahuète en coque à la silhouette bilobée, glaçage caramel blond clair et brillant aux reflets dorés : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur de caramel blond coulant, révélant la nature pâtissière de l'illusion. Fond de studio sans couture beige caramel chaud. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil en forme de cacahuète en coque à la silhouette bilobée, glaçage caramel blond clair et brillant aux reflets dorés, posé seul et bien centré, occupant largement le cadre, mettant en valeur le galbe bilobé et la finition faite main. Fond de studio sans couture beige caramel chaud. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de cacahuète en coque, glaçage caramel blond, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : mousse vanille bourbon, praliné cacahuète croustillant et caramel blond coulant. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture beige caramel chaud. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

### 12 — La Datte

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil en forme de datte Medjool, glaçage brun ambré profond et brillant, surface légèrement ridée caractéristique : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur de caramel à la fleur de sel, révélant la nature pâtissière de l'illusion. Fond de studio sans couture brun ambré sombre. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil en forme de datte Medjool, glaçage brun ambré profond et brillant, surface légèrement ridée caractéristique, posé seul et bien centré, occupant largement le cadre, mettant en valeur le galbe fuselé, les rides et la finition faite main. Fond de studio sans couture brun ambré sombre. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de datte Medjool, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : mousse datte Medjool, insert caramel fleur de sel et praliné amande croustillant. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture brun ambré sombre. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

### 13 — La Vanille

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil de forme allongée et élégante évoquant une gousse de vanille, glaçage noir profond brillant moucheté de grains de vanille de Madagascar : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur de crémeux vanille de Madagascar, révélant la nature pâtissière de l'illusion. Fond de studio sans couture taupe profond. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil de forme allongée et élégante évoquant une gousse de vanille, glaçage noir profond brillant moucheté de grains de vanille de Madagascar, posé seul et bien centré, occupant largement le cadre, mettant en valeur le galbe allongé, les mouchetures et la finition faite main. Fond de studio sans couture taupe profond. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de gousse de vanille, glaçage noir moucheté, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : crème vanille bourbon de Madagascar, caramel vanille soyeux et biscuit moelleux. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture taupe profond. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

### 14 — Le Nigiri (signature)

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil en forme de sushi nigiri, base de « riz » reproduite par un assemblage de petites perles de mousse blanche nacrée, surmontée d'une tranche de « saumon » au glaçage velouté orange corail strié de fines marbrures blanches imitant le persillé : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur de mousse coco onctueuse et un insert mangue, révélant la nature pâtissière de l'illusion. Fond de studio sans couture taupe sombre et dramatique. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil en forme de sushi nigiri, base de « riz » reproduite par un assemblage de petites perles de mousse blanche nacrée, surmontée d'une tranche de « saumon » au glaçage velouté orange corail strié de fines marbrures blanches, posé seul et bien centré, occupant largement le cadre, mettant en valeur les perles de riz, le velouté du saumon et la finition faite main. Fond de studio sans couture taupe sombre et dramatique. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de sushi nigiri, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : mousse coco onctueuse et insert de mangue. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture taupe sombre et dramatique. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

### 15 — La Boule de Cristal (signature)

**Photo 1 · Composition (les 7 boules)**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de sept entremets de haute pâtisserie en trompe-l'œil en forme de sphère parfaite et lisse, glaçage orange ambré translucide ultra-brillant effet verre poli, laissant transparaître une douce lueur intérieure dorée. Chaque sphère renferme des étoiles rouges à cinq branches en pâte d'amande, suspendues à l'intérieur et nettement visibles par transparence ; le nombre d'étoiles diffère d'une boule à l'autre et forme le jeu complet : une boule à une étoile, une à deux, une à trois, une à quatre, une à cinq, une à six et une à sept étoiles. Les sept boules sont toutes strictement de même taille, sans pièce XL, posées chacune sur un fin socle de pâtisserie, regroupées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte et de lueur, dont une délicatement tranchée laissant apparaître un cœur de crémeux vanille et un insert de gelée d'orange translucide. Fond de studio sans couture brun-noir profond et dramatique. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule (une boule)**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil en forme de sphère parfaite et lisse, glaçage orange ambré translucide ultra-brillant effet verre poli, douce lueur intérieure dorée, renfermant exactement [N] étoile(s) rouge(s) à cinq branches en pâte d'amande suspendue(s) à l'intérieur et nettement visible(s) par transparence, posé seul sur un fin socle de pâtisserie, bien centré, occupant largement le cadre. Fond de studio sans couture brun-noir profond et dramatique. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de sphère au glaçage orange ambré translucide effet verre poli, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : crémeux vanille de Madagascar et insert de gelée d'orange translucide, avec une étoile rouge à cinq branches en pâte d'amande visible dans la coupe. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture brun-noir profond et dramatique. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et raffinée, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

> **Note IA — le compte d'étoiles.** Les modèles d'image comptent très mal. La Photo 1 (sept boules, 1 à 7 étoiles chacune) donnera presque sûrement des comptes faux. Plan fiable : génère **chaque boule séparément** avec la Photo 2 en fixant `[N]` (1, 2, 3…), puis assemble les sept en montage. Au-delà de 4 étoiles, vérifie le compte et retouche à la main. Pour la galerie de la fiche, la Photo 2 peut se faire avec `[N]` = une seule étoile (le plus fiable).

### 16 — Le Baklava

**Photo 1 · Composition**
> Photographie culinaire de studio, vue en plongée haute à 60 degrés. Composition de plusieurs entremets de haute pâtisserie en trompe-l'œil en forme de baklava en dôme, fines couches de pâte phyllo dorée et croustillante nettement visibles et empilées sur les flancs, dessus joliment glacé au miel ambré et brillant, généreusement parsemé d'éclats de pistache concassée vert tendre : une grande pièce format XL qui ancre la composition, entourée de 4 pièces individuelles plus petites, disposées avec élégance et bien espacées, chaque pièce présentant de subtiles variations artisanales de teinte, de dégradé et de reflets — finition faite main au glaçage et à l'aérographe, jamais deux pièces parfaitement identiques —, dont une délicatement tranchée laissant apparaître un cœur de mousse au miel et à la fleur d'oranger, révélant la nature pâtissière de l'illusion. Fond de studio sans couture brun miel profond et chaleureux. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/6.3, ensemble parfaitement net. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, composition aérée avec généreux espace négatif. Cadrage carré 1:1.

**Photo 2 · Pièce seule**
> Photographie culinaire de studio, gros plan en légère plongée, vue trois-quarts. Un seul entremet de haute pâtisserie en trompe-l'œil en forme de baklava en dôme, fines couches de pâte phyllo dorée et croustillante nettement visibles et empilées sur les flancs, dessus glacé au miel ambré et brillant, généreusement parsemé d'éclats de pistache concassée vert tendre, posé seul et bien centré, occupant largement le cadre, mettant en valeur les couches de phyllo et la finition faite main. Fond de studio sans couture brun miel profond et chaleureux. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères et allongées. Surface lisse et mate. Objectif 50mm, ouverture f/4, sujet parfaitement net, arrière-plan en léger fondu. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K, généreux espace négatif. Cadrage carré 1:1.

**Photo 3 · Coupe**
> Photographie culinaire de studio, gros plan macro. Un entremet de haute pâtisserie en trompe-l'œil en forme de baklava en dôme, nettement tranché en deux, la section faisant face à l'objectif et révélant proprement toutes les couches internes : mousse au miel et à la fleur d'oranger et insert fondant de praliné pistache. La pièce repose sur une feuille de papier cuisson légèrement froissé. Fond de studio sans couture brun miel profond et chaleureux. Lumière naturelle douce et diffuse type lumière de fenêtre, ombres légères. Objectif 50mm macro, ouverture f/5.6, couches du dessert parfaitement nettes. Colorimétrie chaude et riche, ambiance haute pâtisserie française, qualité magazine gastronomique. Photo ultra-réaliste, rendu 8K. Cadrage carré 1:1.

---

## 4. Table des fonds (la cohérence par famille)

| Famille | Pièces | Fond |
|---|---|---|
| Fruits rouges | Fraise, Framboise | rose poudré (doux / profond) |
| Fruits jaunes-orangés | Mangue, Pêche, Citron | sable chaud, pêche poudré, beige lumineux |
| Exotique | Passion | taupe chaud profond |
| Pistache | Pistache | beige lin naturel |
| Gourmands | Cacao, Arachide, Cacahuète, Datte, Baklava | bruns chocolat / caramel / miel sombres |
| Signature | Poulpe, Vanille, Nigiri, Boule de Cristal | fonds sombres dramatiques |

Les 3 photos d'un même produit gardent **le même fond** — c'est ce qui rend la galerie empilée cohérente.

---

## 5. Conseils Pomelli

**Cohérence.** Génère un produit complet (ses 3 photos) à la suite, dans la même session. Si Pomelli accepte une image de référence, valide d'abord la Photo 1, puis sers-t'en comme référence de style et de pièce pour les Photos 2 et 3 du même produit — la forme et la teinte resteront identiques.

**La pièce tranchée.** C'est le détail trompe-l'œil le plus fort. Si la coupe est sale ou peu appétissante, reformule : « section nette et propre, couches du dessert bien distinctes : mousse, insert, biscuit ».

**Multi-pièces (Photo 1).** Si la composition est trop chargée, réduis à « une grande pièce XL + 3 pièces individuelles ». Si trop vide, monte à 5-6. Garde toujours l'espace négatif.

**Pièces clonées.** Si Pomelli sort des pièces rigoureusement identiques (effet copier-coller), insiste : « pièces faites main, chacune unique, légères différences de teinte et de dégradé, finition aérographe naturelle et irrégulière ».

**Negative prompt** (si dispo) : « vrai fruit naturel, fruit cru non transformé, texte, watermark, mains, couverts, assiette à motifs, fond chargé, ombres dures, sur-saturation, pièces clonées strictement identiques, pièces alignées en grille ».

**Si une pièce ressort comme un vrai fruit** : renforce « entremet glaçé, dessert de chef, pâtisserie sculptée, glaçage de pâtisserie » et garde la coupe bien visible — c'est elle qui prouve que c'est un dessert.

---

## 6. Checklist + nommage des fichiers

- [ ] 48 images générées (16 produits × 3), carré 1:1
- [ ] Les 3 photos d'un produit sur le même fond tonal
- [ ] Photo 1 = composition multi-pièces · Photo 2 = pièce seule · Photo 3 = coupe
- [ ] Même lumière douce diffuse partout (vérifier les produits côte à côte)
- [ ] Preset colorimétrique uniforme appliqué si besoin
- [ ] Export WebP optimisé (< 150 ko chacune)

**Nommage** — la galerie de la fiche lit les images dans l'ordre. Pour `produit-citron.html` :

| Photo | Fichier | Usage |
|---|---|---|
| Photo 1 | `citron.webp` | couverture galerie + visuel grille Collection |
| Photo 2 | `citron-2.webp` | 2ᵉ image empilée |
| Photo 3 | `citron-3.webp` | 3ᵉ image empilée |

Même logique pour les 16 : `fraise.webp` / `fraise-2.webp` / `fraise-3.webp`, etc. Dépose le tout dans `img/` ; ensuite je branche la galerie empilée façon YC sur chaque fiche.
