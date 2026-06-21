import { getTranslations, setRequestLocale } from 'next-intl/server'
import { JourneySection } from '@/features/journey'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  // Requis dans la page (pas seulement le layout) pour autoriser le rendu statique.
  setRequestLocale(locale)
  const t = await getTranslations('Home')

  return (
    <main className="min-h-dvh bg-paper text-ink">
      <section className="mx-auto max-w-2xl px-6 py-24">
        <p className="font-mono text-sm text-ink-muted">{t('tagline')}</p>
        <h1 className="mt-4 font-display text-5xl font-medium tracking-tight">
          {t.rich('title', {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </h1>
        <p className="mt-4 max-w-prose text-ink-muted">{t('subtitle')}</p>
        <p className="mt-6 font-mono text-xs text-accent">{t('locale')}</p>
        <div className="mt-8 flex gap-3">
          <span className="size-10 rounded-md border border-hairline bg-paper" />
          <span className="size-10 rounded-md border border-hairline bg-surface" />
          <span className="size-10 rounded-md border border-hairline bg-ink" />
          <span className="size-10 rounded-md border border-hairline bg-accent" />
        </div>
      </section>

      <JourneySection />
    </main>
  )
}
