import { getTranslations } from 'next-intl/server'
import { FilNode } from '@/components/fil/FilNode'
import { BrowserFrame } from './BrowserFrame'

/**
 * Scène 02 — NP-Evolution : header éclaté (numéro + titre / tag), fenêtre média 16/9,
 * body + stat. Statique pour l'instant : wipe et reveals (C), captures réelles (D), copy (E).
 */
export async function NpEvolution() {
  const t = await getTranslations('NpEvolution')

  return (
    <section
      id="np-evolution"
      className="relative px-6 py-[clamp(80px,16vh,200px)] sm:px-10 lg:px-14"
    >
      <div className="mx-auto w-full max-w-310">
        {/* Header éclaté : numéro + titre à gauche, tag à droite (calé sur la base) */}
        <div className="mb-[clamp(30px,5vh,52px)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t('num')}
            </p>
            <h2 className="font-display text-[clamp(2.6rem,7vw,5.4rem)] font-normal leading-[0.95] tracking-tight text-ink [font-optical-sizing:auto]">
              {t.rich('title', {
                accent: (chunks) => <span className="italic text-accent">{chunks}</span>,
              })}
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
            {t('tag')}
          </p>
        </div>

        {/* Fenêtre média : placeholder grille en attendant les captures (D1) */}
        <div className="relative" data-cursor="link">
          <BrowserFrame>
            <div className="absolute inset-0 bg-[linear-gradient(var(--color-hairline)_1px,transparent_1px),linear-gradient(90deg,var(--color-hairline)_1px,transparent_1px)] bg-size-[46px_46px] mask-[radial-gradient(ellipse_75%_85%_at_50%_50%,#000_30%,transparent_100%)]" />
            <span className="absolute bottom-3.5 left-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              {t('badge')}
            </span>
          </BrowserFrame>
          {/* le nœud épingle la fenêtre — ancre du fil rouge (M9), à gauche pour le zigzag */}
          <FilNode className="absolute -left-1.5 -top-1.5" />
        </div>

        {/* Body + stat produit */}
        <div className="mt-[clamp(32px,5vh,56px)] grid gap-[clamp(28px,5vw,72px)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
          <p className="max-w-[54ch] text-pretty text-[clamp(1.02rem,1.35vw,1.2rem)] leading-[1.7] text-ink-muted">
            {t('body')}
          </p>
          <div>
            <div className="font-display text-[clamp(2.6rem,4.5vw,3.6rem)] font-normal leading-none tracking-tight text-accent">
              {t('statValue')}
            </div>
            <p className="mt-2.5 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
              {t('statLabel')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
