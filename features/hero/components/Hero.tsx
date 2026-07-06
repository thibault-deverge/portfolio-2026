import { getTranslations } from 'next-intl/server'
import { BlueprintGrid } from './BlueprintGrid'

/**
 * Premier écran : titre éditorial, CTA et grille blueprint.
 * Animations d'entrée en CSS pur (styles/hero.css).
 */
export async function Hero() {
  const t = await getTranslations('Home')

  return (
    <header className="relative flex min-h-dvh w-full flex-col overflow-hidden">
      {/* Filigrane : grille blueprint + halo curseur (≥ lg). */}
      <BlueprintGrid />

      {/* nœud d'origine du fil rouge — position provisoire, à caler sur le tracé (étape fil) */}
      <span
        aria-hidden
        className="hero-node-in absolute left-[78%] top-[32%] z-30 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-4 ring-paper lg:block"
      />

      {/* Bloc central : titre, sous-titre, CTA. */}
      <div className="relative z-10 mx-auto flex w-full max-w-310 flex-1 flex-col justify-center px-6 py-14 sm:px-10 lg:px-14">
        <h1 className="font-display font-normal tracking-tight text-ink font-features-['ss01'] [font-optical-sizing:auto]">
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
      <div className="hero-hint-in relative z-10 mx-auto hidden w-full max-w-310 px-6 pb-8 sm:px-10 lg:block lg:px-14">
        <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          <span className="hero-bob inline-block">↓</span> {t('scrollHint')}
        </span>
      </div>
    </header>
  )
}
