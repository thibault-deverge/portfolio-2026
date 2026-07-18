import { getTranslations } from 'next-intl/server'
import { FilNode } from '@/components/fil/FilNode'
import { ScrambleText } from '@/components/motion/ScrambleText'
import { BlueprintGrid } from './BlueprintGrid'
import { DriftLine } from './DriftLine'
import { IntroLock } from './IntroLock'
import { Preloader } from './Preloader'
import { TravelingNode } from './TravelingNode'

/**
 * Premier écran : titre éditorial, CTA et grille blueprint.
 * Animations d'entrée en CSS pur (styles/hero.css).
 */
export async function Hero() {
  const t = await getTranslations('Home')

  return (
    <header className="relative flex min-h-dvh w-full flex-col overflow-hidden">
      <Preloader />
      <TravelingNode />
      <IntroLock />

      {/* Filigrane : grille blueprint + halo curseur (≥ lg). */}
      <BlueprintGrid />

      {/* nœud d'origine du fil rouge — position provisoire, à caler sur le tracé (étape fil) */}
      <FilNode className="absolute left-[78%] top-[32%] z-30 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />

      {/* Bloc central : eyebrow, titre manifeste 3 lignes, sous-titre. */}
      <div className="relative z-10 mx-auto flex w-full max-w-310 flex-1 flex-col justify-center px-6 py-14 sm:px-10 lg:px-14">
        <ScrambleText
          text={t('eyebrow')}
          className="hero-rise mb-[clamp(20px,4vh,44px)] font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted sm:text-xs sm:tracking-[0.2em]"
          style={{ animationDelay: '2.45s' }}
        />

        <h1 className="font-display text-[clamp(3.2rem,12vw,10rem)] font-normal leading-[0.9] tracking-[-0.03em] text-ink font-features-['ss01'] [font-optical-sizing:auto]">
          {/* Chaque ligne : reveal sous masque à l'entrée, puis dérive scrubbed au scroll */}
          <DriftLine amount={-70}>
            <span className="mb-[-0.18em] block overflow-hidden pb-[0.18em]">
              <span
                className="hero-line block text-ink-muted"
                style={{ animationDelay: '2.5s' }}
              >
                {t('headline1')}
              </span>
            </span>
          </DriftLine>
          <DriftLine amount={110}>
            <span className="mb-[-0.18em] block overflow-hidden pb-[0.18em] pl-[8vw]">
              <span
                className="hero-line block italic"
                style={{ animationDelay: '2.62s' }}
              >
                {t('headline2')}
              </span>
            </span>
          </DriftLine>
          <DriftLine amount={-50}>
            <span className="mb-[-0.18em] block overflow-hidden pb-[0.18em] pl-[8vw]">
              <span
                className="hero-line block font-medium text-accent"
                style={{ animationDelay: '2.74s' }}
              >
                {t('headline3')}
              </span>
            </span>
          </DriftLine>
        </h1>

        {/* Sous-titre en deux voix : la thèse (Fraunces italique), la preuve (Geist muted) */}
        <div className="hero-rise mt-[clamp(28px,5vh,52px)] pl-[8vw]" style={{ animationDelay: '2.95s' }}>
          <p className="text-pretty font-display text-[clamp(1.2rem,1.9vw,1.7rem)] italic leading-snug tracking-tight text-ink">
            {t('subtitle1')}
          </p>
          <p className="mt-5 max-w-[58ch] text-pretty text-[clamp(0.9rem,1.15vw,1.05rem)] leading-relaxed text-ink-muted">
            {t('subtitle2')}
          </p>
        </div>
      </div>
    </header>
  )
}
