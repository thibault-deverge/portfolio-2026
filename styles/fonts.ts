import { Fraunces, Geist, Geist_Mono } from 'next/font/google'

// ================================
// ==          Fonts             ==
// ================================

// Display / éditorial (titres, le récit). L'italique sert aux moments
// « signature » (le nom dans le header, futures citations éditoriales).
export const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
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
