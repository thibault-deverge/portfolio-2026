import { cn } from '@/lib/utils'

/**
 * Ancre du fil rouge : nœud terracotta posé par les sections.
 * `data-fil-node` = contrat de mesure pour FilRouge (étape fil) — ordre document = ordre du fil.
 */
export function FilNode({ className }: { className?: string }) {
  return <span data-fil-node aria-hidden className={cn('fil-node', className)} />
}
