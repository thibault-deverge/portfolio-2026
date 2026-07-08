import { setRequestLocale } from 'next-intl/server'
import { Hero } from '@/features/hero'
import { ChapterElloha, ChapterFondations, ChapterNpEvolution } from '@/features/journey'
import { ContactSection } from '@/features/contact'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="relative bg-paper text-ink">
      <Hero />
      <ChapterFondations />
      <ChapterNpEvolution />
      <ChapterElloha />
      <ContactSection />
    </main>
  )
}
