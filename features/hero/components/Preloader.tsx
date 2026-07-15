import { cn } from '@/lib/utils'

// Les salutations retracent le parcours : France → Espagne/voyage → international → Vietnam.
const GREETINGS = ['Bonjour', 'Hola', 'Hello', 'Xin chào']

/**
 * Voile d'entrée : salutations signées du nœud terracotta sur grille filigrane
 * + grain papier, crop marks, puis levée à bord courbé. CSS pur (styles/hero.css)
 * — absent en reduced-motion, joue avant toute hydratation.
 */
export function Preloader() {
  const last = GREETINGS.length - 1

  return (
    <div
      aria-hidden
      className="hero-loader fixed inset-x-0 top-0 z-70 h-[112dvh] overflow-hidden bg-ink"
    >
      {/* ---- Matière : grille en chuchotement + grain papier ---- */}
      <div className="hero-loader-grid absolute inset-0" />
      <div className="hero-loader-grain absolute inset-0" />
      <div className="relative flex h-dvh items-center justify-center">
        {/* ---- Salutations empilées (une seule visible à la fois) ---- */}
        <span className="relative block h-[1.4em] w-full font-display text-3xl italic tracking-tight text-paper md:text-4xl">
          {GREETINGS.map((word, i) => (
            <span
              key={word}
              className={cn(
                'hero-loader-word absolute inset-0 text-center',
                i === last && 'hero-loader-word-last',
              )}
              style={{ animationDelay: `${0.1 + i * 0.5}s` }}
            >
              {word}
              <span className="ml-1.5 inline-block size-2 rounded-full bg-accent" />
            </span>
          ))}
        </span>

        {/* ---- Crop marks (planche technique) ---- */}
        <span className="absolute left-6 top-6 size-4 border-l border-t border-paper/25" />
        <span className="absolute right-6 top-6 size-4 border-r border-t border-paper/25" />
        <span className="absolute bottom-6 left-6 size-4 border-b border-l border-paper/25" />
        <span className="absolute bottom-6 right-6 size-4 border-b border-r border-paper/25" />
      </div>
    </div>
  )
}
