'use client'

import { useEffect } from 'react'
import { useLenis } from 'lenis/react'

const SAFETY_UNLOCK_MS = 4000

/**
 * Verrouille le scroll pendant l'arrivée (preloader → levée du voile).
 * Sans JS ou en reduced-motion : aucun verrou, position restaurée respectée.
 */
export function IntroLock() {
  const lenis = useLenis()

  useEffect(() => {
    // 1. Garde-fous : reduced-motion, ou voile déjà parti (hydratation tardive)
    if (!lenis) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const loader = document.querySelector<HTMLElement>('.hero-loader')
    if (!loader || getComputedStyle(loader).visibility === 'hidden') return

    // 2. Revenir en haut (reload scrollé : le voile se lève toujours sur le hero)
    //    puis verrouiller — `force` : agit même Lenis stoppé
    lenis.scrollTo(0, { immediate: true, force: true })
    lenis.stop()
    document.documentElement.classList.add('intro-lock') // bloque aussi clavier/scrollbar

    // 3. Libérer à la fin de la levée (filet si l'événement n'arrive jamais)
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
