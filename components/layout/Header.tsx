import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/lib/config/site'
import { LocaleSwitcher } from './LocaleSwitcher'

export async function Header() {
  const t = await getTranslations('Nav')

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper">
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg">
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden gap-6 font-mono text-sm sm:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className="text-ink-muted transition-colors hover:text-ink"
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  )
}
