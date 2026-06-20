'use client'

import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

// Smooth scroll global (inertie). Client-only : Lenis touche au DOM/scroll.
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      {children}
    </ReactLenis>
  )
}
