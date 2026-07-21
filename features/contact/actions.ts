'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { siteConfig } from '@/lib/config/site'

// ===== État retourné au client (des CLÉS i18n, jamais du texte) =====

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; errorKey: 'invalid' | 'tooFast' | 'rateLimited' | 'server' }

// ===== Gardes =====

/** Un humain met plus de 3 s à écrire un message ; un bot non. */
const MIN_FILL_TIME_MS = 3000
/** 3 envois par IP par fenêtre de 10 min — best-effort par instance serverless
    (le plafond Resend de 100 emails/jour reste le filet ultime). */
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const MESSAGE_MIN = 10
const MESSAGE_MAX = 2000
const EMAIL_MAX = 254
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const hitsByIp = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (hitsByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  hitsByIp.set(ip, [...recent, now])
  return recent.length >= RATE_LIMIT_MAX
}

// ===== Action =====

/** Envoie le message du formulaire de contact vers l'email du site (Resend). */
export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // 1. Honeypot : un bot l'a rempli → faux succès, sans envoi (ne pas l'éduquer)
  if (formData.get('website')) return { status: 'success' }

  // 2. Time-trap : posé post-hydratation côté client — absent (bot sans JS) ou
  //    soumis trop vite → rejet
  const startedAt = Number(formData.get('startedAt'))
  if (!startedAt || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return { status: 'error', errorKey: 'tooFast' }
  }

  // 3. Validation (l'email est nettoyé des sauts de ligne — anti header-injection)
  const email = String(formData.get('email') ?? '')
    .trim()
    .replace(/[\r\n]/g, '')
  const message = String(formData.get('message') ?? '').trim()
  if (!EMAIL_RE.test(email) || email.length > EMAIL_MAX) {
    return { status: 'error', errorKey: 'invalid' }
  }
  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
    return { status: 'error', errorKey: 'invalid' }
  }

  // 4. Rate limit par IP
  const forwarded = (await headers()).get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) return { status: 'error', errorKey: 'rateLimited' }

  // 5. Envoi — free tier Resend : from imposé, to = l'email du compte ; le visiteur
  //    est en replyTo pour qu'une réponse parte d'un simple « Répondre »
  if (!process.env.RESEND_API_KEY) return { status: 'error', errorKey: 'server' }
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: siteConfig.email,
    replyTo: email,
    subject: `[Portfolio] Message de ${email}`,
    text: message,
  })
  if (error) return { status: 'error', errorKey: 'server' }
  return { status: 'success' }
}
