'use client'

import { useEffect, useRef } from 'react'

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/#—'
const FRAME_MS = 34
const CHARS_PER_FRAME = 1.6
const IN_VIEW_BOTTOM_MARGIN = '-10%' // = le « top 90% » du template

/**
 * Texte « scramble » : rendu final côté serveur, puis les lettres défilent et se fixent
 * de gauche à droite. `trigger` : 'animation' (animationstart CSS) ou 'in-view' (viewport, once).
 */
export function ScrambleText({
  text,
  trigger = 'animation',
  className,
  style,
}: {
  text: string
  trigger?: 'animation' | 'in-view'
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // 1. Garde-fous : reduced-motion → texte statique
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let interval: ReturnType<typeof setInterval> | undefined

    // 2. Le défilement : lettres aléatoires, figées progressivement (par ref, zéro re-render)
    const start = () => {
      let frame = 0
      clearInterval(interval)
      interval = setInterval(() => {
        frame++
        const settled = frame / CHARS_PER_FRAME
        el.textContent = text
          .split('')
          .map((char, i) => {
            if (char === ' ' || i < settled) return char
            return CHARSET[Math.floor(Math.random() * CHARSET.length)]
          })
          .join('')
        if (settled >= text.length) {
          clearInterval(interval)
          el.textContent = text
        }
      }, FRAME_MS)
    }

    // 3. Armer le déclencheur choisi
    let io: IntersectionObserver | undefined
    if (trigger === 'animation') {
      el.addEventListener('animationstart', start)
    } else {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            start()
            io?.disconnect()
          }
        },
        { rootMargin: `0px 0px ${IN_VIEW_BOTTOM_MARGIN} 0px` },
      )
      io.observe(el)
    }

    // 4. Nettoyage : texte final garanti quoi qu'il arrive
    return () => {
      el.removeEventListener('animationstart', start)
      io?.disconnect()
      clearInterval(interval)
      el.textContent = text
    }
  }, [text, trigger])

  return (
    <p ref={ref} className={className} style={style}>
      {text}
    </p>
  )
}
