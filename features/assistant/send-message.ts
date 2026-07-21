import { Resend } from 'resend'
import { siteConfig } from '@/lib/config/site'
import { checkSendBudget } from './guards'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMAIL_MAX = 254
const MESSAGE_MIN = 5
const MESSAGE_MAX = 2000

/**
 * Exécute l'outil send_message du bot : valide, plafonne, envoie via Resend.
 * Le retour est une phrase POUR LE BOT (le tool_result), qui lui dit quoi faire ensuite —
 * jamais montrée telle quelle au visiteur.
 */
export async function sendVisitorMessage(rawInput: unknown): Promise<string> {
  const input = (rawInput ?? {}) as Record<string, unknown>
  const email =
    typeof input.visitor_email === 'string'
      ? input.visitor_email.trim().replace(/[\r\n]/g, '')
      : ''
  const message = typeof input.message === 'string' ? input.message.trim() : ''

  if (!EMAIL_RE.test(email) || email.length > EMAIL_MAX) {
    return "Échec : l'email du visiteur est invalide. Demande-lui de le vérifier."
  }
  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
    return 'Échec : message vide ou trop long (2000 caractères max). Demande-lui de le reformuler.'
  }

  const sends = await checkSendBudget()
  if (!sends.ok) {
    return `Échec : le quota d'envois du jour est atteint. Invite le visiteur à écrire directement à ${siteConfig.email}.`
  }
  if (!process.env.RESEND_API_KEY) {
    return `Échec technique. Invite le visiteur à écrire directement à ${siteConfig.email}.`
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: siteConfig.email,
    replyTo: email,
    subject: `[Portfolio] Message via l'assistant — ${email}`,
    text: `${message}\n\n—\nTransmis par l'assistant du portfolio. Répondre = répondre à ${email}.`,
  })
  if (error) {
    return `Échec technique de l'envoi. Invite le visiteur à écrire directement à ${siteConfig.email}.`
  }
  return `Message transmis avec succès. Confirme sobrement au visiteur que Thibault le recontactera à ${email}.`
}
