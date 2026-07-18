'use client'

import { useEffect, useRef } from 'react'

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/#—'
const FRAME_MS = 34
const CHARS_PER_FRAME = 1.6

/**
 * Texte « scramble » : rendu final côté serveur, puis les lettres défilent et se
 * fixent une à une. Déclenché par l'animationstart CSS de l'élément (hero-rise) —
 * en reduced-motion l'animation n'existe pas, donc le scramble non plus.
 */
export function ScrambleText({
  text,
  className,
  style,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let interval: ReturnType<typeof setInterval> | undefined

    // Synchronisé sur le début de l'animation CSS d'apparition (écriture par ref,
    // zéro re-render). Si l'hydratation arrive trop tard, le texte reste statique.
    const onStart = () => {
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

    el.addEventListener('animationstart', onStart)
    return () => {
      el.removeEventListener('animationstart', onStart)
      clearInterval(interval)
      el.textContent = text
    }
  }, [text])

  return (
    <p ref={ref} className={className} style={style}>
      {text}
    </p>
  )
}
