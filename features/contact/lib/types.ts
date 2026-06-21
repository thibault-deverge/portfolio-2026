import type { z } from 'zod'
import type { contactSchema } from './schemas'

export type ContactInput = z.infer<typeof contactSchema>
