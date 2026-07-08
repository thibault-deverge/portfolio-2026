import { getTranslations } from 'next-intl/server'
import { ChapterHeader } from './ChapterHeader'

/** Chapitre 01 — Fondations : droit, Asie, École 42 (layout complet au module M3). */
export async function ChapterFondations() {
  const t = await getTranslations('Journey')

  return (
    <section id="fondations" className="pb-24 pt-26">
      <div className="mx-auto w-full max-w-310 px-6 sm:px-10 lg:px-14">
        <ChapterHeader label={t('fondations.label')} meta={t('fondations.meta')} />

        <h2 className="mt-9 max-w-[26ch] font-display text-[clamp(1.7rem,2.8vw,2.5rem)] font-medium leading-[1.1] tracking-tight text-ink">
          {t.rich('fondations.title', { i: (chunks) => <em>{chunks}</em> })}
        </h2>
        <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-muted">
          {t('fondations.intro')}
        </p>
      </div>
    </section>
  )
}
