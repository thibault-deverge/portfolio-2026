'use client'

import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

/** Bascule FR/EN en conservant la page courante. */
export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 font-mono text-xs tracking-[0.08em]">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-ink-muted/50">/</span>}
          <Link
            href={pathname}
            locale={loc}
            aria-current={loc === locale ? 'true' : undefined}
            className={
              loc === locale
                ? 'text-accent-deep'
                : 'text-ink-muted transition-colors duration-200 hover:text-ink'
            }
          >
            {loc.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  )
}
