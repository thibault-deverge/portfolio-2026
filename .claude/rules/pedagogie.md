# Pédagogie & communication (NON NÉGOCIABLE)

Comment présenter le code et les explications à Thibault. Valable **partout**, et en **priorité
absolue** en mode apprentissage / leçons.

## 1. Tout snippet de code → lien `fichier:lignes`

Chaque extrait de code tiré du repo **doit** être accompagné de sa référence cliquable
`chemin/fichier.ext:début-fin` (ex : `app/[locale]/page.tsx:8-10`). Juste avant ou juste après le bloc.

- **Jamais** de snippet « nu » sorti du repo sans son lien. (Thibault déteste ça, fortement.)
- Si l'extrait est un **exemple inventé** (pas dans le repo), le signaler explicitement :
  « exemple illustratif, pas dans le code ».
- Pour un fichier entier court, le lien du fichier seul suffit.

## 2. Tout terme technique → expliqué

À sa **première occurrence**, expliquer en une phrase simple **tout** terme un tant soit peu technique
— y compris les acronymes réputés « courants » : SSG, SSR, RSC, hydratation, build, import dynamique,
API dynamique, tree-shaking, middleware, prerender, etc. **Ne jamais supposer** que le terme est connu.

- Forme : définition courte et concrète **d'abord**, puis comment ça s'applique dans le repo.
- Inutile de réexpliquer un terme déjà défini plus tôt dans la même conversation.
- En cas de doute sur le niveau : **expliquer** plutôt que supposer.

## 3. Leçons COURTES — un concept à la fois

En mode apprentissage : **un seul concept par message**, puis on **s'arrête et on vérifie** avant de
continuer. Ne jamais enchaîner plusieurs notions dans un même bloc. Mieux vaut 5 petits messages qu'une
leçon « interminable » où Thibault se perd au milieu. Si un sujet est gros, le **découper** et demander
« on continue ? » entre chaque morceau.
