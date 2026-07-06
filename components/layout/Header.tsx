'use client'

import { useState } from 'react'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/lib/config/site'
import { cn } from '@/lib/utils'
import { LocaleSwitcher } from './LocaleSwitcher'

const TOP_THRESHOLD = 24 // en deçà : header transparent
const HIDE_THRESHOLD = 80 // en deçà : jamais masqué

/** Bandeau d'identité (nom + FR/EN). Pas de nav : la page se découvre en scrollant. */
export function Header() {
  const [atTop, setAtTop] = useState(true)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setAtTop(y < TOP_THRESHOLD)
    // masqué en descendant — jamais en reduced-motion
    setHidden(!reduceMotion && y > previous && y > HIDE_THRESHOLD)
  })

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300 ease-out',
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
        <LocaleSwitcher />
      </div>
    </header>
  )
}
