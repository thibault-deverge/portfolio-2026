import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  // fr servi à la racine (/), en préfixé (/en)
  localePrefix: 'as-needed',
})
