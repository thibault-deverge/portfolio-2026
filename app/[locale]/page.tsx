import { setRequestLocale } from 'next-intl/server'
import { Hero } from '@/features/hero'
import { JourneySection } from '@/features/journey'
import { WorkSection } from '@/features/work'
import { ContactSection } from '@/features/contact'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="bg-paper text-ink">
      <Hero />
      <JourneySection />
      <WorkSection />
      <ContactSection />
    </main>
  )
}
