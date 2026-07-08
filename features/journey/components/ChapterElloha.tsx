import { getTranslations } from 'next-intl/server'
import { ChapterHeader } from './ChapterHeader'

/** Chapitre 03 — Elloha : le front-end à l'échelle (layout complet au module M5). */
export async function ChapterElloha() {
  const t = await getTranslations('Journey')

  return (
    <section id="elloha" className="border-t border-hairline pb-30 pt-26">
      <div className="mx-auto w-full max-w-310 px-6 sm:px-10 lg:px-14">
        <ChapterHeader label={t('elloha.label')} meta={t('elloha.meta')} />

        <h2 className="mt-7 max-w-[24ch] font-display text-[clamp(2rem,3.6vw,3.2rem)] font-medium leading-[1.05] tracking-tight text-ink">
          {t.rich('elloha.title', { i: (chunks) => <em>{chunks}</em> })}
        </h2>
        <p className="mt-4 max-w-[56ch] leading-relaxed text-ink-muted">{t('elloha.intro')}</p>
      </div>
    </section>
  )
}
