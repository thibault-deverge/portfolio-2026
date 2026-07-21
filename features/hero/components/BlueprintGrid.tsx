'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

/** Moitié de la fenêtre halo (480px dans hero.css) — pour centrer sur le curseur. */
const HALO_HALF = 240

/**
 * Grille blueprint du hero + halo suivant le curseur (îlot client, ≥ lg).
 * Le halo est une fenêtre déplacée en transform composité, la grille accent
 * contre-translatée à l'intérieur reste alignée — zéro repaint, zéro re-render,
 * zéro mesure par frame (offsets page mis en cache, rafraîchis au resize).
 */
export function BlueprintGrid() {
  const layerRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const layer = layerRef.current
    const halo = haloRef.current
    const grid = gridRef.current
    if (reduceMotion || !layer || !halo || !grid) return

    // 1. Offsets PAGE du calque (stables au scroll, contrairement aux rects viewport)
    let pageLeft = 0
    let pageTop = 0
    let active = false
    const measure = () => {
      active = layer.offsetWidth > 0 // display:none sous lg
      if (!active) return
      const rect = layer.getBoundingClientRect()
      pageLeft = rect.left + window.scrollX
      pageTop = rect.top + window.scrollY
      // la grille intérieure couvre exactement le calque, quel que soit le viewport
      grid.style.width = `${rect.width}px`
      grid.style.height = `${rect.height}px`
    }
    measure()
    window.addEventListener('resize', measure)

    let frame = 0
    let latestX = 0
    let latestY = 0

    const onPointerMove = (e: PointerEvent) => {
      latestX = e.pageX
      latestY = e.pageY
      if (frame || !active) return
      // 2. Deux transforms composités max par image — la fenêtre avance, la grille recule
      frame = requestAnimationFrame(() => {
        frame = 0
        const hx = latestX - pageLeft - HALO_HALF
        const hy = latestY - pageTop - HALO_HALF
        halo.style.transform = `translate3d(${hx}px, ${hy}px, 0)`
        grid.style.transform = `translate3d(${-hx}px, ${-hy}px, 0)`
      })
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', measure)
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
      {/* Couche lumière : la fenêtre halo + sa grille accent contre-translatée. */}
      <div ref={layerRef} className="blueprint-grid-light absolute inset-0">
        <div ref={haloRef} className="blueprint-halo">
          <div ref={gridRef} className="blueprint-halo-grid" />
        </div>
      </div>
    </div>
  )
}
