import { siteConfig } from '@/lib/config/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-lg">{siteConfig.name}</p>

        <div className="flex gap-4 font-mono text-sm text-ink-muted">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="transition-colors hover:text-ink"
          >
            Email
          </a>
        </div>

        <p className="font-mono text-xs text-ink-muted">© {year}</p>
      </div>
    </footer>
  )
}
