'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { cn } from '@/lib/utils'

const PARALLAX_PCT = 5 // amplitude du glissement interne (±%)
const REVEAL_THRESHOLD = 0.15 // part visible de la planche qui déclenche le reveal

type PlateProps = {
  /** Sans src : placeholder hachuré stylé (planche « à compléter »). */
  src?: string
  alt?: string
  /** Ratio CSS du cadre (ex '3/4', '16/10') — réserve l'espace, zéro CLS. */
  ratio: string
  /** Requis avec src (next/image fill). */
  sizes?: string
  caption?: string
  annotation?: string
  placeholderLabel?: string
  priority?: boolean
  className?: string
}

/**
 * « Planche technique » : le cadre annoté commun à toutes les images du site
 * (crop marks, légendes mono, hachures sans image). Reveal à l'entrée du
 * viewport + micro-parallax — le HTML serveur reste visible et statique.
 */
export function Plate({
  src,
  alt = '',
  ratio,
  sizes,
  caption,
  annotation,
  placeholderLabel,
  priority,
  className,
}: PlateProps) {
  const figureRef = useRef<HTMLElement>(null)
  const shiftRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: figureRef,
    offset: ['start end', 'end start'],
  })

  //#region ---- Reveal (IO + classes, jamais dans le render) ----
  useEffect(() => {
    const el = figureRef.current
    if (reduceMotion || !el) return
    el.classList.add('plate--pending')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('plate--in')
          io.disconnect()
        }
      },
      { threshold: REVEAL_THRESHOLD },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      el.classList.remove('plate--pending', 'plate--in')
    }
  }, [reduceMotion])
  //#endregion

  //#region ---- Micro-parallax (CSS var par ref, zéro re-render) ----
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (reduceMotion) return
    // p: 0 (planche en bas de l'écran) → 1 (sortie en haut) ; centré sur 0.
    shiftRef.current?.style.setProperty(
      '--plate-shift',
      `${((p - 0.5) * 2 * PARALLAX_PCT).toFixed(2)}%`,
    )
  })
  //#endregion

  return (
    <figure ref={figureRef} className={cn('plate', className)}>
      {annotation && (
        <span
          aria-hidden
          className="absolute -top-6 right-0 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted"
        >
          {annotation}
        </span>
      )}

      {/* Wrapper : porte les crop marks HORS du cadre (qui clippe son contenu). */}
      <div className="relative">
        <span aria-hidden className="plate-marks" />
        <div className="plate-frame" style={{ aspectRatio: ratio }}>
          {src ? (
          <div ref={shiftRef} className="plate-shift">
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="plate-placeholder">
            <span className="bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              {placeholderLabel ?? caption ?? '· · ·'}
            </span>
          </div>
          )}
        </div>
      </div>

      {caption && (
        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
