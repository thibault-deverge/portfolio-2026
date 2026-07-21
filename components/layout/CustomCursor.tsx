'use client'

import { useEffect, useRef } from 'react'

const RING_LERP = 0.16 // vitesse de rattrapage de l'anneau (plus bas = plus de retard)
const INTERACTIVE = 'a, button, [data-cursor="link"]'

/**
 * Curseur custom dot + ring, activé post-hydratation (pointeur fin + motion OK) :
 * le HTML serveur garde le curseur natif. Positions par ref (rAF), zéro re-render.
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

    // 1. Garde-fous : tactile ou reduced-motion → curseur natif
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return

    // 2. Activer : cursor:none piloté par la classe sur <html>
    document.documentElement.classList.add('has-custom-cursor')

    let x = innerWidth / 2
    let y = innerHeight / 2
    let ringX = x
    let ringY = y
    let frame = 0

    // 3. Le point colle au pointeur, sans latence — et réveille l'anneau
    const onPointerMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      dot.style.transform = `translate(${x}px, ${y}px)`
      root.classList.add('cursor-seen')
      if (!frame) frame = requestAnimationFrame(tick)
    }

    // 4. L'anneau rattrape en douceur (lerp), puis S'ENDORT une fois convergé —
    //    zéro travail par frame quand la souris ne bouge pas
    const tick = () => {
      ringX += (x - ringX) * RING_LERP
      ringY += (y - ringY) * RING_LERP
      if (Math.abs(x - ringX) + Math.abs(y - ringY) < 0.2) {
        ringX = x
        ringY = y
        frame = 0 // convergé : le prochain pointermove relancera la boucle
      } else {
        frame = requestAnimationFrame(tick)
      }
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
    }

    // 5. L'anneau grossit sur l'interactif (délégation globale pointerover)
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
