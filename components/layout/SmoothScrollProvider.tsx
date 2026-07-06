'use client'

import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

/** Smooth scroll global (Lenis). */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      {children}
    </ReactLenis>
  )
}
