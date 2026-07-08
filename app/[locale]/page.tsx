import { setRequestLocale } from 'next-intl/server'
import { Hero } from '@/features/hero'

// Reconstruction « expérience d'abord » (branche feat/scroll-scenes) : la page
// se remplit scène par scène — hero validé, puis chapitres pinnés, galerie, contact.
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="relative bg-paper text-ink">
      <Hero />
    </main>
  )
}
