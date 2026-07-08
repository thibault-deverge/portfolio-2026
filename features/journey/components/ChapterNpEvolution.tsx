import { getTranslations } from 'next-intl/server'
import { ChapterHeader } from './ChapterHeader'

/** Chapitre 02 — NP-Evolution : le projet freelance livré seul (layout complet au module M4). */
export async function ChapterNpEvolution() {
  const t = await getTranslations('Journey')

  return (
    <section id="np-evolution" className="pb-30 pt-26">
      <div className="mx-auto w-full max-w-310 px-6 sm:px-10 lg:px-14">
        <ChapterHeader label={t('npe.label')} meta={t('npe.meta')} />

        <h2 className="mt-7 max-w-[24ch] font-display text-[clamp(2rem,3.6vw,3.2rem)] font-medium leading-[1.05] tracking-tight text-ink">
          {t.rich('npe.title', { i: (chunks) => <em>{chunks}</em> })}
        </h2>
        <p className="mt-4 max-w-[50ch] leading-relaxed text-ink-muted">{t('npe.intro')}</p>
      </div>
    </section>
  )
}
