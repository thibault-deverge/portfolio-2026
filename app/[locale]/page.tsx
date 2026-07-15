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
      {/* TEMP (M1-A1) : piste de scroll pour calibrer dérive/header — à retirer
          dès que les vraies scènes arrivent. Purement décoratif, aucun texte. */}
      <div aria-hidden className="mx-auto max-w-310 space-y-24 px-6 py-32 sm:px-10 lg:px-14">
        <div className="h-[60vh] rounded-md border border-hairline bg-surface" />
        <div className="ml-[20%] h-[60vh] rounded-md border border-hairline bg-surface" />
        <div className="h-[60vh] rounded-md border border-hairline bg-surface" />
      </div>
    </main>
  )
}
