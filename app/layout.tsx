import type { Metadata } from 'next'
import { fraunces, geistSans, geistMono } from '@/styles/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thibault Deverge — Développeur Next.js',
  description: 'Portfolio de Thibault Deverge, développeur front-end / Next.js end-to-end.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
