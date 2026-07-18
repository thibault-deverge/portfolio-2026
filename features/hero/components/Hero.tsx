import { getTranslations } from 'next-intl/server'
import { BlueprintGrid } from './BlueprintGrid'
import { DriftLine } from './DriftLine'
import { FilNode } from './FilNode'
import { Preloader } from './Preloader'
import { ScrambleText } from './ScrambleText'

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

      {/* Bloc central : eyebrow, titre manifeste 3 lignes, sous-titre. */}
      <div className="relative z-10 mx-auto flex w-full max-w-310 flex-1 flex-col justify-center px-6 py-14 sm:px-10 lg:px-14">
        <ScrambleText
          text={t('eyebrow')}
          className="hero-rise mb-[clamp(20px,4vh,44px)] font-mono text-xs uppercase tracking-[0.2em] text-ink-muted"
          style={{ animationDelay: '2.45s' }}
        />

        <h1 className="font-display text-[clamp(3.2rem,12vw,10rem)] font-normal leading-[0.9] tracking-[-0.03em] text-ink font-features-['ss01'] [font-optical-sizing:auto]">
          {/* Chaque ligne : reveal sous masque à l'entrée, puis dérive scrubbed au scroll */}
          <DriftLine amount={-70}>
            <span className="mb-[-0.12em] block overflow-hidden pb-[0.12em]">
              <span
                className="hero-line block text-ink-muted"
                style={{ animationDelay: '2.5s' }}
              >
                {t('headline1')}
              </span>
            </span>
          </DriftLine>
          <DriftLine amount={110}>
            <span className="mb-[-0.12em] block overflow-hidden pb-[0.12em] pl-[8vw]">
              <span
                className="hero-line block italic"
                style={{ animationDelay: '2.62s' }}
              >
                {t('headline2')}
              </span>
            </span>
          </DriftLine>
          <DriftLine amount={-50}>
            <span className="mb-[-0.12em] block overflow-hidden pb-[0.12em] pl-[8vw]">
              <span
                className="hero-line block font-medium text-accent"
                style={{ animationDelay: '2.74s' }}
              >
                {t('headline3')}
              </span>
            </span>
          </DriftLine>
        </h1>

        <p
          className="hero-rise mt-[clamp(28px,5vh,52px)] max-w-[56ch] pl-[8vw] text-pretty text-[clamp(1rem,1.4vw,1.25rem)] leading-relaxed text-ink-muted"
          style={{ animationDelay: '2.95s' }}
        >
          {t('subtitle')}
        </p>
      </div>
    </header>
  )
}
