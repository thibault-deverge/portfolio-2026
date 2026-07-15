---
name: review-changes
description: Review du code avant commit, adaptée au portfolio (tokens, parité i18n fr/en, a11y du motion, conventions). Utiliser quand l'utilisateur veut une relecture avant de commit (ex "review mes changements", "c'est bon pour commit ?", "/review-changes").
---

# review-changes

Review pré-commit des changements locaux. Direct et actionnable, comme un mentor.

## Étapes

1. **Collecter** : `git status`, `git diff` (unstaged) et `git diff --staged`. Rien à review ? → le dire et s'arrêter.

2. **Analyser chaque fichier modifié** :
   - **Tokens** : pas de **hex en dur** (`#xxxxxx`) dans les `className`/styles → utiliser les utilities
     (`bg-paper`, `text-accent`, `border-hairline`…). Un seul accent.
   - **i18n** : aucun **texte visible hardcodé** (doit passer par `t()`). Toute nouvelle clé présente dans
     **`fr.json` ET `en.json`** (parité de structure).
   - **Motion / a11y** : toute nouvelle animation respecte **`prefers-reduced-motion`** ? Motion isolé en client-only ?
     **Patterns SSR-safe** : render jamais dépendant de `useReducedMotion()`/mesures ; reveals =
     IO + classes post-hydratation (pas de `whileInView` qui sérialise `opacity:0`) ; mouvement
     continu (scrub/parallax) = écritures par ref, zéro re-render ; HTML serveur visible sans JS.
   - **Conventions** : composants `PascalCase.tsx`, reste `kebab-case.ts`, barrels `index.ts` à jour,
     délimiteurs `// ===== Section =====`.
   - **Propreté** : pas de `console.log` oublié, pas de `any` évitable, pas de dead code.
   - **Vérifs** : suggérer/lancer `pnpm typecheck` et `pnpm lint`.

3. **Produire la review (en français)** :

   ```
   ## 📋 Review
   ### ✅ Ce qui est bien
   ### ⚠️ À corriger
   - chemin/fichier.tsx:42 — [problème + suggestion]
   ### 💬 Message de commit suggéré
   `type(scope): description`   (conventional, EN, SANS mention Claude)
   ```

## Notes

- **Ne pas committer** : seulement suggérer le message. Thibault commit lui-même.
- Critique directe et constructive (chaque problème → une suggestion). Pas de refacto hors-scope (YAGNI).
- Tout est clean ? → le dire simplement.
