import { FilNode } from './FilNode'

/** En-tête de chapitre : eyebrow (nœud du fil + label) à gauche, annotation à droite. */
export function ChapterHeader({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
        <FilNode />
        {label}
      </p>
      <p className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
        {meta}
      </p>
    </div>
  )
}
