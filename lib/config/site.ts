// ================================
// ==        Site config         ==
// ================================

export const siteConfig = {
  name: 'Thibault Deverge',
  title: 'Thibault Deverge — Développeur Next.js',
  description:
    'Développeur front-end / Next.js end-to-end. Je conçois des produits web complets, du design à la base de données.',
  // TODO: remplacer par le domaine définitif une fois choisi.
  url: 'https://thibault-deverge.vercel.app',
  email: 'thibault.deverge@gmail.com',
  links: {
    github: 'https://github.com/thibault-deverge',
    linkedin: 'https://www.linkedin.com/in/thibault-deverge-061724356',
  },
  // Ancres de la landing one-page ; `key` = clé de traduction du label (nav i18n à l'étape 12).
  nav: [
    { key: 'journey', href: '#journey' },
    { key: 'work', href: '#work' },
    { key: 'contact', href: '#contact' },
  ],
} as const

export type SiteConfig = typeof siteConfig
