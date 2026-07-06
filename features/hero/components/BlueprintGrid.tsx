'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * Grille blueprint du hero + halo suivant le curseur (îlot client, ≥ lg).
 * Position écrite en direct sur le DOM (--mx/--my via ref + rAF) : zéro re-render.
 */
export function BlueprintGrid() {
  const layerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const layer = layerRef.current
    if (reduceMotion || !layer) return

    let frame = 0
    let latestX = 0
    let latestY = 0

    const onPointerMove = (e: PointerEvent) => {
      latestX = e.clientX
      latestY = e.clientY
      if (frame) return
      // 1 écriture max par image ; seules les dernières coordonnées comptent
      frame = requestAnimationFrame(() => {
        frame = 0
        if (!layer.offsetWidth) return // display:none sous lg
        const rect = layer.getBoundingClientRect()
        layer.style.setProperty('--mx', `${latestX - rect.left}px`)
        layer.style.setProperty('--my', `${latestY - rect.top}px`)
      })
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [reduceMotion])

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[56%] lg:block"
    >
      {/* Grille de base, toujours visible. */}
      <div className="blueprint-grid hero-grid-in absolute inset-0" />
      {/* Couche lumière, révélée dans le halo autour du curseur. */}
      <div ref={layerRef} className="blueprint-grid-light absolute inset-0" />
    </div>
  )
}
