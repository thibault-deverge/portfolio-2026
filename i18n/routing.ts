import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  // fr servi à la racine (/), en préfixé (/en)
  localePrefix: 'as-needed',
  // l'URL est la seule source de vérité : pas de redirection via cookie/Accept-Language
  localeDetection: false,
})
