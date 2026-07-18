import { setRequestLocale } from 'next-intl/server'
import { About } from '@/features/about'
import { Hero } from '@/features/hero'

// La page se remplit scène par scène : hero (M1), à propos (M2), puis les suivantes.
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="relative bg-paper text-ink">
      <Hero />
      <About />
    </main>
  )
}
