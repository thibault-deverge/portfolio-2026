'use client'

import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLenis } from 'lenis/react'
import { useLocale, useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

// ===== Contrat =====

/** Événement global d'ouverture (dispatché par le bouton du Header). */
export const PALETTE_OPEN_EVENT = 'palette:open'

/** 6 derniers échanges renvoyés à l'API (retronqués côté serveur de toute façon). */
const HISTORY_SENT_MAX = 12

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const ERROR_KEYS = ['rateLimited', 'quota', 'invalid', 'server'] as const
type ErrorKey = (typeof ERROR_KEYS)[number]
type PaletteStatus = 'idle' | 'streaming' | ErrorKey

const ERROR_MESSAGE_KEY: Record<ErrorKey, string> = {
  rateLimited: 'errorRateLimited',
  quota: 'errorQuota',
  invalid: 'errorInvalid',
  server: 'errorServer',
}

function isErrorKey(v: unknown): v is ErrorKey {
  return typeof v === 'string' && (ERROR_KEYS as readonly string[]).includes(v)
}

// ===== Liens cliquables dans les réponses (le bot donne Calendly, email…) =====

const LINK_SPLIT_RE = /(https?:\/\/\S+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g
const URL_TEST = /^https?:\/\//
const EMAIL_TEST = /^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/
const TRAILING_PUNCT_RE = /^(.*?)([.,;:!?)»]*)$/
const LINK_CLASSES =
  'underline decoration-accent/60 underline-offset-2 transition-colors duration-200 hover:text-accent'

/** Texte brut du bot → nœuds React avec URLs et emails cliquables. */
function renderAssistantText(text: string) {
  return text.split(LINK_SPLIT_RE).map((part, i) => {
    if (URL_TEST.test(part)) {
      // la ponctuation collée en fin d'URL reste du texte
      const [, url, rest] = TRAILING_PUNCT_RE.exec(part) ?? [part, part, '']
      return (
        <Fragment key={i}>
          <a href={url} target="_blank" rel="noreferrer" className={LINK_CLASSES}>
            {url}
          </a>
          {rest}
        </Fragment>
      )
    }
    if (EMAIL_TEST.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} className={LINK_CLASSES}>
          {part}
        </a>
      )
    }
    return part
  })
}

/**
 * Palette ⌘K : Q&A sur le profil, streamé depuis /api/assistant.
 * Fermée par défaut des deux côtés (SSR-safe) — ne rend rien tant qu'elle est fermée.
 */
export function CommandPalette() {
  const t = useTranslations('Palette')
  const locale = useLocale() === 'en' ? 'en' : 'fr'
  const lenis = useLenis()

  //#region ---- State ----
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<PaletteStatus>('idle')

  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  //#endregion

  //#region ---- Ouverture / fermeture ----
  // Raccourci ⌘K / Ctrl+K + événement du bouton header — posés post-hydratation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    const onOpenEvent = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(PALETTE_OPEN_EVENT, onOpenEvent)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(PALETTE_OPEN_EVENT, onOpenEvent)
    }
  }, [])

  // Ouverte : scroll gelé, focus dans l'input, Escape ferme ; tout est restauré après
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    lenis?.stop()
    inputRef.current?.focus()
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onEsc)
    return () => {
      window.removeEventListener('keydown', onEsc)
      abortRef.current?.abort()
      lenis?.start()
      previouslyFocused?.focus()
      setStatus('idle')
      // une bulle restée vide (réponse annulée avant le 1er mot) part avec sa question
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        return last?.role === 'assistant' && last.content === '' ? prev.slice(0, -2) : prev
      })
    }
  }, [open, lenis])

  // Focus-trap minimal : Tab boucle dans le panneau (dialog modal)
  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'button:not(:disabled), input:not(:disabled)',
    )
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
  //#endregion

  //#region ---- Envoi & streaming ----
  const ask = useCallback(
    async (raw: string) => {
      const question = raw.trim()
      if (!question || status === 'streaming') return
      const history = messages.slice(-HISTORY_SENT_MAX)
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: question },
        { role: 'assistant', content: '' },
      ])
      setInput('')
      setStatus('streaming')

      const controller = new AbortController()
      abortRef.current = controller
      try {
        const res = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question, history, locale }),
          signal: controller.signal,
        })
        if (!res.ok || !res.body) {
          const data = (await res.json().catch(() => null)) as { errorKey?: string } | null
          setMessages((prev) => prev.slice(0, -2))
          setStatus(isErrorKey(data?.errorKey) ? data.errorKey : 'server')
          return
        }
        // Le stream est du texte brut : on lit les chunks, on les colle au dernier message
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          setMessages((prev) => {
            const next = [...prev]
            const last = next[next.length - 1]
            next[next.length - 1] = { ...last, content: last.content + chunk }
            return next
          })
        }
        setStatus('idle')
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        setMessages((prev) => prev.slice(0, -2))
        setStatus('server')
      }
    },
    [messages, status, locale],
  )

  // Le fil de messages suit la réponse qui s'écrit
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])
  //#endregion

  //#region ---- Render ----
  if (!open) return null

  const streaming = status === 'streaming'
  const errorKey = isErrorKey(status) ? status : null

  return createPortal(
    <div
      className="fixed inset-0 z-90 flex items-start justify-center bg-ink/25 px-4 pt-[12vh] backdrop-blur-[2px] sm:pt-[16vh]"
      onClick={() => setOpen(false)}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('title')}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onPanelKeyDown}
        className="palette-panel w-full max-w-135 overflow-hidden rounded-xl border border-hairline bg-paper shadow-[0_24px_80px_-24px_rgba(26,26,24,0.35)]"
      >
        {/* ---- Bandeau titre ---- */}
        <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
            {t('title')}
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] uppercase text-ink-muted transition-colors duration-200 hover:text-ink"
          >
            esc<span className="sr-only"> — {t('close')}</span>
          </button>
        </div>

        {/* ---- Fil de la conversation ---- */}
        {messages.length > 0 && (
          <div ref={scrollRef} className="max-h-[45vh] space-y-4 overflow-y-auto px-5 py-4">
            {messages.map((m, i) => (
              <div key={i}>
                {m.role === 'user' ? (
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
                    {m.content}
                  </p>
                ) : (
                  <p className="mt-1 text-sm leading-relaxed whitespace-pre-line text-ink">
                    {renderAssistantText(m.content)}
                    {streaming && i === messages.length - 1 && (
                      <span
                        aria-hidden
                        className="palette-dot ml-1.5 inline-block size-2 rounded-full bg-accent align-middle"
                      />
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ---- Questions suggérées (avant le premier échange) ---- */}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 px-5 py-4">
            {(['suggested1', 'suggested2', 'suggested3', 'suggested4', 'suggested5'] as const).map(
              (key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => ask(t(key))}
                  className="rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-xs text-ink-muted transition-colors duration-200 hover:border-accent hover:text-ink"
                >
                  {t(key)}
                </button>
              ),
            )}
          </div>
        )}

        {/* ---- Erreur ---- */}
        {errorKey && (
          <p role="alert" className="px-5 pb-2 text-sm text-accent">
            {t(ERROR_MESSAGE_KEY[errorKey])}
          </p>
        )}

        {/* ---- Saisie ---- */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            ask(input)
          }}
          className="flex items-center gap-3 border-t border-hairline px-5 py-3.5"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('placeholder')}
            maxLength={500}
            disabled={streaming}
            aria-label={t('placeholder')}
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted/60 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={streaming || input.trim().length === 0}
            className={cn(
              'shrink-0 rounded-full bg-ink px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-paper',
              'transition-colors duration-200 hover:bg-accent disabled:opacity-40 disabled:hover:bg-ink',
            )}
          >
            {t('send')}
          </button>
        </form>

        {/* ---- Disclaimer ---- */}
        <p className="border-t border-hairline bg-surface px-5 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted/80">
          {t('disclaimer')}
        </p>
      </div>
    </div>,
    document.body,
  )
  //#endregion
}
