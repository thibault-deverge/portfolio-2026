---
name: new-case-study
description: Scaffold une nouvelle étude de cas (case study) MDX bilingue pour le portfolio et l'enregistre dans le registre. Utiliser quand l'utilisateur veut ajouter un projet / une étude de cas (ex "ajoute un projet", "nouvelle case study", "/new-case-study elloha").
---

# new-case-study

Crée une étude de cas bilingue et la branche dans le registre. L'utilisateur n'a plus qu'à écrire le contenu.

## Étapes

1. **Récupérer le slug** (kebab-case, ex `np-evolution`, `elloha`). Si non fourni, le demander.

2. **Créer les 2 fichiers MDX** `content/work/<slug>/fr.mdx` et `content/work/<slug>/en.mdx`.
   Template (adapter le contenu) :

   ```mdx
   export const metadata = {
     title: '<Titre du projet>',
     summary: '<Résumé en une phrase>',
   }

   # <Titre du projet>

   <Contexte / le problème.>

   ## Le défi

   - <point>

   ## La solution

   <texte>
   ```

   Rappel : pas de frontmatter YAML (`@next/mdx` ne le lit pas) → `export const metadata`.

3. **Enregistrer dans** `features/work/lib/content.ts` (imports STATIQUES, un par fichier) :

   ```ts
   '<slug>': {
     fr: () => import('@/content/work/<slug>/fr.mdx'),
     en: () => import('@/content/work/<slug>/en.mdx'),
   },
   ```

4. **Vérifier** : `NODE_ENV=production pnpm build` (⚠️ préfixe obligatoire côté agent — sinon `next build` casse).
   Confirmer que `/work/<slug>` (fr) et `/en/work/<slug>` apparaissent en **SSG** dans la table des routes.

## Notes

- `WorkSection` liste automatiquement les slugs du registre → rien à toucher dans les messages pour l'apparition.
- Le titre affiché dans la liste = le slug capitalisé ; le vrai titre vit dans le `metadata` du MDX.
