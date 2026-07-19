'use client'

import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

/** Smooth scroll global (Lenis). */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    // wheelMultiplier < 1 : chaque cran de molette avance moins — les scènes respirent
    <ReactLenis root options={{ lerp: 0.075, wheelMultiplier: 0.8 }}>
      {children}
    </ReactLenis>
  )
}
