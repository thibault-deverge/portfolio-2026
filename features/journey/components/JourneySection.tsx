'use client'

import { useRef } from 'react'
import { useScroll, useReducedMotion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { journeyChapters } from '../lib/constants'
import { RedThread } from './RedThread'

export function JourneySection() {
  const t = useTranslations('Journey')
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  // Progression 0 → 1 pendant que la timeline traverse le viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  return (
    <section id="journey" className="mx-auto max-w-2xl px-6 py-32">
      <h2 className="font-display text-3xl font-medium">{t('title')}</h2>

      <div ref={ref} className="relative mt-16">
        {/* Le fil rouge : rail vertical à gauche, dessiné au scroll. */}
        <div className="absolute left-0 top-0 h-full w-3">
          <RedThread pathLength={reduce ? 1 : scrollYProgress} />
        </div>

        <ol className="space-y-32">
          {journeyChapters.map((ch) => (
            <li key={ch.key} className="relative pl-10">
              <span className="absolute left-1.5 top-2 size-3 -translate-x-1/2 rounded-full border-2 border-accent bg-paper" />
              <span className="font-mono text-sm text-accent">{ch.year}</span>
              <h3 className="mt-1 font-display text-2xl">{t(`${ch.key}.title`)}</h3>
              <p className="mt-2 max-w-prose text-ink-muted">{t(`${ch.key}.text`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
