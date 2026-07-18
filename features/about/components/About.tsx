import { getTranslations } from 'next-intl/server'

/**
 * Scène 01 — À propos : bio (numéro, titre 2 lignes, body) + portrait 3/4.
 * Statique pour l'instant : reveals (C), parallax (D), copy et portrait définitifs (E).
 */
export async function About() {
  const t = await getTranslations('About')

  return (
    <section
      id="apropos"
      className="relative px-6 py-[clamp(80px,16vh,200px)] sm:px-10 lg:px-14"
    >
      <div className="mx-auto grid w-full max-w-310 gap-[clamp(32px,6vw,96px)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
        {/* Colonne bio : numéro, titre, body */}
        <div>
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {t('num')}
          </p>
          <h2 className="mb-7 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-normal leading-none tracking-tight text-ink [font-optical-sizing:auto]">
            <span className="block">{t('title1')}</span>
            <span className="block italic text-ink-muted">{t('title2')}</span>
          </h2>
          <p className="max-w-[52ch] text-pretty text-[clamp(1.02rem,1.35vw,1.2rem)] leading-[1.75] text-ink-muted">
            {t('body')}
          </p>
        </div>

        {/* Colonne portrait : cadre 3/4, placeholder soigné (E2), vraie photo plus tard */}
        <div aria-hidden className="relative" data-cursor="link">
          <div className="relative aspect-3/4 overflow-hidden rounded-md border border-hairline bg-surface">
            <div className="blueprint-grid absolute inset-0" />
          </div>
        </div>
      </div>
    </section>
  )
}
