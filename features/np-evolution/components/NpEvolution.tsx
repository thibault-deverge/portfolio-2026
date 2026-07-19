import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FilNode } from '@/components/fil/FilNode'
import { RevealGroup } from '@/components/motion/RevealGroup'
import { ScrambleText } from '@/components/motion/ScrambleText'
import { ImageLightbox } from '@/components/ui/ImageLightbox'
import { BrowserFrame } from './BrowserFrame'

/**
 * Scène 02 — NP-Evolution : header éclaté, puis « planche d'atelier » — trois
 * spécimens de l'app épinglés en quinconce, expliqués par des blocs de texte,
 * fermée par une rangée de stats. Wipe/reveals (C), copy définitive (E).
 */
export async function NpEvolution() {
  const t = await getTranslations('NpEvolution')

  return (
    <section
      id="np-evolution"
      className="relative px-6 py-[clamp(80px,16vh,200px)] sm:px-10 lg:px-14"
    >
      <div className="mx-auto w-full max-w-310">
        {/* Header éclaté : numéro scramblé + titre sous masque, tag à droite */}
        <RevealGroup className="mb-[clamp(24px,4vh,40px)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <ScrambleText
              text={t('num')}
              trigger="in-view"
              className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent"
            />
            <h2 className="font-display text-[clamp(2.6rem,7vw,5.4rem)] font-normal leading-[0.95] tracking-tight text-ink [font-optical-sizing:auto]">
              <span className="mb-[-0.1em] block overflow-hidden pb-[0.1em]">
                <span data-reveal className="block">
                  {t.rich('title', {
                    accent: (chunks) => (
                      <span className="italic text-accent">{chunks}</span>
                    ),
                  })}
                </span>
              </span>
            </h2>
          </div>
          <span className="block overflow-hidden">
            <span
              data-reveal
              className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-muted"
            >
              {t('tag')}
            </span>
          </span>
        </RevealGroup>

        {/* Intro : problème / réponse (kickers tiret accent) + carte client à droite */}
        <RevealGroup className="mb-[clamp(48px,8vh,96px)] grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="text-[clamp(1.02rem,1.35vw,1.2rem)] leading-[1.7] text-ink-muted lg:col-span-7">
            <span className="block overflow-hidden">
              <p
                data-reveal
                className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent"
              >
                <span
                  aria-hidden
                  className="reveal-dash mr-2 inline-block h-px w-4 bg-accent align-middle"
                />
                {t('intro1Label')}
              </p>
            </span>
            <p data-reveal-words className="text-pretty">
              {t.rich('intro1', {
                k: (chunks) => <span className="text-ink">{chunks}</span>,
              })}
            </p>
            <span className="mt-7 block overflow-hidden">
              <p
                data-reveal
                className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent"
              >
                <span
                  aria-hidden
                  className="reveal-dash mr-2 inline-block h-px w-4 bg-accent align-middle"
                />
                {t('intro2Label')}
              </p>
            </span>
            <p data-reveal-words className="text-pretty">
              {t.rich('intro2', {
                k: (chunks) => <span className="text-ink">{chunks}</span>,
              })}
            </p>
          </div>
          {/* Le client : témoignage réel (recommandation LinkedIn, citée verbatim) */}
          <div className="self-end overflow-hidden lg:col-span-4 lg:col-start-9">
            <figure
              data-reveal
              className="rounded-lg border border-hairline bg-surface p-6"
            >
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {t('clientLabel')}
              </p>
              <blockquote className="font-display text-[1.05rem] italic leading-snug text-ink">
                {t('clientQuote')}
              </blockquote>
              <figcaption className="mt-4">
                <p className="text-sm font-medium text-ink">{t('clientName')}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                  {t('clientRole')}
                </p>
                <a
                  href="https://www.linkedin.com/in/thibault-deverge/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block font-mono text-xs uppercase tracking-[0.12em] text-ink-muted underline decoration-hairline underline-offset-4 transition-colors duration-200 hover:text-accent"
                >
                  {t('clientLink')} ↗
                </a>
              </figcaption>
            </figure>
          </div>
        </RevealGroup>

        {/* La planche : 4 moments du général au concret, en quinconce (12 col) */}
        <div className="grid grid-cols-1 gap-y-[clamp(40px,7vh,80px)] lg:grid-cols-12 lg:gap-x-8 lg:gap-y-[clamp(56px,9vh,110px)]">
          {/* 01 — la supervision : dashboard admin + détail consultant (la hiérarchie en images) */}
          <RevealGroup className="relative lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <ImageLightbox wipe src="/np-evolution/dashboard.jpg" label={t('zoom')}>
              <BrowserFrame>
                <div className="relative aspect-1988/1000">
                  <Image
                    src="/np-evolution/dashboard.jpg"
                    alt=""
                    fill
                    sizes="(min-width:1024px) 54vw, 92vw"
                    className="reveal-wipe-zoom object-cover"
                  />
                </div>
                <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                  {t('badge')}
                </span>
              </BrowserFrame>
            </ImageLightbox>
            <ImageLightbox
              wipe="up"
              src="/np-evolution/consultant.jpg"
              label={t('zoom')}
              className="absolute bottom-[-9%] right-[-3%] w-[46%]"
            >
              <div className="relative aspect-965/530 overflow-hidden rounded-lg border border-hairline bg-surface shadow-xl shadow-ink/15">
                <Image
                  src="/np-evolution/consultant.jpg"
                  alt=""
                  fill
                  sizes="(min-width:1024px) 24vw, 46vw"
                  className="reveal-wipe-zoom object-cover"
                />
              </div>
            </ImageLightbox>
            <FilNode className="absolute -left-1.5 -top-1.5" />
          </RevealGroup>
          <RevealGroup className="self-center lg:col-span-4 lg:col-start-9 lg:row-start-1">
            <span className="block overflow-hidden">
              <p
                data-reveal
                className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent"
              >
                <span
                  aria-hidden
                  className="reveal-dash mr-2 inline-block h-px w-4 bg-accent align-middle"
                />
                {t('feat1Label')}
              </p>
            </span>
            <p
              data-reveal-words
              className="max-w-[38ch] text-pretty text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.6] text-ink"
            >
              {t('feat1Intro')}
            </p>
            <ul className="mt-3 max-w-[38ch] space-y-2 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-[1.55] text-ink-muted">
              {(['feat1Item1', 'feat1Item2', 'feat1Item3'] as const).map((key) => (
                <li key={key} className="overflow-hidden">
                  <div data-reveal className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="reveal-dash mt-[0.65em] h-px w-3.5 shrink-0 bg-accent"
                    />
                    <span className="text-pretty">{t(key)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </RevealGroup>

          {/* 02 — du livret à la signature : page interactive + modale + cartes, empilées */}
          <RevealGroup className="relative lg:col-span-7 lg:col-start-6 lg:row-start-2">
            <div className="relative aspect-100/70">
              <ImageLightbox
                wipe="left"
                src="/np-evolution/livret-page.jpg"
                label={t('zoom')}
                className="absolute left-0 top-0 w-[48%]"
              >
                <div className="relative aspect-900/1180 overflow-hidden rounded-lg border border-hairline bg-surface shadow-xl shadow-ink/10">
                  <Image
                    src="/np-evolution/livret-page.jpg"
                    alt=""
                    fill
                    sizes="(min-width:1024px) 28vw, 48vw"
                    className="reveal-wipe-zoom object-cover"
                  />
                </div>
              </ImageLightbox>
              <ImageLightbox
                wipe
                src="/np-evolution/signature.jpg"
                label={t('zoom')}
                className="absolute right-0 top-[2%] w-[53%]"
              >
                <div className="relative aspect-756/799 overflow-hidden rounded-lg border border-hairline bg-surface shadow-xl shadow-ink/15">
                  <Image
                    src="/np-evolution/signature.jpg"
                    alt=""
                    fill
                    sizes="(min-width:1024px) 28vw, 53vw"
                    className="reveal-wipe-zoom object-cover"
                  />
                </div>
              </ImageLightbox>
              <ImageLightbox
                wipe="up"
                src="/np-evolution/livrets.jpg"
                label={t('zoom')}
                className="absolute bottom-0 right-0 w-[62%]"
              >
                <div className="relative aspect-1090/520 overflow-hidden rounded-lg border border-hairline bg-surface shadow-xl shadow-ink/15">
                  <Image
                    src="/np-evolution/livrets.jpg"
                    alt=""
                    fill
                    sizes="(min-width:1024px) 32vw, 62vw"
                    className="reveal-wipe-zoom object-cover"
                  />
                </div>
              </ImageLightbox>
            </div>
            <FilNode className="absolute -right-1.5 -top-1.5" />
          </RevealGroup>
          <RevealGroup className="self-center lg:col-span-4 lg:col-start-1 lg:row-start-2">
            <span className="block overflow-hidden">
              <p
                data-reveal
                className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent"
              >
                <span
                  aria-hidden
                  className="reveal-dash mr-2 inline-block h-px w-4 bg-accent align-middle"
                />
                {t('feat2Label')}
              </p>
            </span>
            <p
              data-reveal-words
              className="max-w-[38ch] text-pretty text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.6] text-ink"
            >
              {t('feat2Intro')}
            </p>
            <ul className="mt-3 max-w-[38ch] space-y-2 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-[1.55] text-ink-muted">
              {(['feat2Item1', 'feat2Item2', 'feat2Item3', 'feat2Item4'] as const).map(
                (key) => (
                  <li key={key} className="overflow-hidden">
                    <div data-reveal className="flex gap-2.5">
                      <span
                        aria-hidden
                        className="reveal-dash mt-[0.65em] h-px w-3.5 shrink-0 bg-accent"
                      />
                      <span className="text-pretty">{t(key)}</span>
                    </div>
                  </li>
                ),
              )}
            </ul>
          </RevealGroup>

          {/* 03 — tests + rapport IA : radar + interprétation IA, empilés */}
          <RevealGroup className="relative lg:col-span-5 lg:col-start-1 lg:row-start-3">
            <div className="relative aspect-100/85">
              <ImageLightbox
                wipe="left"
                src="/np-evolution/radar.jpg"
                label={t('zoom')}
                className="absolute left-0 top-0 w-[54%]"
              >
                <div className="relative aspect-470/445 overflow-hidden rounded-lg border border-hairline bg-surface shadow-xl shadow-ink/10">
                  <Image
                    src="/np-evolution/radar.jpg"
                    alt=""
                    fill
                    sizes="(min-width:1024px) 22vw, 54vw"
                    className="reveal-wipe-zoom object-cover"
                  />
                </div>
              </ImageLightbox>
              <ImageLightbox
                wipe="up"
                src="/np-evolution/ia.jpg"
                label={t('zoom')}
                className="absolute bottom-0 right-0 w-[58%]"
              >
                <div className="relative aspect-835/850 overflow-hidden rounded-lg border border-hairline bg-surface shadow-xl shadow-ink/15">
                  <Image
                    src="/np-evolution/ia.jpg"
                    alt=""
                    fill
                    sizes="(min-width:1024px) 24vw, 58vw"
                    className="reveal-wipe-zoom object-cover"
                  />
                </div>
              </ImageLightbox>
            </div>
            <FilNode className="absolute -left-1.5 -top-1.5" />
          </RevealGroup>
          <RevealGroup className="self-center lg:col-span-4 lg:col-start-7 lg:row-start-3">
            <span className="block overflow-hidden">
              <p
                data-reveal
                className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent"
              >
                <span
                  aria-hidden
                  className="reveal-dash mr-2 inline-block h-px w-4 bg-accent align-middle"
                />
                {t('feat4Label')}
              </p>
            </span>
            <p
              data-reveal-words
              className="max-w-[38ch] text-pretty text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.6] text-ink"
            >
              {t('feat4Intro')}
            </p>
            <ul className="mt-3 max-w-[38ch] space-y-2 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-[1.55] text-ink-muted">
              {(['feat4Item1', 'feat4Item2', 'feat4Item3'] as const).map((key) => (
                <li key={key} className="overflow-hidden">
                  <div data-reveal className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="reveal-dash mt-[0.65em] h-px w-3.5 shrink-0 bg-accent"
                    />
                    <span className="text-pretty">{t(key)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </RevealGroup>
        </div>

        {/* Usage réel (chiffres de prod) entre filets + la ligne « sous le capot » */}
        <RevealGroup className="mt-[clamp(56px,9vh,110px)] border-y border-hairline">
          <div className="grid grid-cols-1 gap-x-6 gap-y-7 py-8 sm:grid-cols-3">
            {(['stat1', 'stat2', 'stat3'] as const).map((key) => (
              <div key={key} className="overflow-hidden">
                <div data-reveal>
                  <div className="font-display text-[clamp(2rem,2.8vw,2.8rem)] font-normal leading-none tracking-tight text-accent">
                    {t(`${key}Value`)}
                  </div>
                  <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-ink-muted">
                    {t(`${key}Label`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="overflow-hidden border-t border-hairline">
            <p
              data-reveal
              className="py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted"
            >
              {t('hood')}
            </p>
          </div>
        </RevealGroup>
      </div>
    </section>
  )
}
