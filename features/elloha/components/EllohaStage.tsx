'use client'

import { useEffect, useRef } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'

/** Progression linéaire clampée de v entre a et b (0 → 1) — le `seg` du template. */
function seg(v: number, a: number, b: number) {
  return Math.min(1, Math.max(0, (v - a) / (b - a)))
}

/**
 * Coquille client de la scène : section-piste + stage pinné (layouts dans elloha.css).
 * Pilote la dérive de la galerie par CSS vars — consommées uniquement par le layout
 * pinné, donc sans effet en mobile/reduced-motion. Zéro re-render.
 */
export function EllohaStage({
  title,
  badges,
  para0,
  para1,
  gallery,
}: {
  title: React.ReactNode
  badges: React.ReactNode
  para0: React.ReactNode
  para1: React.ReactNode
  gallery: React.ReactNode
}) {
  const sectionRef = useRef<HTMLElement>(null)

  // p : 0 quand le stage se pinne (haut de section au haut du viewport),
  // 1 quand il se dé-pinne (bas de section au bas du viewport) — scrub pur.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const update = (p: number) => {
    const style = sectionRef.current?.style
    if (!style) return
    // 1. Dérive : course douce (-21/-6) — le collage glisse mais reste cadré
    //    dans la moitié gauche en fin de piste
    style.setProperty('--drift-x', `${-21 * p}%`)
    style.setProperty('--drift-y', `${-6 * p}%`)
    // 2. Cross-fade resserré : acte 1 sort tôt (26→38%), acte 2 installé dès 46% —
    //    le reste de la piste laisse simplement la dérive finir
    const fade0 = seg(p, 0, 0.1) * (1 - seg(p, 0.26, 0.38))
    const fade1 = seg(p, 0.34, 0.46)
    style.setProperty('--fade-0', String(fade0))
    style.setProperty('--fade-1', String(fade1))
  }

  useMotionValueEvent(scrollYProgress, 'change', update)
  // état initial dès l'hydratation (sinon les fallbacks `1` restent jusqu'au 1er scroll)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => update(scrollYProgress.get()), [])

  return (
    <section ref={sectionRef} id="elloha" className="elloha-section relative">
      {/* empilé par défaut (utilities) ; pinné plein écran en desktop+motion (elloha.css) */}
      <div className="elloha-stage mx-auto w-full max-w-310 bg-paper px-6 py-[clamp(80px,16vh,200px)] sm:px-10 lg:px-14">
        <div className="elloha-title relative mb-10">{title}</div>
        {badges}
        <div className="elloha-para elloha-para-0 mb-10">{para0}</div>
        <div className="elloha-drift grid grid-cols-2 items-start gap-3 sm:gap-4">
          {gallery}
        </div>
        <div className="elloha-para elloha-para-1 mt-10">{para1}</div>
      </div>
    </section>
  )
}
