# Portfolio — Thibault Deverge

Portfolio freelance **bilingue (FR/EN)**, Next.js 16 (App Router). Positionnement : dev Next.js
end-to-end. **Direction actuelle : expérience « animation-first »** — une one-page en scènes
chorégraphiées par le scroll, adaptée à l'identité papier/terracotta/fil rouge. **Référence n°1 :
le template `templates/portfolio-cinetique/` du projet Claude Design** (id
`25a8ead9-8c98-4830-8a48-0d4c313f910d`, lisible via DesignSync `get_file`) — la version finale
hyper-animée validée par Thibault, à suivre quasi à l'identique étape par étape. Références
secondaires : enricodeiana.design/about, koysor.me. Chantier sur la branche **`feat/scroll-scenes`** ;
roadmap : `~/.claude/plans/tout-m-interesse-j-aimerais-maitriser-goofy-curry.md`.

## Stack

- Next.js 16 (App Router, RSC, Turbopack) · React 19 · TypeScript strict
- Tailwind v4 (tokens dans `@theme`, `styles/theme.css`) · next-intl 4 (fr défaut + en)
- `motion` (`motion/react`) + Lenis (`lerp: 0.075`) — UN seul système d'animation, pas de GSAP
  (les références n'en ont pas besoin ; motion couvre scrub/pin/masques)
- Pas de MDX (retiré 2026-07-15, YAGNI — le réintroduire seulement si de vraies pages d'études
  de cas reviennent ; setup documenté dans le skill /new-case-study)
- Fonts via `next/font` : Fraunces normal+italic (display) / Geist (texte) / Geist Mono
- pnpm · ESLint + Prettier (`semi: false`, single quotes, 90 cols)

## Commandes

- `pnpm dev` — dev server (Turbopack)
- `NODE_ENV=production pnpm build` — ⚠️ voir Gotchas (toujours préfixer côté agent)
- `pnpm typecheck` · `pnpm lint` · `pnpm format`

## Architecture (volontairement MINIMALE après reset)

- `app/[locale]/` — `layout.tsx` (html, fonts, providers i18n + Lenis, Header), `page.tsx`
  (home = Hero seul pour l'instant, les scènes s'ajoutent une à une).
- `features/hero/` — la seule feature active : `Hero` (serveur) + îlots clients `BlueprintGrid`
  (grille + halo curseur), `DriftLine` (dérive scrubbed des lignes), `FilNode` (nœud terracotta,
  contrat `data-fil-node` du futur fil).
- `components/layout/` — `Header` (bandeau signature scroll-aware), `LocaleSwitcher`,
  `SmoothScrollProvider`. Pas de Footer (reconstruit plus tard).
- `styles/` — `fonts.ts`, `theme.css` (tokens `@theme` + base), `hero.css` (rideau, cascade,
  grille, nœud). `app/globals.css` = manifest d'`@import`. Un fichier CSS par domaine à venir.
- `i18n/` + `proxy.ts` + `messages/{fr,en}.json` — **namespace `Home` uniquement** pour l'instant
  (la copy des futures scènes vit dans les templates du projet Claude Design — table `I18N` de
  portfolio-cinetique / landing-fil-rouge — + git history de `main`).
- Anciens composants du pivot précédent : récupérables dans `~/.trash/scenes-reset/` et l'historique
  de `main` (Plate, chapitres, registre work…) — les réintroduire SEULEMENT au service d'une scène.

## L'expérience (état + roadmap E1→E5)

- **E1 (fait, en calibrage)** : rideau d'encre plein écran (signature Fraunces italique paper +
  point accent) → levée 0.95s `cubic-bezier(0.76,0,0.24,1)` après 1.05s → cascade du hero (lignes
  de titre sous masques 1.45s/1.6s, sous-titre 1.85s, grille 1.7s — CTA supprimés, le template
  n'en a pas) → au scroll, les deux lignes du titre dérivent en s'écartant (`DriftLine`,
  −90px/+120px sur 600px de scroll). Hero/rideau à REFAIRE sur le modèle portfolio-cinetique.
- **E2** : scène pinnée « Fondations » (pattern « diplômes » d'enrico : sticky ~300vh, les cartes
  2018 droit / 2019 Asie / 2022 École 42 traversent l'écran au scroll).
- **E3** : scène NP-Evolution (titre en convergence scrubbed, collage produit multi-vitesses,
  étude de cas MDX réactivée).
- **E4** : scène Elloha (galerie pinnée multi-vitesses, paragraphes dans les trous, stats
  10 000+/60+/2019 — visuels PUBLICS uniquement, NDA).
- **E5** : contact (CTA mailto, pas de formulaire avant la phase Resend) + **fil rouge** qui coud
  les scènes (SVG mesuré sur les `data-fil-node`, spline Catmull-Rom, dessin à la ligne de
  révélation ~62% du viewport — architecture détaillée dans le plan).
- Contraintes produit qui tiennent : AUCUNE mention « disponible/freelance » visible (contrainte
  employeur — la copy du template est un placeholder à reformuler scène par scène) ; curseur
  custom et ancres de nav du template ACCEPTÉS (revirement assumé 2026-07-15) ; mobile = versions
  simplifiées des scènes ; images : assets Thibault + MCP Higgsfield au fil de l'eau (l'ancienne liste de
  courses vit dans `~/.trash/design-refs-2026-07-15/images-todo.md` si besoin).

## Conventions

- Dossiers racine (pas de `src/`) · alias `@/*` → `./*`.
- Composants `PascalCase.tsx` · reste `kebab-case.ts` · délimiteurs `// ===== Section =====`
  (fichiers multi-sections uniquement).
- Commentaires **minimalistes mais présents** : JSDoc court (1-2 lignes) sur les exports ; balises
  de zones dans le JSX ; inline `//` brefs pour le « pourquoi ». Pas de pavés.
- **Patterns SSR-safe obligatoires** (leçons apprises) : le render ne dépend JAMAIS de
  `useReducedMotion()` ni de mesures (coquilles identiques serveur/client) ; reveals = IO +
  classes posées post-hydratation ; mouvement continu = écritures par ref (CSS vars,
  `style.setProperty`), zéro re-render ; le HTML serveur reste visible sans JS.
- i18n : `setRequestLocale(locale)` layout **ET** page ; parité stricte fr/en ; zéro texte hardcodé.
- Styles via tokens (`bg-paper`, `text-accent`…), **un seul accent**. Strict types, pas de magic
  numbers, YAGNI, petites étapes avec preview.

## Commits

- **Pas de mention Claude** (pas de trailer). Conventional commits EN. Ne jamais commit sans
  demande explicite ; validation Thibault sur preview avant chaque commit.

## Gotchas

- **`next build` + NODE_ENV** : l'env de l'agent a `NODE_ENV=development` → builder avec
  **`NODE_ENV=production pnpm build`**. (`pnpm dev` et Vercel non affectés.)
- **Lenis** : `window.scrollTo` ne « tient » pas ; le scroll programmatique passe par l'API Lenis
  ou des events `wheel`. `useScroll`/IO/`scrollY` restent justes (Lenis anime le scroll natif).
- **HMR Turbopack** : un NOUVEAU fichier CSS ajouté aux `@import` de globals peut être ignoré par
  le dev server déjà lancé → demander à Thibault de redémarrer son `pnpm dev`.
- **Erreur `.next/types/validator.ts`** après suppression d'une route : artefact généré périmé →
  un `NODE_ENV=production pnpm build` régénère.
- Preview agent : playwright depuis le scratchpad (réinstaller `npm i playwright@1.61.1` si purgé ;
  navigateurs en cache) contre le :3000 de Thibault (Next 16 refuse un 2e dev server).

## Rules détaillées (chargées automatiquement)

@.claude/rules/ui-conventions.md
@.claude/rules/i18n.md
@.claude/rules/pedagogie.md

@AGENTS.md
