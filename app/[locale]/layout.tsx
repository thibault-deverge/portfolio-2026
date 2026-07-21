import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { siteConfig } from '@/lib/config/site'
import { fraunces, geistSans, geistMono } from '@/styles/fonts'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { Header } from '@/components/layout/Header'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { CommandPalette } from '@/components/palette/CommandPalette'
import '../globals.css'

// Barre du navigateur assortie au papier.
export const viewport: Viewport = {
  themeColor: '#f5f1ea',
}

// Métadonnées localisées : onglet, partage (OG/Twitter), canonical + hreflang.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  // localePrefix 'as-needed' : fr à la racine, en préfixé
  const path = locale === 'fr' ? '/' : '/en'
  return {
    metadataBase: new URL(siteConfig.url),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: path,
      languages: { fr: '/', en: '/en' },
    },
    openGraph: {
      type: 'website',
      url: path,
      siteName: siteConfig.name,
      title: t('title'),
      description: t('description'),
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: t('title') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og.png'],
    },
  }
}

// Pré-rend les deux locales en statique au build.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  // Active le rendu statique pour cette locale.
  setRequestLocale(locale)
  const messages = await getMessages()
  const tA11y = await getTranslations('A11y')

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased">
        {/* Skip-link : invisible sauf au focus clavier (Tab dès l'arrivée) */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.12em] focus:text-paper"
        >
          {tA11y('skipLink')}
        </a>
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <CustomCursor />
            <Header />
            <CommandPalette />
            {children}
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
