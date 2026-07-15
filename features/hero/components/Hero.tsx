import { getTranslations } from 'next-intl/server'
import { BlueprintGrid } from './BlueprintGrid'
import { DriftLine } from './DriftLine'
import { FilNode } from './FilNode'
import { Preloader } from './Preloader'

/**
 * Premier écran : titre éditorial, CTA et grille blueprint.
 * Animations d'entrée en CSS pur (styles/hero.css).
 */
export async function Hero() {
  const t = await getTranslations('Home')

  return (
    <header className="relative flex min-h-dvh w-full flex-col overflow-hidden">
      <Preloader />

      {/* Filigrane : grille blueprint + halo curseur (≥ lg). */}
      <BlueprintGrid />

      {/* nœud d'origine du fil rouge — position provisoire, à caler sur le tracé (étape fil) */}
      <FilNode className="absolute left-[78%] top-[32%] z-30 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />

      {/* Bloc central : titre, sous-titre, CTA. */}
      <div className="relative z-10 mx-auto flex w-full max-w-310 flex-1 flex-col justify-center px-6 py-14 sm:px-10 lg:px-14">
        <h1 className="font-display font-normal tracking-tight text-ink font-features-['ss01'] [font-optical-sizing:auto]">
          {/* Chaque ligne : reveal sous masque à l'entrée, puis dérive scrubbed au scroll */}
          <DriftLine amount={-90}>
            <span className="mb-[-0.12em] block overflow-hidden pb-[0.12em]">
              <span
                className="hero-line block text-[clamp(2.4rem,6.6vw,5.5rem)] leading-[0.98] text-ink-muted"
                style={{ animationDelay: '2.5s' }}
              >
                {t('headlineLead')}
              </span>
            </span>
          </DriftLine>
          <DriftLine amount={120}>
            <span className="mb-[-0.12em] mt-3 block overflow-hidden pb-[0.12em]">
              <span
                className="hero-line block pl-[6vw] text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.92] text-ink lg:pl-[8vw]"
                style={{ animationDelay: '2.65s' }}
              >
                {t('headlinePunch')}
              </span>
            </span>
          </DriftLine>
        </h1>

        <p
          className="hero-rise mt-10 max-w-[42ch] pl-[6vw] text-pretty text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-ink-muted lg:pl-[8vw]"
          style={{ animationDelay: '2.9s' }}
        >
          {t('subtitle')}
        </p>
      </div>
    </header>
  )
}
