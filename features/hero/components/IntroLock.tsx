'use client'

import { useEffect } from 'react'
import { useLenis } from 'lenis/react'

const SAFETY_UNLOCK_MS = 4000

/**
 * Verrouille le scroll pendant l'arrivée (preloader → levée du voile), le
 * libère à l'animationend de la levée. Sans JS ou en reduced-motion : aucun
 * verrou. Filet de sécurité si l'événement n'arrive jamais.
 */
export function IntroLock() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const loader = document.querySelector<HTMLElement>('.hero-loader')
    // hydratation tardive : si le voile est déjà parti, ne rien verrouiller
    if (!loader || getComputedStyle(loader).visibility === 'hidden') return

    lenis.stop()
    document.documentElement.classList.add('intro-lock') // bloque aussi clavier/scrollbar

    let unlocked = false
    const unlock = () => {
      if (unlocked) return
      unlocked = true
      lenis.start()
      document.documentElement.classList.remove('intro-lock')
    }
    const onEnd = (e: AnimationEvent) => {
      if (e.animationName === 'hero-loader-lift') unlock()
    }

    loader.addEventListener('animationend', onEnd)
    const safety = setTimeout(unlock, SAFETY_UNLOCK_MS)
    return () => {
      loader.removeEventListener('animationend', onEnd)
      clearTimeout(safety)
      unlock()
    }
  }, [lenis])

  return null
}
