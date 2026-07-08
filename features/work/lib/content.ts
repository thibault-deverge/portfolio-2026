// Registre des case studies : slug → loader MDX par locale.
// Chemins d'import STATIQUES (un par fichier) → fiables et tree-shakeables.
export const workProjects = {
  'np-evolution': {
    fr: () => import('@/content/work/np-evolution/fr.mdx'),
    en: () => import('@/content/work/np-evolution/en.mdx'),
  },
} as const

export type WorkSlug = keyof typeof workProjects
export const workSlugs = Object.keys(workProjects) as WorkSlug[]
