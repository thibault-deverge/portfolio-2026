'use client'

import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

/** Bascule FR/EN en conservant la page courante. */
export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 && <span className="text-hairline">/</span>}
          <Link
            href={pathname}
            locale={loc}
            aria-current={loc === locale ? 'true' : undefined}
            className={
              loc === locale
                ? 'text-accent'
                : 'text-ink-muted transition-colors hover:text-ink'
            }
          >
            {loc.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  )
}
