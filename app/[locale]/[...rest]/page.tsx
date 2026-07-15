import { notFound } from 'next/navigation'

/** Catch-all : toute URL sans route réelle déclenche la 404 du segment [locale]. */
export default function CatchAllPage() {
  notFound()
}
