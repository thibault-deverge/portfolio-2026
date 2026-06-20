import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// En Next.js 16, l'ex-`middleware.ts` s'appelle `proxy.ts`.
export default createMiddleware(routing)

export const config = {
  // Ignore les routes internes, l'API et les fichiers (avec extension).
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
}
