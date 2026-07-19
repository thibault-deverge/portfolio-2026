import { getTranslations } from 'next-intl/server'
import { FilNode } from '@/components/fil/FilNode'
import { RevealGroup } from '@/components/motion/RevealGroup'
import { ScrambleText } from '@/components/motion/ScrambleText'

/**
 * Scène 04 — Manifeste : la respiration encre (seul moment sombre de la page,
 * écho du preloader). Titre géant 2 lignes indentées + body court + signature mono.
 */
export async function Manifeste() {
  const t = await getTranslations('Manifeste')

  return (
    <section
      id="manifeste"
      className="relative bg-ink px-6 py-14 text-paper sm:px-10 lg:px-14 lg:py-[clamp(80px,16vh,200px)]"
    >
      <div className="mx-auto w-full max-w-310">
        <RevealGroup>
          {/* Kicker + ancre du fil (le nœud terracotta vit très bien sur l'encre) */}
          <div className="relative mb-10">
            <FilNode className="absolute -left-6 top-1" />
            <ScrambleText
              text={t('num')}
              trigger="in-view"
              className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
            />
          </div>
          <h2 className="font-display text-[clamp(2.8rem,8vw,6.4rem)] font-normal leading-[0.95] tracking-[-0.03em] [font-optical-sizing:auto]">
            <span className="mb-[-0.1em] block overflow-hidden pb-[0.1em]">
              <span data-reveal className="block">
                {t('title1')}
              </span>
            </span>
            <span className="mb-[-0.1em] block overflow-hidden pb-[0.1em] lg:pl-[8vw]">
              <span data-reveal className="block">
                {t.rich('title2', {
                  accent: (chunks) => (
                    <em className="font-medium italic text-accent">{chunks}</em>
                  ),
                })}
              </span>
            </span>
          </h2>
          {/* Bloc indenté : body + tagline italique + signature mono sous filet */}
          <div className="mt-[clamp(32px,6vh,64px)] lg:pl-[8vw]">
            <p
              data-reveal-words
              className="max-w-[52ch] text-pretty text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.7] text-paper/60"
            >
              {t.rich('body', {
                k: (chunks) => <span className="text-paper">{chunks}</span>,
              })}
            </p>
            <p className="mt-7 overflow-hidden">
              <span
                data-reveal
                className="block max-w-[52ch] font-display text-[clamp(1.1rem,1.5vw,1.35rem)] italic leading-[1.5]"
              >
                {t('tagline')}
              </span>
            </p>
            <p className="mt-9 max-w-[52ch] overflow-hidden border-t border-paper/15 pt-5">
              <span
                data-reveal
                className="block font-mono text-[11px] uppercase tracking-[0.12em] text-paper/60"
              >
                {t('roles')}
              </span>
            </p>
          </div>
        </RevealGroup>
      </div>
    </section>
  )
}
