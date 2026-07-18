/**
 * Fenêtre navigateur sobre : barre hairline à 3 points + contenu 16/9.
 * Dit « ceci est une vraie app » — et différencie la scène du cadre photo de M2.
 */
export function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-hairline bg-surface">
      {/* barre de fenêtre */}
      <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-2.5">
        <span className="size-2 rounded-full border border-hairline bg-paper" />
        <span className="size-2 rounded-full border border-hairline bg-paper" />
        <span className="size-2 rounded-full border border-hairline bg-paper" />
      </div>
      {/* contenu (capture, placeholder…) — le ratio est fourni par l'appelant */}
      <div className="relative">{children}</div>
    </div>
  )
}
