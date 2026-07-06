'use client'

import { motion, type MotionValue } from 'motion/react'

/** Trait du fil rouge ; `pathLength` (0→1) piloté de l'extérieur. */
export function RedThread({ pathLength }: { pathLength: MotionValue<number> | number }) {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 12 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M6 0 V100"
        stroke="var(--color-accent)"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength }}
      />
    </svg>
  )
}
