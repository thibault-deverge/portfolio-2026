'use client'

import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { cn } from '@/lib/utils'

/**
 * Vignette cliquable → capture affichée en grand dans une surcouche plein écran.
 * Fermeture : clic n'importe où ou Échap. Le scroll Lenis est suspendu pendant l'ouverture.
 */
export function ImageLightbox({
  src,
  label,
  className,
  wipe = false,
  children,
}: {
  src: string
  label: string
  className?: string
  /** Marque la vignette pour le wipe reveal du RevealGroup parent. */
  wipe?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    if (!open) return
    // 1. Geler le scroll tant que la surcouche est ouverte
    lenis?.stop()
    // 2. Fermer à l'Échap
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lenis?.start()
    }
  }, [open, lenis])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={label}
        className={cn('block w-full cursor-zoom-in text-left', className)}
        data-cursor="link"
        data-reveal-wipe={wipe ? '' : undefined}
      >
        {children}
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-85 flex cursor-zoom-out items-center justify-center bg-ink/85 p-[clamp(16px,4vw,56px)] backdrop-blur-sm"
        >
          {/* pleine résolution : le fichier source, sans passer par l'optimiseur */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="max-h-full max-w-full rounded-md shadow-2xl" />
        </div>
      )}
    </>
  )
}
