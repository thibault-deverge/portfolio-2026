import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// ===== Plafonds (validés 2026-07-21 — pire cas global ~6-8 $/mois) =====

/** Taille max d'une question visiteur (caractères). */
export const QUESTION_MAX_CHARS = 500
/** Historique renvoyé : 6 échanges max (12 messages — doublé 2026-07-22)… */
export const HISTORY_MAX_MESSAGES = 12
/** …chacun retronqué CÔTÉ SERVEUR (on ne fait pas confiance au client). */
export const HISTORY_MESSAGE_MAX_CHARS = 800

// 20 : assez pour une vraie conversation + le flux messager sans bloquer un visiteur
// sincère en plein échange (doublé 2026-07-22) — le budget global reste le plafond dur
const RATE_LIMIT_REQUESTS = 20
const RATE_LIMIT_WINDOW = '10 m'
const BUDGET_DAY_MAX = 150
const BUDGET_MONTH_MAX = 1000
/** Emails envoyés PAR le bot (outil send_message) — protège le quota Resend 100/j. */
const SENDS_DAY_MAX = 10

// ===== Redis partagé (fail-closed) =====

export type GuardResult =
  | { ok: true }
  | { ok: false; errorKey: 'rateLimited' | 'quota' | 'server'; status: number }

const GUARD_UNAVAILABLE: GuardResult = { ok: false, errorKey: 'server', status: 503 }

// Contrairement à la Map en mémoire du formulaire contact (vide à chaque instance
// serverless), l'état vit dans Redis : toutes les instances partagent les compteurs.
let redis: Redis | null = null
let ratelimit: Ratelimit | null = null

function getRedis(): Redis | null {
  // Le Marketplace Vercel injecte les noms historiques KV_* ; Upstash direct, UPSTASH_*
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  redis ??= new Redis({ url, token })
  return redis
}

/** Rate limit par IP : 20 questions / 10 min. Redis absent ou KO → refus (fail-closed). */
export async function checkRateLimit(ip: string): Promise<GuardResult> {
  const client = getRedis()
  if (!client) return GUARD_UNAVAILABLE
  try {
    ratelimit ??= new Ratelimit({
      redis: client,
      limiter: Ratelimit.slidingWindow(RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW),
      prefix: 'assistant:rl',
    })
    const { success } = await ratelimit.limit(ip)
    return success ? { ok: true } : { ok: false, errorKey: 'rateLimited', status: 429 }
  } catch {
    return GUARD_UNAVAILABLE
  }
}

/** Plafond des envois d'emails du bot : 10/jour, tous visiteurs confondus. */
export async function checkSendBudget(): Promise<GuardResult> {
  const client = getRedis()
  if (!client) return GUARD_UNAVAILABLE
  try {
    const dayKey = `assistant:sends:day:${new Date().toISOString().slice(0, 10)}`
    const count = await client.incr(dayKey)
    if (count === 1) await client.expire(dayKey, 60 * 60 * 48)
    if (count > SENDS_DAY_MAX) return { ok: false, errorKey: 'quota', status: 429 }
    return { ok: true }
  } catch {
    return GUARD_UNAVAILABLE
  }
}

/** Plafond GLOBAL jour + mois, tous visiteurs — le vrai plafond de dépense. */
export async function checkGlobalBudget(): Promise<GuardResult> {
  const client = getRedis()
  if (!client) return GUARD_UNAVAILABLE
  try {
    const now = new Date().toISOString()
    const dayKey = `assistant:budget:day:${now.slice(0, 10)}`
    const monthKey = `assistant:budget:month:${now.slice(0, 7)}`
    const [day, month] = await Promise.all([client.incr(dayKey), client.incr(monthKey)])
    // TTL posé au premier incrément seulement — la clé est datée, le TTL ne fait que nettoyer
    if (day === 1) await client.expire(dayKey, 60 * 60 * 48)
    if (month === 1) await client.expire(monthKey, 60 * 60 * 24 * 35)
    if (day > BUDGET_DAY_MAX || month > BUDGET_MONTH_MAX) {
      return { ok: false, errorKey: 'quota', status: 429 }
    }
    return { ok: true }
  } catch {
    return GUARD_UNAVAILABLE
  }
}
