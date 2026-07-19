'use client'

import { useEffect, useRef } from 'react'

// Le template déclenche à « top 82% » (-18%) ; trop tôt chez nous — l'animation
// était finie avant la fin du geste de scroll. -30% : on voit le début du reveal.
const IO_BOTTOM_MARGIN = '-30%'
const ALREADY_VISIBLE_RATIO = 0.92

/** Enveloppe chaque mot des nœuds texte dans un span .reveal-word (--word-i croissant). */
function wrapWords(el: HTMLElement) {
  if (el.dataset.wordsReady) return
  el.dataset.wordsReady = ''
  let wordIndex = 0
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = (node.textContent ?? '').split(/(\s+)/)
      if (parts.filter((p) => p.trim()).length === 0) return
      const frag = document.createDocumentFragment()
      for (const part of parts) {
        if (!part) continue
        if (!part.trim()) {
          frag.append(part)
        } else {
          const span = document.createElement('span')
          span.className = 'reveal-word inline-block'
          span.style.setProperty('--word-i', String(wordIndex++))
          span.textContent = part
          frag.append(span)
        }
      }
      node.parentNode?.replaceChild(frag, node)
    } else {
      // copie : la liste vivante change pendant le remplacement
      Array.from(node.childNodes).forEach(walk)
    }
  }
  walk(el)
}

/**
 * Révèle ses descendants marqués à l'entrée dans le viewport (stagger 90ms) :
 * `data-reveal` (rise sous masque), `data-reveal-wipe[="left|right|up"]` (médias),
 * `data-reveal-words` (mots en blur-in). SSR-safe : classes posées post-hydratation.
 */
export function RevealGroup({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 1. Garde-fous : reduced-motion → on ne cache rien
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // 2. Préparer : cacher chaque élément selon son type et lui donner son rang de stagger
    const items = Array.from(
      root.querySelectorAll<HTMLElement>(
        '[data-reveal], [data-reveal-wipe], [data-reveal-words]',
      ),
    )
    if (items.length === 0) return
    const kind = (el: HTMLElement) =>
      el.hasAttribute('data-reveal-wipe')
        ? 'wipe'
        : el.hasAttribute('data-reveal-words')
          ? 'words'
          : 'rise'
    items.forEach((el, i) => {
      el.style.setProperty('--reveal-i', String(i))
      const k = kind(el)
      if (k === 'wipe') {
        el.classList.add('reveal-pending-wipe')
        const direction = el.getAttribute('data-reveal-wipe')
        if (direction) el.classList.add(`reveal-pending-wipe--${direction}`)
      } else if (k === 'words') {
        wrapWords(el)
        el.classList.add('reveal-pending-words')
      } else {
        el.classList.add('reveal-pending')
      }
    })
    const IN_CLASS = {
      rise: 'reveal-in',
      wipe: 'reveal-in-wipe',
      words: 'reveal-in-words',
    } as const
    const reveal = () => items.forEach((el) => el.classList.add(IN_CLASS[kind(el)]))

    // 3. Groupe déjà à l'écran → révéler tout de suite (un trigger déjà dépassé ne tirerait jamais)
    if (root.getBoundingClientRect().top < window.innerHeight * ALREADY_VISIBLE_RATIO) {
      root.classList.add('reveal-now')
      requestAnimationFrame(reveal)
      return
    }

    // 4. Sinon : attendre l'entrée dans le viewport, révéler une seule fois
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal()
          io.disconnect()
        }
      },
      { rootMargin: `0px 0px ${IO_BOTTOM_MARGIN} 0px` },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
