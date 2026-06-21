# Scaffold — Portfolio (référence vivante)

Plan détaillé approuvé : `~/.claude/plans/parfait-je-valide-on-curious-platypus.md`.
Ce fichier suit l'avancement et sert de référence rapide.

## Stack

- Next.js 16 (App Router, RSC, Turbopack) · React 19 · TS strict
- Tailwind v4 (`@theme`) · next-intl 3 (fr défaut + en) · `motion` + Lenis · MDX local
- Fonts : Fraunces (display) / Geist (texte) / Geist Mono · lucide-react · pnpm · ESLint + Prettier

## Conventions (reprises de np-evolution)

- Architecture `features/<feature>/{components,actions,hooks,lib}` + `index.ts` (barrel sectionné)
- Dossiers racine (pas de `src/`) · alias `@/*` → `./*`
- Composants `PascalCase.tsx` · reste `kebab-case.ts` · délimiteurs `// ===== Section =====`
- `ActionResult` + `successResult`/`errorResult` · forms react-hook-form + zod

## Avancement

- [x] 1. Bootstrap Next 16 (racine, `--empty`, pnpm) + install
- [x] 2. Outillage : Prettier + eslint-config-prettier + scripts (`format`, `typecheck`)
- [x] 3. Squelette de dossiers (features, components, lib, i18n, messages, content…)
- [x] 4. Design tokens Tailwind v4 (`@theme` : palette light-warm)
- [x] 5. Fonts next/font + bind tokens (`@theme inline`)
- [x] 6. i18n next-intl (routing, request, navigation, proxy, messages)
- [x] 7. Segment `[locale]` (layout + page + not-found)
- [x] 8. Helpers transverses (cn, ActionResult, site config)
- [x] 9. MDX (config + mdx-components + 1 case study démo)
- [x] 10. Smooth scroll Lenis (provider client-only)
- [x] 11. Fil rouge `RedThread` (motion `useScroll` + `pathLength`)
- [x] 12. Sections home + layout (Header, Footer, LocaleSwitcher)
- [ ] 13. Réserver la phase 2 (concierge, contact schemas, TODO PHASE 2)
- [ ] 14. Commits incrémentaux + commit final du scaffold
- [ ] 15. CLAUDE.md projet + config `.claude/` (rules + skills, inspiré de np-evolution + propositions)

## Hors scope (phase 2)

IA concierge · contenu réel des projets · dark mode · Cal.com live · contact fonctionnel · tests/CI/deploy

## Gotcha environnement (agent Claude Code)

L'environnement de l'agent injecte `NODE_ENV=development`, ce qui casse `next build` (prerender →
`useContext` null, React chargé en mode dev). Le terminal de Thibault et Vercel ne sont PAS affectés.

- Quand **l'agent** build : préfixer `NODE_ENV=production pnpm build`.
- En dev (`pnpm dev`) ou dans le terminal de Thibault : rien à faire.
