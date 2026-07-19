import { getTranslations } from 'next-intl/server'
import { FilNode } from '@/components/fil/FilNode'
import { FilVia } from '@/components/fil/FilVia'
import { RevealGroup } from '@/components/motion/RevealGroup'
import { ScrambleText } from '@/components/motion/ScrambleText'
import { siteConfig } from '@/lib/config/site'
import { cn } from '@/lib/utils'

// Les URLs ne sont pas de la copy : elles vivent ici, adossées à siteConfig.
// « Ce portfolio » pointe vers le profil tant que le repo reste privé (cf. M11).
const PROJECTS = [
  { key: 'p1', href: siteConfig.links.github },
  { key: 'p2', href: `${siteConfig.links.github}/42-Cursus__Ft-Transcendence` },
  { key: 'p3', href: `${siteConfig.links.github}/42-Cursus__Minishell` },
  { key: 'p4', href: `${siteConfig.links.github}/42-Cursus__Cub3d` },
] as const

/**
 * Scène 05 — Projets : le reste de l'atelier en liste sobre — lignes numérotées
 * (num accent / titre Fraunces / méta mono / ↗), hover surface, reveals en cascade.
 */
export async function Projets() {
  const t = await getTranslations('Projets')

  return (
    <section
      id="projets"
      className="relative px-6 py-14 sm:px-10 lg:px-14 lg:py-[clamp(80px,16vh,200px)]"
    >
      <div className="mx-auto w-full max-w-310">
        <RevealGroup>
          {/* Header éclaté : kicker + titre à gauche, lien GitHub calé en bas à droite */}
          <div className="mb-[clamp(32px,5vh,56px)] flex flex-wrap items-end justify-between gap-x-6 gap-y-8">
            <div>
              <div className="relative mb-8">
                <FilNode className="absolute -left-6 top-1" />
                <ScrambleText
                  text={t('num')}
                  trigger="in-view"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
                />
              </div>
              <h2 className="font-display text-[clamp(2.6rem,7vw,5.4rem)] font-normal leading-[0.95] tracking-[-0.03em] text-ink [font-optical-sizing:auto]">
                <span className="mb-[-0.1em] block overflow-hidden pb-[0.1em]">
                  <span data-reveal className="block">
                    {t.rich('title', {
                      muted: (chunks) => <em className="italic text-ink-muted">{chunks}</em>,
                    })}
                  </span>
                </span>
              </h2>
            </div>
            <p className="overflow-hidden pb-1">
              <a
                data-reveal
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-muted underline decoration-hairline underline-offset-4 transition-colors duration-200 hover:text-accent"
              >
                {t('githubLink')} ↗
              </a>
            </p>
          </div>

          {/* Les lignes : chaque row monte sous masque avec son filet, stagger 90 ms */}
          <div className="relative">
            {/* sortie du fil : sous la liste, gouttière gauche — il évite les lignes */}
            <FilVia className="absolute -bottom-6 left-0" />
            {PROJECTS.map((project, i) => (
              <div key={project.key} className="overflow-hidden">
                <a
                  data-reveal
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'group -mx-4 grid grid-cols-[40px_minmax(0,1fr)_auto] items-baseline gap-x-[clamp(12px,2.5vw,32px)] border-t border-hairline px-4 py-[clamp(22px,3.5vh,34px)] transition-colors duration-200 hover:bg-surface',
                    'lg:grid-cols-[56px_minmax(0,1fr)_auto_56px]',
                    i === PROJECTS.length - 1 && 'border-b',
                  )}
                >
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-[clamp(1.7rem,3.4vw,2.7rem)] leading-none tracking-[-0.02em] text-ink [font-optical-sizing:auto]">
                    {t(`${project.key}Title`)}
                  </span>
                  <span className="col-start-2 row-start-2 mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted lg:col-start-3 lg:row-start-1 lg:mt-0 lg:text-right">
                    {t(`${project.key}Meta`)}
                  </span>
                  <span
                    aria-hidden
                    className="col-start-3 row-start-1 inline-block text-right text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none lg:col-start-4"
                  >
                    ↗
                  </span>
                </a>
              </div>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  )
}
