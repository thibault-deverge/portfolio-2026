import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

/** 404 — le fil se dessine, s'interrompt sur un nœud, et invite à reprendre le parcours. */
export default async function NotFound() {
  const t = await getTranslations('NotFound')

  return (
    // id="main" : cible du skip-link du layout (sinon il pointe dans le vide sur la 404)
    <main id="main" className="grid min-h-dvh place-items-center bg-paper text-ink">
      <div className="px-6 text-center">
        {/* ---- Le fil interrompu ---- */}
        <div className="mx-auto flex w-fit items-center" aria-hidden>
          <span className="nf-thread-line h-px w-24 bg-accent sm:w-36" />
          <span className="nf-thread-node size-3 rounded-full bg-accent ring-4 ring-paper" />
        </div>

        {/* ---- Message ---- */}
        <div className="nf-copy">
          <p className="mt-10 font-mono text-xs tracking-[0.2em] text-accent-deep">
            {t('code')}
          </p>
          <h1 className="mt-4 font-display text-4xl italic sm:text-5xl">{t('title')}</h1>
          <p className="mt-4 text-ink-muted">{t('body')}</p>
          <Link
            href="/"
            className="mt-10 inline-block font-mono text-sm underline decoration-hairline underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
          >
            {t('cta')} →
          </Link>
        </div>
      </div>
    </main>
  )
}
