'use client'

import { useEffect, useRef } from 'react'

const RING_LERP = 0.16 // vitesse de rattrapage de l'anneau (plus bas = plus de retard)
const INTERACTIVE = 'a, button, [data-cursor="link"]'

/**
 * Curseur custom dot + ring (îlot global). Actif uniquement pointeur fin +
 * motion autorisé, décidé post-hydratation : le HTML serveur garde le curseur
 * natif. Positions écrites par ref (rAF), zéro re-render.
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    const circle = circleRef.current
    if (!root || !dot || !ring || !circle) return

    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return

    document.documentElement.classList.add('has-custom-cursor')

    let x = innerWidth / 2
    let y = innerHeight / 2
    let ringX = x
    let ringY = y
    let frame = 0

    const onPointerMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      // le point colle au pointeur, sans latence
      dot.style.transform = `translate(${x}px, ${y}px)`
      root.classList.add('cursor-seen')
    }

    // l'anneau rattrape le point en douceur (lerp), une écriture par frame
    const tick = () => {
      ringX += (x - ringX) * RING_LERP
      ringY += (y - ringY) * RING_LERP
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    // l'anneau grossit au survol des éléments interactifs (délégation globale)
    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as Element | null
      circle.classList.toggle('cursor-grow', !!target?.closest(INTERACTIVE))
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerover', onPointerOver, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerover', onPointerOver)
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <div ref={rootRef} aria-hidden className="cursor-root">
      <div ref={ringRef} className="cursor-ring">
        <span ref={circleRef} className="cursor-circle" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
