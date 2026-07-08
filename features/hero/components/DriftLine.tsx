'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

const DRIFT_RANGE_PX = 600 // distance de scroll sur laquelle la dérive se déploie

/**
 * Ligne du hero qui dérive horizontalement au fil du scroll (scrubbed, réversible).
 * `amount` en px : négatif = vers la gauche, positif = vers la droite.
 * Les enfants restent rendus côté serveur (donut) ; reduced-motion → aucune dérive.
 */
export function DriftLine({
  amount,
  className,
  children,
}: {
  amount: number
  className?: string
  children: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const x = useTransform(scrollY, [0, DRIFT_RANGE_PX], [0, reduceMotion ? 0 : amount])

  return (
    <motion.div className={className} style={{ x }}>
      {children}
    </motion.div>
  )
}
