# UI & design conventions

Conventions visuelles du portfolio. But : rendu soigné, cohérent, **non-générique**.

## Tokens (Tailwind v4)

Toujours passer par les utilities générées depuis `@theme` (`app/globals.css`), **jamais de hex en dur** :

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

## Motion

- Lib : `motion` (`motion/react`). Composants animés = **client-only** (`'use client'`), isolés dans de petits wrappers (le layout reste Server Component).
- Raffiné : durées **150–300 ms**, `ease-out`, reveals en léger stagger.
- **Toujours respecter `prefers-reduced-motion`** (`useReducedMotion`) → version statique (ex : le fil rouge s'affiche complet, `pathLength: 1`).
- Une seule signature forte (le **fil rouge**). Le reste reste sobre.

## Garde-fous anti-générique (important)

À **éviter** (clichés « portfolio IA ») : dark indigo/violet + gradient blob, particules sur canvas,
glassmorphism partout, barres de compétences en %, hero « Hi, I'm X, passionate dev », curseur custom géant.

Privilégier : typo choisie, **une** animation signature maîtrisée, case studies honnêtes et spécifiques,
ton éditorial cohérent.
