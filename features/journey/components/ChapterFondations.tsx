import { getTranslations } from 'next-intl/server'
import { Plate } from '@/components/ui/Plate'
import { ChapterHeader } from './ChapterHeader'

/** Chapitre 01 — Fondations : droit, Asie, École 42 (layout complet au module M3). */
export async function ChapterFondations() {
  const t = await getTranslations('Journey')

  return (
    <section id="fondations" className="pb-24 pt-26">
      <div className="mx-auto w-full max-w-310 px-6 sm:px-10 lg:px-14">
        <ChapterHeader label={t('fondations.label')} meta={t('fondations.meta')} />

        <div className="mt-9 flex flex-wrap items-start gap-10 lg:gap-16">
          {/* Portrait en planche technique (image réelle à venir — cf. .design/images-todo.md). */}
          <Plate
            ratio="3/4"
            caption={t('fondations.portraitCaption')}
            className="w-[min(230px,60vw)] shrink-0"
          />

          <div className="min-w-[290px] flex-1 basis-[480px]">
            <h2 className="max-w-[26ch] font-display text-[clamp(1.7rem,2.8vw,2.5rem)] font-medium leading-[1.1] tracking-tight text-ink">
              {t.rich('fondations.title', { i: (chunks) => <em>{chunks}</em> })}
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-muted">
              {t('fondations.intro')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
