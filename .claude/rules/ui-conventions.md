# UI & design conventions

Conventions visuelles du portfolio. But : rendu soigné, cohérent, **non-générique**.

## Tokens (Tailwind v4)

Toujours passer par les utilities générées depuis `@theme` (`styles/theme.css`), **jamais de hex en dur** :

| Rôle               | Utility                                       | Token     |
| ------------------ | --------------------------------------------- | --------- |
| Fond               | `bg-paper`                                    | `#f5f1ea` |
| Surface / cartes   | `bg-surface`                                  | `#fbf8f3` |
| Texte              | `text-ink`                                    | `#1a1a18` |
| Texte secondaire   | `text-ink-muted`                              | `#6f6a60` |
| Accent (fil rouge) | `text-accent` / `bg-accent` / `border-accent` | `#d85a30` |
| Bordures fines     | `border-hairline`                             | `#e5e0d8` |

- **Un seul accent** (terracotta). Pas de second accent sans raison forte.
- Fusion de classes conditionnelles : `cn()` (`@/lib/utils`).

## Typographie

- `font-display` (Fraunces) — titres, moments éditoriaux.
- `font-sans` (Geist) — texte / UI (défaut sur `<body>`).
- `font-mono` (Geist Mono) — labels techniques, chiffres, futur ⌘K.
- Hiérarchie de taille **affirmée** (vrai contraste titre/corps).

## Motion (recalibré 2026-07 — référence n°1 : template `portfolio-cinetique` du projet Claude Design ; secondaires : enricodeiana.design, koysor.me)

- Lib : `motion` (`motion/react`). Composants animés = **client-only** (`'use client'`), isolés dans de petits wrappers (le layout reste Server Component).
- **Motion ASSUMÉ, pas murmuré** : les reveals doivent se VOIR. Titres révélés **ligne par ligne
  sous masque** (translateY 110%→0, 700-900 ms, stagger 100-150 ms, `cubic-bezier(0.22,1,0.36,1)`) ;
  images en **wipe** (`clip-path`) + dé-zoom 1.12→1 (~900 ms) ; **parallax multi-vitesses** franc
  (±12-15 % sur les images, couches à vitesses différenciées). Micro-interactions (hover, liens) :
  150-300 ms.
- Scroll flotté : Lenis `lerp: 0.075`.
- **Toujours respecter `prefers-reduced-motion`** (`useReducedMotion`) → version statique complète.
  Patterns SSR-safe obligatoires : IO + classes, CSS vars par ref — le HTML serveur reste visible.
- Le **fil rouge** = la signature narrative qui relie le tout ; le reste du motion l'accompagne
  sans le parodier (pas de deuxième élément « spectaculaire » concurrent).

## Garde-fous anti-générique (important)

À **éviter** (clichés « portfolio IA ») : dark indigo/violet + gradient blob, particules sur canvas,
glassmorphism partout, barres de compétences en %, hero « Hi, I'm X, passionate dev ».
(Le curseur custom dot+ring du template portfolio-cinetique est ACCEPTÉ — revirement 2026-07-15.)

Privilégier : typo choisie, **une** animation signature maîtrisée, case studies honnêtes et spécifiques,
ton éditorial cohérent.
