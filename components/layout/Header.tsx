'use client'

import { useState } from 'react'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/lib/config/site'
import { cn } from '@/lib/utils'
import { LocaleSwitcher } from './LocaleSwitcher'

// TOP : jusqu'où (en px) on considère être « en haut » → header transparent.
// HIDE : avant ce point, on ne masque jamais le header, même en descendant.
const TOP_THRESHOLD = 24
const HIDE_THRESHOLD = 80

// Bandeau d'identité minimal : pas de liens de section — la page se découvre en
// scrollant (le fil rouge est la navigation). Client : lit la position de scroll.
export function Header() {
  const [atTop, setAtTop] = useState(true)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setAtTop(y < TOP_THRESHOLD)
    // Reduced motion : le header ne glisse jamais hors écran, il reste posé.
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
          {/* Nœud d'origine du fil rouge ; au hover, un bout de fil s'en étire. */}
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
