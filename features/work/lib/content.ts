// Registre des case studies : slug → loader MDX par locale.
// Chemins d'import STATIQUES (un par fichier) → fiables et tree-shakeables.
export const workProjects = {
  exemple: {
    fr: () => import('@/content/work/exemple/fr.mdx'),
    en: () => import('@/content/work/exemple/en.mdx'),
  },
} as const

export type WorkSlug = keyof typeof workProjects
export const workSlugs = Object.keys(workProjects) as WorkSlug[]
