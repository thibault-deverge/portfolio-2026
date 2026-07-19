import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FilNode } from '@/components/fil/FilNode'
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
        {/* Header éclaté : numéro + titre à gauche, tag à droite */}
        <div className="mb-[clamp(24px,4vh,40px)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t('num')}
            </p>
            <h2 className="font-display text-[clamp(2.6rem,7vw,5.4rem)] font-normal leading-[0.95] tracking-tight text-ink [font-optical-sizing:auto]">
              {t.rich('title', {
                accent: (chunks) => <span className="italic text-accent">{chunks}</span>,
              })}
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
            {t('tag')}
          </p>
        </div>

        {/* Intro : problème / réponse (kickers tiret accent) + carte client à droite */}
        <div className="mb-[clamp(48px,8vh,96px)] grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="text-[clamp(1.02rem,1.35vw,1.2rem)] leading-[1.7] text-ink-muted lg:col-span-7">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              — {t('intro1Label')}
            </p>
            <p className="text-pretty">
              {t.rich('intro1', { k: (chunks) => <span className="text-ink">{chunks}</span> })}
            </p>
            <p className="mb-2 mt-7 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              — {t('intro2Label')}
            </p>
            <p className="text-pretty">
              {t.rich('intro2', { k: (chunks) => <span className="text-ink">{chunks}</span> })}
            </p>
          </div>
          {/* Le client : témoignage réel (recommandation LinkedIn, citée verbatim) */}
          <div className="self-end lg:col-span-4 lg:col-start-9">
            <figure className="rounded-lg border border-hairline bg-surface p-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {t('clientLabel')}
              </p>
              <blockquote className="font-display text-[1.05rem] italic leading-snug text-ink">
                {t('clientQuote')}
              </blockquote>
              <figcaption className="mt-4">
                <p className="text-sm font-medium text-ink">{t('clientName')}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{t('clientRole')}</p>
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
        </div>

        {/* La planche : 4 moments du général au concret, en quinconce (12 col) */}
        <div className="grid grid-cols-1 gap-y-[clamp(40px,7vh,80px)] lg:grid-cols-12 lg:gap-x-8 lg:gap-y-[clamp(56px,9vh,110px)]">
          {/* 01 — la supervision (vue générale, fenêtre navigateur) */}
          <div className="relative lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <ImageLightbox src="/images/np-dashboard.jpg" label={t('zoom')}>
              <BrowserFrame>
                <div className="relative aspect-[1988/1000]">
                  <Image src="/images/np-dashboard.jpg" alt="" fill sizes="(min-width:1024px) 54vw, 92vw" className="object-cover" />
                </div>
                <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                  {t('badge')}
                </span>
              </BrowserFrame>
            </ImageLightbox>
            <FilNode className="absolute -left-1.5 -top-1.5" />
          </div>
          <div className="self-center lg:col-span-4 lg:col-start-9 lg:row-start-1">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t('feat1Label')}
            </p>
            <p className="max-w-[38ch] text-pretty text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.6] text-ink">
              {t('feat1Intro')}
            </p>
            <ul className="mt-3 max-w-[38ch] space-y-2 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-[1.55] text-ink-muted">
              {(['feat1Item1', 'feat1Item2', 'feat1Item3'] as const).map((key) => (
                <li key={key} className="flex gap-2.5">
                  <span aria-hidden className="text-accent">—</span>
                  <span className="text-pretty">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 02 — du livret à la signature : page interactive + modale + cartes, empilées */}
          <div className="relative lg:col-span-7 lg:col-start-6 lg:row-start-2">
            <div className="relative aspect-[100/90]">
              <ImageLightbox src="/images/np-livret-page.jpg" label={t('zoom')} className="absolute left-0 top-0 w-[46%]">
                <div className="relative aspect-[900/1180] overflow-hidden rounded-lg border border-hairline bg-surface shadow-xl shadow-ink/10">
                  <Image src="/images/np-livret-page.jpg" alt="" fill sizes="(min-width:1024px) 26vw, 46vw" className="object-cover" />
                </div>
              </ImageLightbox>
              <ImageLightbox src="/images/np-signature-modal.jpg" label={t('zoom')} className="absolute right-0 top-0 w-[46%]">
                <div className="relative aspect-[680/745] overflow-hidden rounded-lg border border-hairline bg-surface shadow-xl shadow-ink/15">
                  <Image src="/images/np-signature-modal.jpg" alt="" fill sizes="(min-width:1024px) 26vw, 46vw" className="object-cover" />
                </div>
              </ImageLightbox>
              <ImageLightbox src="/images/np-livrets.jpg" label={t('zoom')} className="absolute bottom-0 right-[6%] w-[58%]">
                <div className="relative aspect-[1090/520] overflow-hidden rounded-lg border border-hairline bg-surface shadow-xl shadow-ink/15">
                  <Image src="/images/np-livrets.jpg" alt="" fill sizes="(min-width:1024px) 30vw, 60vw" className="object-cover" />
                </div>
              </ImageLightbox>
            </div>
            <FilNode className="absolute -right-1.5 -top-1.5" />
          </div>
          <div className="self-center lg:col-span-4 lg:col-start-1 lg:row-start-2">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t('feat2Label')}
            </p>
            <p className="max-w-[38ch] text-pretty text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.6] text-ink">
              {t('feat2Intro')}
            </p>
            <ul className="mt-3 max-w-[38ch] space-y-2 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-[1.55] text-ink-muted">
              {(['feat2Item1', 'feat2Item2', 'feat2Item3', 'feat2Item4'] as const).map((key) => (
                <li key={key} className="flex gap-2.5">
                  <span aria-hidden className="text-accent">—</span>
                  <span className="text-pretty">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 03 — tests + rapport IA (medley de captures à venir) */}
          <div className="relative lg:col-span-4 lg:col-start-1 lg:row-start-3">
            <ImageLightbox src="/images/np-radar.jpg" label={t('zoom')}>
              <div className="relative aspect-[470/445] overflow-hidden rounded-lg border border-hairline bg-surface shadow-xl shadow-ink/10">
                <Image src="/images/np-radar.jpg" alt="" fill sizes="(min-width:1024px) 30vw, 92vw" className="object-cover" />
              </div>
            </ImageLightbox>
            <FilNode className="absolute -left-1.5 -top-1.5" />
          </div>
          <div className="self-center lg:col-span-4 lg:col-start-7 lg:row-start-3">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t('feat4Label')}
            </p>
            <p className="max-w-[38ch] text-pretty text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.6] text-ink">
              {t('feat4Intro')}
            </p>
            <ul className="mt-3 max-w-[38ch] space-y-2 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-[1.55] text-ink-muted">
              {(['feat4Item1', 'feat4Item2', 'feat4Item3'] as const).map((key) => (
                <li key={key} className="flex gap-2.5">
                  <span aria-hidden className="text-accent">—</span>
                  <span className="text-pretty">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Usage réel (chiffres de prod) entre filets + la ligne « sous le capot » */}
        <div className="mt-[clamp(56px,9vh,110px)] border-y border-hairline">
          <div className="grid grid-cols-2 gap-x-6 gap-y-7 py-8 lg:grid-cols-4">
            {(['stat1', 'stat2', 'stat3', 'stat4'] as const).map((key) => (
              <div key={key}>
                <div className="font-display text-[clamp(2rem,2.8vw,2.8rem)] font-normal leading-none tracking-tight text-accent">
                  {t(`${key}Value`)}
                </div>
                <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-ink-muted">
                  {t(`${key}Label`)}
                </p>
              </div>
            ))}
          </div>
          <p className="border-t border-hairline py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
            {t('hood')}
          </p>
        </div>
      </div>
    </section>
  )
}
