'use client'

import { useState } from 'react'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useLenis } from 'lenis/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/lib/config/site'
import { cn } from '@/lib/utils'
import { LocaleSwitcher } from './LocaleSwitcher'

const TOP_ZONE_PX = 24
const MIN_Y_TO_HIDE_PX = 80

// La nav « pousse » avec le site : une entrée par scène livrée (décision D5).
// Labels dans le namespace Nav (messages/{fr,en}.json).
const SECTIONS: { id: string; labelKey: 'about' }[] = [{ id: 'apropos', labelKey: 'about' }]

/** Bandeau d'identité (nom + FR/EN). Pas de nav : la page se découvre en scrollant. */
export function Header() {
  const [atTop, setAtTop] = useState(true)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()
  const lenis = useLenis()
  const t = useTranslations('Nav')

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setAtTop(y < TOP_ZONE_PX)
    // masqué en descendant — jamais en reduced-motion
    setHidden(!reduceMotion && y > previous && y > MIN_Y_TO_HIDE_PX)
  })

  return (
    <header
      className={cn(
        'header-in fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300 ease-out',
        !atTop && 'border-hairline bg-paper/85 backdrop-blur-sm',
        hidden && '-translate-y-full',
      )}
    >
      <div className="mx-auto flex w-full max-w-310 items-center justify-between px-6 py-5 sm:px-10 lg:px-14">
        <Link
          href="/"
          className="group font-display text-lg font-medium italic tracking-tight text-ink"
        >
          {siteConfig.name}
          {/* nœud du fil rouge ; un bout de fil s'étire au hover */}
          <span className="ml-1 inline-flex items-center" aria-hidden>
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="h-0.5 w-0 rounded-full bg-accent transition-[width] duration-200 ease-out group-hover:w-3 motion-reduce:transition-none" />
          </span>
        </Link>
        {/* Nav de sections + langue (la nav apparaît au fil des scènes livrées) */}
        <div className="flex items-center gap-[clamp(14px,2.2vw,30px)]">
          {SECTIONS.length > 0 && (
            <nav className="hidden items-center gap-[clamp(14px,2.2vw,30px)] font-mono text-xs uppercase tracking-[0.08em] sm:flex">
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    // Scroll doux via Lenis (window.scrollTo ne « tient » pas avec lui) ;
                    // sans JS, l'ancre native fait le travail.
                    e.preventDefault()
                    lenis?.scrollTo(`#${section.id}`, { offset: -20 })
                  }}
                  className="text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {t(section.labelKey)}
                </a>
              ))}
            </nav>
          )}
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  )
}
