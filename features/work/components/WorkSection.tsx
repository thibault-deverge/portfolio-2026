import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { workSlugs } from '../lib/content'

export async function WorkSection() {
  const t = await getTranslations('Work')

  return (
    <section id="work" className="mx-auto max-w-2xl px-6 py-32">
      <h2 className="font-display text-3xl font-medium">{t('title')}</h2>

      <ul className="mt-12">
        {workSlugs.map((slug) => (
          <li key={slug} className="border-t border-hairline">
            <Link
              href={`/work/${slug}`}
              className="group flex items-baseline justify-between gap-4 py-6"
            >
              <span className="font-display text-2xl capitalize">{slug}</span>
              <span className="font-mono text-sm text-accent group-hover:underline">
                {t('viewCaseStudy')} →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
