import { z } from 'zod'

// Schéma du formulaire de contact.
// PHASE 2 : à câbler sur une server action (Resend) + react-hook-form côté client.
export const contactSchema = z.object({
  name: z.string().min(2, 'Nom trop court'),
  email: z.email('Email invalide'),
  message: z.string().min(10, 'Message trop court').max(2000, 'Message trop long'),
  // Honeypot anti-spam : champ caché qui doit rester vide.
  company: z.string().max(0).optional(),
})
