import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FilNode } from '@/components/fil/FilNode'
import { Parallax } from '@/components/motion/Parallax'
import { RevealGroup } from '@/components/motion/RevealGroup'
import { ScrambleText } from '@/components/motion/ScrambleText'

/**
 * Scène 01 — À propos : bio (numéro, titre 2 lignes, body) + portrait 3/4.
 * Reveals au scroll sur la colonne bio ; parallax (D), copy et portrait définitifs (E).
 */
export async function About() {
  const t = await getTranslations('About')

  return (
    <section
      id="apropos"
      className="relative px-6 py-[clamp(80px,16vh,200px)] sm:px-10 lg:px-14"
    >
      <div className="mx-auto grid w-full max-w-310 gap-[clamp(32px,6vw,96px)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
        {/* Colonne bio : numéro, titre, body — révélés sous masque à l'entrée */}
        <RevealGroup>
          <ScrambleText
            text={t('num')}
            trigger="in-view"
            className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-accent"
          />
          <h2 className="mb-7 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-normal leading-none tracking-tight text-ink [font-optical-sizing:auto]">
            <span className="mb-[-0.18em] block overflow-hidden pb-[0.18em]">
              <span data-reveal className="block">
                {t('title1')}
              </span>
            </span>
            <span className="mb-[-0.18em] block overflow-hidden pb-[0.18em]">
              <span data-reveal className="block italic text-ink-muted">
                {t('title2')}
              </span>
            </span>
          </h2>
          {/* Body en escalier : parcours / méthode (cousue au fil) / relais aux projets */}
          <div className="max-w-[52ch] text-[clamp(1.02rem,1.35vw,1.2rem)] leading-[1.7] text-ink-muted">
            <p className="overflow-hidden">
              <span data-reveal className="block text-pretty">
                {t.rich('body1', {
                  k: (chunks) => <span className="text-ink">{chunks}</span>,
                })}
              </span>
            </p>
            <p className="mt-6 overflow-hidden">
              <span data-reveal className="block text-pretty">
                {t.rich('body2', {
                  k: (chunks) => <span className="text-ink">{chunks}</span>,
                })}
              </span>
            </p>
            <p className="mt-6 overflow-hidden">
              <span data-reveal className="block font-display italic">
                {t('body3')}
              </span>
            </p>
          </div>
        </RevealGroup>

        {/* Colonne portrait : photo épinglée (portrait studio — Soul, retouché au labo) */}
        <div aria-hidden className="relative" data-cursor="link">
          <div className="relative aspect-3/4 overflow-hidden rounded-md border border-hairline bg-surface">
            {/* couche parallax : l'image déborde de ±12% pour couvrir la course */}
            <Parallax amount={0.16} className="absolute inset-0">
              <div className="absolute inset-x-0 inset-y-[-12%]">
                <Image
                  src="/portrait/portrait-studio.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  className="object-cover"
                />
              </div>
            </Parallax>
            {/* verre du cadre : grain papier + voile terracotta, fixes au-dessus du parallax */}
            <span aria-hidden className="hero-loader-grain absolute inset-0" />
            <span
              aria-hidden
              className="absolute inset-0 bg-accent/10 mix-blend-multiply"
            />
          </div>
          {/* le nœud épingle le cadre — ancre du fil rouge (M9) */}
          <FilNode className="absolute -right-1.5 -top-1.5" />
        </div>
      </div>
    </section>
  )
}
