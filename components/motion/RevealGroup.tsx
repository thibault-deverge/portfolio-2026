'use client'

import { useEffect, useRef } from 'react'

// Le template déclenche à « top 82% » (-18%) ; trop tôt chez nous — l'animation
// était finie avant la fin du geste de scroll. -30% : on voit le début du reveal.
const IO_BOTTOM_MARGIN = '-30%'
const ALREADY_VISIBLE_RATIO = 0.92

/**
 * Révèle ses descendants `[data-reveal]` à l'entrée dans le viewport (stagger 90ms).
 * SSR-safe : enfants rendus serveur, classes reveal-* (styles/reveal.css) posées post-hydratation.
 */
export function RevealGroup({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 1. Garde-fous : reduced-motion → on ne cache rien
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // 2. Préparer : cacher chaque élément (rise ou wipe) et lui donner son rang de stagger
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-wipe]'))
    if (items.length === 0) return
    const isWipe = (el: HTMLElement) => el.hasAttribute('data-reveal-wipe')
    items.forEach((el, i) => {
      el.style.setProperty('--reveal-i', String(i))
      el.classList.add(isWipe(el) ? 'reveal-pending-wipe' : 'reveal-pending')
    })
    const reveal = () =>
      items.forEach((el) => el.classList.add(isWipe(el) ? 'reveal-in-wipe' : 'reveal-in'))

    // 3. Groupe déjà à l'écran → révéler tout de suite (un trigger déjà dépassé ne tirerait jamais)
    if (root.getBoundingClientRect().top < window.innerHeight * ALREADY_VISIBLE_RATIO) {
      root.classList.add('reveal-now')
      requestAnimationFrame(reveal)
      return
    }

    // 4. Sinon : attendre l'entrée dans le viewport, révéler une seule fois
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal()
          io.disconnect()
        }
      },
      { rootMargin: `0px 0px ${IO_BOTTOM_MARGIN} 0px` },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
