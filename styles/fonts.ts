import { Fraunces, Geist, Geist_Mono } from 'next/font/google'

// ================================
// ==          Fonts             ==
// ================================

// Display / éditorial (titres, le récit)
export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

// Texte / UI
export const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

// Mono (labels techniques, ⌘K, chiffres)
export const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})
