'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

/**
 * Glisse son contenu verticalement (±amount×60%) pendant la traversée du viewport —
 * scrubbed, écrit par motion value. L'appelant surdimensionne le contenu (ex. ±12%)
 * pour ne pas découvrir les bords. Reduced-motion → immobile.
 */
export function Parallax({
  amount = 0.16,
  className,
  children,
}: {
  amount?: number
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  // progression 0 → 1 : le haut du bloc entre en bas d'écran → son bas sort en haut
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const travel = reduceMotion ? 0 : amount * 60
  const y = useTransform(scrollYProgress, [0, 1], [`${-travel}%`, `${travel}%`])

  return (
    <div ref={ref} className={className}>
      <motion.div className="absolute inset-0" style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
