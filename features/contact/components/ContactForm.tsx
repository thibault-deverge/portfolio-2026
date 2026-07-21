'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { sendContactMessage, type ContactState } from '../actions'

const INITIAL_STATE: ContactState = { status: 'idle' }

const FIELD_CLASSES =
  'w-full rounded-md border border-hairline bg-surface px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-ink-muted/60'

/**
 * Repli discret sous le mailto : « écrivez-moi d'ici » déplie email + message.
 * Server action + useActionState (React 19) — un seul état discriminé, zéro boolean.
 */
export function ContactForm() {
  const t = useTranslations('ContactForm')
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(sendContactMessage, INITIAL_STATE)
  const startedAtRef = useRef<HTMLInputElement>(null)

  // Time-trap posé post-hydratation, à l'ouverture (SSR-safe : coquille vide identique)
  useEffect(() => {
    if (open && startedAtRef.current) {
      startedAtRef.current.value = String(Date.now())
    }
  }, [open])

  // Succès : le formulaire cède la place à une ligne « envoyé » (écho nœud)
  if (state.status === 'success') {
    return (
      <p className="mx-auto mt-7 flex items-center justify-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-ink">
        <span aria-hidden className="size-2 rounded-full bg-accent" />
        {t('success')}
      </p>
    )
  }

  return (
    <div className="mx-auto mt-7 w-full max-w-[440px]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted underline decoration-hairline underline-offset-4 transition-colors duration-200 hover:text-accent"
      >
        {t('toggle')}
      </button>

      {/* Repli en pur CSS (grid-rows 0fr→1fr) — pas de mesure JS, motion-reduce safe.
          `inert` quand fermé : rien n'est focusable dans le repli replié. */}
      <div
        inert={!open}
        className={cn(
          'grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <form action={formAction} className="mt-5 space-y-4 text-left">
            {/* Honeypot : hors écran (pas display:none — certains bots le détectent) */}
            <div aria-hidden className="absolute -left-[9999px] top-auto">
              <label>
                {'Website '}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <input ref={startedAtRef} type="hidden" name="startedAt" />

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted"
              >
                {t('emailLabel')}
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                maxLength={254}
                className={FIELD_CLASSES}
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted"
              >
                {t('messageLabel')}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                className={cn(FIELD_CLASSES, 'resize-y')}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-ink px-6 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors duration-200 hover:bg-accent disabled:opacity-60"
              >
                {isPending ? t('sending') : t('submit')}
              </button>
              {state.status === 'error' && (
                <p role="alert" className="text-right text-sm text-accent">
                  {t(
                    (
                      {
                        invalid: 'errorInvalid',
                        tooFast: 'errorTooFast',
                        rateLimited: 'errorRateLimited',
                        server: 'errorServer',
                      } as const
                    )[state.errorKey],
                  )}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
