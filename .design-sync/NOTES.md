# Notes design-sync

- Repo = **app Next.js**, pas une bibliothèque de composants : composants RSC async
  (next-intl serveur, next/font) → hors enveloppe du converter (pas de bundle JS possible
  sans variantes client-safe). Choix validé par Thibault (2026-07-01) : **Option A
  « vitrine design »** — layout authoré à la main.
- Contenu syncé : `styles.css` (tokens + grille blueprint), `tokens/tokens.css`, cartes
  preview HTML (`@dsCard`) : Colors, Type, Header, Hero. Pas de `_ds_bundle.js`, pas de
  `.d.ts`, pas de `_ds_sync.json` (pas d'anchor → un futur re-sync re-vérifie tout, choix
  honnête sanctionné par le skill).
- Fonts via Google Fonts (`@import` dans styles.css) : Fraunces (+ italic), Geist, Geist Mono.
  Le repo utilise next/font ; les valeurs sont équivalentes visuellement.
- Sortie locale : `ds-bundle/` (gitignoré). Source de vérité du style : `styles/theme.css`
  + `styles/hero.css` du repo — toute évolution de tokens doit être répercutée à la main
  dans le bundle avant re-sync.
- Scope exclu volontairement : sections scaffold (Journey/Work/Contact/Footer) — à ajouter
  après leur passe design (Étapes 2-3).
