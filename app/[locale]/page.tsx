import { setRequestLocale } from 'next-intl/server'
import { About } from '@/features/about'
import { Elloha } from '@/features/elloha'
import { Hero } from '@/features/hero'
import { Manifeste } from '@/features/manifeste'
import { NpEvolution } from '@/features/np-evolution'
import { Projets } from '@/features/projets'

// La page se remplit scène par scène : hero (M1), à propos (M2), NP-Evolution (M3)…
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="relative bg-paper text-ink">
      <Hero />
      <About />
      <NpEvolution />
      <Elloha />
      <Manifeste />
      <Projets />
    </main>
  )
}
