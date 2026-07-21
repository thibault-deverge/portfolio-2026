// ================================
// ==        Site config         ==
// ================================

export const siteConfig = {
  name: 'Thibault Deverge',
  title: 'Thibault Deverge — Développeur Next.js',
  description:
    'Développeur front-end / Next.js end-to-end. Je conçois des produits web complets, du design à la base de données.',
  // Domaine assumé (décision M10) : pas de domaine payant pour un portfolio —
  // si ça change un jour, metadata/sitemap/robots suivront automatiquement.
  url: 'https://thibault-deverge.vercel.app',
  email: 'thibault.deverge@gmail.com',
  links: {
    github: 'https://github.com/thibault-deverge',
    linkedin: 'https://www.linkedin.com/in/thibault-deverge/',
  },
} as const

export type SiteConfig = typeof siteConfig
