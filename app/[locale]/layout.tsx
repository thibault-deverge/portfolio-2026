import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { fraunces, geistSans, geistMono } from '@/styles/fonts'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { Header } from '@/components/layout/Header'
import { CustomCursor } from '@/components/layout/CustomCursor'
import '../globals.css'

// Métadonnées localisées (titre d'onglet + description) par locale.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return { title: t('title'), description: t('description') }
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

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <CustomCursor />
            <Header />
            {children}
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
