import { getTranslations } from 'next-intl/server'

// ================================
// ==           Hero             ==
// ================================

// Server Component : les animations d'entrée sont du CSS pur (cf. globals.css),
// donc pas besoin de `'use client'`. Le fil rouge animé au scroll viendra dans un
// wrapper client séparé (étape sections).
export async function Hero() {
  const t = await getTranslations('Home')

  return (
    <header className="relative flex min-h-dvh w-full flex-col overflow-hidden">
      {/* Filigrane : grille blueprint sur la moitié droite, ≥ lg uniquement. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[56%] lg:block"
      >
        <div className="blueprint-grid hero-grid-in absolute inset-0" />
      </div>

      {/* Nœud d'origine du fil rouge : posé dans une zone vide de la grille, à l'écart
          du texte. Sa position définitive sera calée avec le tracé du fil (étape sections). */}
      <span
        aria-hidden
        className="hero-node-in absolute z-30 hidden size-3 rounded-full bg-accent ring-4 ring-paper lg:block"
        style={{ left: '78%', top: '32%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Barre haute : eyebrow + disponibilité. */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 pt-7 sm:px-10 lg:px-14">
        <span
          className="hero-rise font-mono text-xs tracking-[0.08em] text-ink-muted"
          style={{ animationDelay: '0.05s' }}
        >
          {t('eyebrow')}
        </span>
        <span
          className="hero-rise hidden items-center gap-2 font-mono text-xs text-ink-muted sm:flex"
          style={{ animationDelay: '0.05s' }}
        >
          <span className="inline-block size-1.5 rounded-full bg-ink-muted" />
          {t('availability')}
        </span>
      </div>

      {/* Bloc central : titre, sous-titre, CTA. */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-1 flex-col justify-center px-6 py-14 sm:px-10 lg:px-14">
        <h1 className="font-display font-normal tracking-tight text-ink [font-feature-settings:'ss01'] [font-optical-sizing:auto]">
          <span
            className="hero-rise block text-[clamp(2.4rem,6.6vw,5.5rem)] leading-[0.98] text-ink-muted"
            style={{ animationDelay: '0.15s' }}
          >
            {t('headlineLead')}
          </span>
          <span
            className="hero-rise mt-3 block pl-[6vw] text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.92] text-ink lg:pl-[8vw]"
            style={{ animationDelay: '0.42s' }}
          >
            {t('headlinePunch')}
          </span>
        </h1>

        <p
          className="hero-rise mt-10 max-w-[42ch] pl-[6vw] text-pretty text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-ink-muted lg:pl-[8vw]"
          style={{ animationDelay: '0.54s' }}
        >
          {t('subtitle')}
        </p>

        <div
          className="hero-rise mt-11 flex flex-wrap items-center gap-7 pl-[6vw] lg:pl-[8vw]"
          style={{ animationDelay: '0.64s' }}
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 text-base font-medium text-accent"
          >
            {t('ctaPrimary')}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="text-[15px] text-ink-muted underline decoration-hairline underline-offset-4 transition-colors hover:text-ink hover:decoration-ink-muted"
          >
            {t('ctaSecondary')}
          </a>
        </div>
      </div>

      {/* Indice de scroll (≥ lg). */}
      <div className="hero-hint-in relative z-10 mx-auto hidden w-full max-w-[1240px] px-6 pb-8 sm:px-10 lg:block lg:px-14">
        <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          <span className="hero-bob inline-block">↓</span> {t('scrollHint')}
        </span>
      </div>
    </header>
  )
}
