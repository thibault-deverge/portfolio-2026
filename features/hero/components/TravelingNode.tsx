'use client'

import { useEffect, useRef } from 'react'
import { animate } from 'motion/react'

const FLIGHT_S = 1.05
const ARC_PX = 110 // hauteur de l'arc au-dessus de la ligne de vol

/**
 * Le « nœud voyageur » : au départ de la levée du voile, le point terracotta du
 * dernier « Xin chào » se détache et vole se poser à la place du FilNode du hero
 * — le preloader coud le premier point du fil rouge. Ne fait rien si la cible
 * n'est pas mesurable (mobile), en reduced-motion, ou si JS arrive trop tard.
 */
export function TravelingNode() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const traveler = ref.current
    if (!traveler) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const loader = document.querySelector<HTMLElement>('.hero-loader')
    const dot = document.querySelector<HTMLElement>('[data-loader-node]')
    const target = document.querySelector<HTMLElement>('[data-fil-node]')
    if (!loader || !dot || !target || target.getClientRects().length === 0) return

    let controls: ReturnType<typeof animate> | undefined

    const onLiftStart = (e: AnimationEvent) => {
      if (e.animationName !== 'hero-loader-lift') return
      const from = dot.getBoundingClientRect()
      const to = target.getBoundingClientRect()
      const x0 = from.left + from.width / 2
      const y0 = from.top + from.height / 2
      const x1 = to.left + to.width / 2
      const y1 = to.top + to.height / 2

      // le point quitte le mot, la cible attend son arrivée
      dot.style.visibility = 'hidden'
      target.classList.add('fil-node-waiting')
      traveler.style.visibility = 'visible'

      controls = animate(
        traveler,
        {
          x: [x0, (x0 + x1) / 2, x1],
          y: [y0, Math.min(y0, y1) - ARC_PX, y1],
          scale: [0.66, 1.05, 1],
        },
        { duration: FLIGHT_S, ease: [0.22, 1, 0.36, 1] },
      )
      controls.finished.then(() => {
        traveler.style.visibility = 'hidden'
        target.classList.remove('fil-node-waiting')
        target.classList.add('fil-node-landing')
      })
    }

    loader.addEventListener('animationstart', onLiftStart)
    return () => {
      loader.removeEventListener('animationstart', onLiftStart)
      controls?.stop()
    }
  }, [])

  return <span ref={ref} aria-hidden className="traveling-node" />
}
