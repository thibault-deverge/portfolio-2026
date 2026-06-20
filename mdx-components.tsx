import type { MDXComponents } from 'mdx/types'

// Requis par @next/mdx (à la racine) : mappe les éléments MDX vers nos styles.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => (
      <h1 className="font-display text-4xl font-medium tracking-tight" {...props} />
    ),
    h2: (props) => <h2 className="mt-10 font-display text-2xl font-medium" {...props} />,
    p: (props) => <p className="mt-4 leading-relaxed text-ink-muted" {...props} />,
    a: (props) => <a className="text-accent underline underline-offset-2" {...props} />,
    ul: (props) => (
      <ul className="mt-4 list-disc space-y-1 pl-5 text-ink-muted" {...props} />
    ),
    code: (props) => (
      <code className="rounded bg-surface px-1 py-0.5 font-mono text-sm" {...props} />
    ),
  }
}
