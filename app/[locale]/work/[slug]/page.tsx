import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { workProjects, workSlugs, type WorkSlug } from '@/features/work/lib/content'

// Pré-génère locale × slug en statique ; tout autre slug → 404.
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => workSlugs.map((slug) => ({ locale, slug })))
}

// Desactive le rendu dynamique pour les slugs non listés dans workSlugs.
export const dynamicParams = false

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  if (!(slug in workProjects)) notFound()
  const { default: Content } =
    await workProjects[slug as WorkSlug][locale as 'fr' | 'en']()

  return (
    <main className="min-h-dvh bg-paper text-ink">
      <article className="mx-auto max-w-2xl px-6 py-24">
        <Content />
      </article>
    </main>
  )
}
