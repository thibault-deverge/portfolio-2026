import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FilNode } from '@/components/fil/FilNode'
import { RevealGroup } from '@/components/motion/RevealGroup'
import { ScrambleText } from '@/components/motion/ScrambleText'
import { ImageLightbox } from '@/components/ui/ImageLightbox'
import { EllohaStage } from './EllohaStage'

// ===== Galerie =====

/** Les vignettes image de la bande — la photo d'équipe l'ouvre, la carte avis (slot 5) la ferme. */
const FIGURES = [
  {
    slot: 'elloha-fig-1',
    src: '/elloha/elloha-team.jpg',
    altKey: 'altTeam',
    ratio: 'aspect-3/2',
    span: 'col-span-2',
    sizes: '(min-width: 1024px) 21vw, 92vw',
  },
  {
    slot: 'elloha-fig-2',
    src: '/elloha/elloha-vnext-planning-full.jpg',
    altKey: 'altPlanning',
    ratio: 'aspect-3/2',
    span: 'col-span-2',
    sizes: '(min-width: 1024px) 27vw, 92vw',
  },
  {
    slot: 'elloha-fig-3',
    src: '/elloha/elloha-vnext-mobile.jpg',
    altKey: 'altMobile',
    ratio: 'aspect-3/5',
    span: 'col-span-1',
    sizes: '(min-width: 1024px) 12vw, 46vw',
  },
  {
    slot: 'elloha-fig-4',
    src: '/elloha/elloha-vnext-direct.jpg',
    altKey: 'altDirect',
    ratio: 'aspect-4/5',
    span: 'col-span-1',
    sizes: '(min-width: 1024px) 14vw, 46vw',
  },
] as const

// ===== Scène =====

/**
 * Scène 03 — Elloha : le poste en CDI, montré par une galerie Vnext qui dérive
 * dans le stage pinné (EllohaStage) + deux paragraphes en cross-fade.
 */
export async function Elloha() {
  const t = await getTranslations('Elloha')

  return (
    <EllohaStage
      title={
        <RevealGroup>
          <ScrambleText
            text={t('num')}
            trigger="in-view"
            className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent-deep"
          />
          {/* l'ancre du fil rouge, épinglée près du numéro (décision M4) */}
          <FilNode className="absolute -left-4 top-1" />
          <h2 className="font-display text-[clamp(2.8rem,7.5vw,6rem)] font-normal leading-[0.92] tracking-[-0.03em] text-ink [font-optical-sizing:auto]">
            <span className="mb-[-0.1em] block overflow-hidden pb-[0.1em]">
              <span data-reveal className="block">
                {t.rich('title', {
                  i: (chunks) => <span className="italic">{chunks}</span>,
                })}
              </span>
            </span>
          </h2>
          <span className="block overflow-hidden">
            <span
              data-reveal
              className="mt-4 block font-mono text-xs uppercase tracking-[0.12em] text-ink-muted"
            >
              {t('role')}
            </span>
          </span>
        </RevealGroup>
      }
      badges={
        <RevealGroup className="elloha-badges mb-10 flex flex-wrap items-start justify-center gap-x-10 gap-y-7">
          {(['stat1', 'stat2', 'stat3', 'stat4'] as const).map((key, i) => (
            <div key={key} className={`elloha-badge elloha-badge-${i + 1}`}>
              <span className="block overflow-hidden">
                {/* anneau + point : l'écho du curseur et des nœuds du fil */}
                <div
                  data-reveal
                  className="flex flex-col items-center gap-3"
                  style={{ '--reveal-i': i } as React.CSSProperties}
                >
                  <span className="relative flex aspect-square w-[clamp(88px,8.5vw,120px)] items-center justify-center rounded-full border border-accent/60">
                    <span
                      aria-hidden
                      className="absolute right-[9%] top-[9%] size-1.5 rounded-full bg-accent"
                    />
                    <span className="px-2 text-center font-display text-[clamp(1.1rem,1.45vw,1.45rem)] leading-none text-ink">
                      {t(`${key}Value`)}
                    </span>
                  </span>
                  <span className="max-w-[14ch] text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-ink-muted">
                    {t(`${key}Label`)}
                  </span>
                </div>
              </span>
            </div>
          ))}
        </RevealGroup>
      }
      para0={
        <>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">
            <span
              aria-hidden
              className="mr-2 inline-block h-px w-4 bg-accent align-middle"
            />
            {t('para1Label')}
          </p>
          <p className="max-w-[46ch] text-pretty text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.7] text-ink-muted">
            {t.rich('para1', {
              k: (chunks) => <span className="text-ink">{chunks}</span>,
            })}
          </p>
          <p className="mt-2 max-w-[46ch] text-pretty text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.7] text-ink-muted">
            {t.rich('para1b', {
              k: (chunks) => <span className="text-ink">{chunks}</span>,
            })}
          </p>
        </>
      }
      para1={
        <>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">
            <span
              aria-hidden
              className="mr-2 inline-block h-px w-4 bg-accent align-middle"
            />
            {t('para2Label')}
          </p>
          <p className="text-pretty text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.7] text-ink-muted">
            {t.rich('para2', {
              k: (chunks) => <span className="text-ink">{chunks}</span>,
            })}
          </p>
          {/* le concret en tirets — la grammaire des listes de M3, sans reveal (zone scrubbed) */}
          <ul className="mt-4 space-y-3 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-[1.6] text-ink-muted">
            {(
              ['para2Item1', 'para2Item2', 'para2Item3', 'para2Item4'] as const
            ).map((key) => (
              <li key={key} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-[0.65em] h-px w-3.5 shrink-0 bg-accent"
                />
                <span className="text-pretty">{t(key)}</span>
              </li>
            ))}
          </ul>
          {/* la stack en clair, façon « sous le capot » M3 — le recruteur tech est servi */}
          <p className="mt-5 border-t border-hairline pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
            {t('para2Stack')}
          </p>
        </>
      }
      gallery={
        <>
          {FIGURES.map((fig) => (
            <div key={fig.slot} className={`elloha-fig ${fig.slot} ${fig.span}`}>
              <ImageLightbox src={fig.src} label={t('zoom')} alt={t(fig.altKey)}>
                <div
                  className={`relative ${fig.ratio} overflow-hidden rounded-md border border-hairline bg-surface shadow-lg shadow-ink/15`}
                >
                  <Image
                    src={fig.src}
                    alt={t(fig.altKey)}
                    fill
                    sizes={fig.sizes}
                    // eager : les vignettes partent hors viewport et dérivent vite (pas de pop-in)
                    loading="eager"
                    className="object-cover"
                  />
                  {/* voile terracotta discret — accorde les captures au papier (comme M3) */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-accent/8 mix-blend-multiply"
                  />
                </div>
              </ImageLightbox>
            </div>
          ))}
          {/* Slot 5 — la carte avis ferme la bande (logo + preuve sociale) */}
          <div className="elloha-fig elloha-fig-5 col-span-2">
            <div className="flex aspect-3/2 flex-col items-center justify-center gap-2.5 rounded-md border border-hairline bg-surface p-5 shadow-lg shadow-ink/15">
              <Image
                src="/elloha/elloha-logo.png"
                alt={t('logoAlt')}
                width={96}
                height={118}
                className="h-auto w-[clamp(44px,4vw,64px)]"
              />
              <p className="font-display text-[clamp(1.3rem,1.7vw,1.8rem)] leading-none text-ink">
                {t('reviewsScore')}{' '}
                <span aria-hidden className="text-accent">
                  ★★★★★
                </span>
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                {t('reviewsCount')}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                {t('reviewsTrustpilot')}
              </p>
            </div>
          </div>
        </>
      }
    />
  )
}
