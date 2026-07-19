import { getTranslations } from 'next-intl/server'
import { FilNode } from '@/components/fil/FilNode'
import { FilVia } from '@/components/fil/FilVia'
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher'
import { RevealGroup } from '@/components/motion/RevealGroup'
import { ScrambleText } from '@/components/motion/ScrambleText'
import { siteConfig } from '@/lib/config/site'

/**
 * Scène 06 — Contact : la fin du fil. Connecteur qui se dessine (dernière ancre
 * data-fil-node), titre géant centré, mailto en clair, footer (© · liens · langue).
 */
export async function Contact() {
  const t = await getTranslations('Contact')
  const year = String(new Date().getFullYear())

  return (
    <section
      id="contact"
      className="relative px-6 pb-10 pt-14 text-center sm:px-10 lg:px-14 lg:pt-[clamp(60px,10vh,120px)]"
    >
      <div className="mx-auto w-full max-w-310">
        <RevealGroup>
          {/* Le fil atterrit : trait dégradé qui se dessine + pastille (8e ancre du fil) */}
          <span data-reveal aria-hidden className="contact-fil flex flex-col items-center">
            {/* via au sommet du connecteur : en desktop le FIL devient le trait
                (le connecteur statique reste pour mobile — lg:invisible garde l'espace) */}
            <FilVia />
            <span className="contact-thread block h-[clamp(64px,12vh,120px)] w-px bg-gradient-to-b from-accent/0 to-accent lg:invisible" />
            <span className="contact-ring grid size-[22px] place-items-center rounded-full border border-accent/50">
              <FilNode />
            </span>
          </span>
          <div className="mb-8 mt-[clamp(32px,5vh,56px)]">
            <ScrambleText
              text={t('num')}
              trigger="in-view"
              className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
            />
          </div>
          <h2 className="font-display text-[clamp(3rem,10vw,8rem)] font-normal leading-[0.92] tracking-[-0.03em] text-ink [font-optical-sizing:auto]">
            <span className="mb-[-0.1em] block overflow-hidden pb-[0.1em]">
              <span data-reveal className="block">
                {t('title1')}
              </span>
            </span>
            <span className="mb-[-0.1em] block overflow-hidden pb-[0.1em]">
              <span data-reveal className="block">
                {t.rich('title2', {
                  accent: (chunks) => (
                    <em className="font-medium italic text-accent">{chunks}</em>
                  ),
                })}
              </span>
            </span>
          </h2>
          <p className="mx-auto mt-[clamp(28px,5vh,48px)] max-w-[44ch] overflow-hidden text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.7]">
            <span data-reveal className="block text-pretty text-ink-muted">
              {t('body')}
            </span>
          </p>
          {/* L'email en clair, souligné du fil — première exposition de l'adresse */}
          <p className="mt-5 overflow-hidden pb-2">
            <a
              data-reveal
              href={`mailto:${siteConfig.email}`}
              className="inline-block border-b border-accent pb-1.5 font-display text-[clamp(1.5rem,3.2vw,2.6rem)] italic tracking-[-0.02em] text-ink transition-colors duration-200 hover:text-accent"
            >
              {siteConfig.email}
            </a>
          </p>
          {/* Footer de page : © · liens externes · langue */}
          <footer
            data-reveal
            className="mt-[clamp(80px,14vh,160px)] flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-hairline pt-6 text-left font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted"
          >
            <span>{t('rights', { year })}</span>
            <span className="flex gap-7">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-accent"
              >
                {t('footerGithub')} ↗
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-accent"
              >
                {t('footerLinkedin')} ↗
              </a>
            </span>
            <LocaleSwitcher />
          </footer>
        </RevealGroup>
      </div>
    </section>
  )
}
