# Portfolio — Thibault Deverge

Portfolio freelance **bilingue (FR/EN)**, Next.js 16 (App Router). Vitrine de ses expériences
(Elloha, NP-Evolution) avec une signature « fil rouge ».
Avancement : `Scaffold.md`. Plan détaillé : `~/.claude/plans/parfait-je-valide-on-curious-platypus.md`.

## Stack

- Next.js 16 (App Router, RSC, Turbopack) · React 19 · TypeScript strict
- Tailwind v4 (tokens dans `@theme`, `app/globals.css`) · next-intl 4 (fr défaut + en)
- `motion` (`motion/react`) + Lenis (smooth scroll) · MDX local (case studies) · zod
- Fonts via `next/font` : Fraunces (display) / Geist (texte) / Geist Mono
- pnpm · ESLint + Prettier (`semi: false`, single quotes, 90 cols)

## Commandes

- `pnpm dev` — dev server (Turbopack)
- `NODE_ENV=production pnpm build` — ⚠️ voir Gotchas (toujours préfixer `NODE_ENV=production` côté agent)
- `pnpm typecheck` · `pnpm lint` · `pnpm format`

## Architecture (feature-based)

- `app/[locale]/` — routes localisées. `layout.tsx` (html, fonts, providers i18n + Lenis, Header/Footer),
  `page.tsx` (home one-page), `work/[slug]/page.tsx` (case study MDX).
- `features/<feature>/` — un domaine, avec `components/` `actions/` `hooks/` `lib/` + `index.ts` (barrel
  sectionné). Features : `journey` (fil rouge), `work`, `contact`, `concierge` (phase 2, réservé).
- `components/{ui,forms,layout}/` — transverse (Header, Footer, LocaleSwitcher, SmoothScrollProvider).
- `lib/{core,utils,schemas,config}/` — `cn`, `ActionResult` (`successResult`/`errorResult`), `site.ts`.
- `i18n/` (routing, request, navigation) · `proxy.ts` (middleware next-intl, nom Next 16) ·
  `messages/{fr,en}.json` · `content/work/<slug>/{fr,en}.mdx`.

## Conventions

- Dossiers racine (pas de `src/`) · alias `@/*` → `./*`.
- Composants `PascalCase.tsx` · reste `kebab-case.ts` · délimiteurs `// ===== Section =====`.
- Forms : react-hook-form + zod. Server actions : type `ActionResult`.
- Styles via tokens Tailwind (`bg-paper`, `text-accent`, `font-display`…), **un seul accent**.
- i18n : `setRequestLocale(locale)` dans le layout **ET** chaque page (sinon perte du rendu statique).
- Strict types, pas de magic numbers, **YAGNI** (simplicité avant tout), petites étapes.

## Commits

- **Pas de mention Claude dans les commits** (pas de trailer `Co-Authored-By`).
- Conventional commits en anglais (`feat:`, `fix:`, `chore:`…). Ne pas commit sans demande explicite.

## Phase 2 (réservé, non implémenté)

IA concierge (palette ⌘K + Anthropic Haiku), contact live (Resend + server action + rate-limit),
Cal.com, dark mode. Variables dans `.env.example`. Dossiers `features/concierge/` et
`features/contact/actions/` réservés.

## Gotchas

- **`next build` + NODE_ENV** : l'environnement de l'agent a `NODE_ENV=development`, ce qui casse
  `next build` (`useContext` null au prerender). Builder avec **`NODE_ENV=production pnpm build`**.
  `pnpm dev` et les déploiements Vercel ne sont PAS affectés.
- **Lenis + scroll programmatique** : `window.scrollTo` ne « tient » pas (Lenis ramène) ; utiliser
  l'API Lenis ou des events `wheel`.

## Skills / outils pertinents

- `/frontend-design` — passe design (hero, sections, art direction).
- `a11y-check`, `perf-audit` — audits accessibilité / performance.
- `find-docs` (Context7) — doc des libs (Next 16, next-intl 4, motion, Tailwind v4…).
- `implement`, `debug` — workflows structurés.

@AGENTS.md
