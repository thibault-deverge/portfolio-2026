import { cn } from '@/lib/utils'

/**
 * Ancre de PASSAGE du fil rouge — invisible, aucune couture : elle guide le tracé
 * entre deux nœuds visibles (gouttières, coins de sortie). Comme les nœuds,
 * l'ordre document = l'ordre du fil.
 */
export function FilVia({ className }: { className?: string }) {
  return <span data-fil-via aria-hidden className={cn('inline-block size-0', className)} />
}
