import { getTranslations } from 'next-intl/server'
import { siteConfig } from '@/lib/config/site'

export async function ContactSection() {
  const t = await getTranslations('Contact')

  return (
    <section id="contact" className="border-t border-hairline">
      <div className="mx-auto max-w-2xl px-6 py-32">
        <h2 className="font-display text-3xl font-medium">{t('title')}</h2>
        <p className="mt-4 max-w-prose text-ink-muted">{t('text')}</p>

        {/* PHASE 2 : remplacer par le vrai formulaire (Resend) + prise de RDV Cal.com */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-8 inline-block border border-ink px-5 py-2.5 font-mono text-sm transition-colors hover:bg-ink hover:text-paper"
        >
          {t('cta')}
        </a>
      </div>
    </section>
  )
}
