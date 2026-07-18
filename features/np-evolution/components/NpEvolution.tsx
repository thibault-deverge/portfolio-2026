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
          {/* Le client : la preuve humaine (lien LinkedIn réel) */}
          <div className="self-end lg:col-span-4 lg:col-start-9">
            <div className="rounded-lg border border-hairline bg-surface p-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {t('clientLabel')}
              </p>
              <p className="font-display text-xl italic text-ink">{t('clientName')}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t('clientRole')}</p>
              <a
                href="https://www.linkedin.com/in/nicolas-picaut-9455a9179/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.12em] text-ink-muted underline decoration-hairline underline-offset-4 transition-colors duration-200 hover:text-accent"
              >
                {t('clientLink')} ↗
              </a>
            </div>
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
            <p className="max-w-[36ch] text-pretty text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-ink-muted">
              {t('feat1Body')}
            </p>
          </div>

          {/* 02 — les livrets (le cœur du produit) */}
          <div className="relative lg:col-span-6 lg:col-start-7 lg:row-start-2">
            <ImageLightbox src="/images/np-livrets.jpg" label={t('zoom')}>
              <div className="relative aspect-[1090/520] overflow-hidden rounded-lg border border-hairline bg-surface shadow-xl shadow-ink/10">
                <Image src="/images/np-livrets.jpg" alt="" fill sizes="(min-width:1024px) 46vw, 92vw" className="object-cover" />
              </div>
            </ImageLightbox>
            <FilNode className="absolute -right-1.5 -top-1.5" />
          </div>
          <div className="self-center lg:col-span-4 lg:col-start-1 lg:row-start-2">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t('feat2Label')}
            </p>
            <p className="max-w-[36ch] text-pretty text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-ink-muted">
              {t('feat2Body')}
            </p>
          </div>

          {/* 03 — la signature & l'émargement (la conformité) */}
          <div className="relative lg:col-span-6 lg:col-start-1 lg:row-start-3">
            <ImageLightbox src="/images/np-signature.jpg" label={t('zoom')}>
              <div className="relative aspect-[1040/660] overflow-hidden rounded-lg border border-hairline bg-surface shadow-xl shadow-ink/10">
                <Image src="/images/np-signature.jpg" alt="" fill sizes="(min-width:1024px) 46vw, 92vw" className="object-cover" />
              </div>
            </ImageLightbox>
            <FilNode className="absolute -left-1.5 -top-1.5" />
          </div>
          <div className="self-center lg:col-span-4 lg:col-start-8 lg:row-start-3">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t('feat3Label')}
            </p>
            <p className="max-w-[36ch] text-pretty text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-ink-muted">
              {t('feat3Body')}
            </p>
          </div>

          {/* 04 — tests + rapport IA */}
          <div className="relative lg:col-span-4 lg:col-start-8 lg:row-start-4">
            <ImageLightbox src="/images/np-radar.jpg" label={t('zoom')}>
              <div className="relative aspect-[470/445] overflow-hidden rounded-lg border border-hairline bg-surface shadow-xl shadow-ink/10">
                <Image src="/images/np-radar.jpg" alt="" fill sizes="(min-width:1024px) 30vw, 92vw" className="object-cover" />
              </div>
            </ImageLightbox>
            <FilNode className="absolute -right-1.5 -top-1.5" />
          </div>
          <div className="self-center lg:col-span-4 lg:col-start-2 lg:row-start-4">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t('feat4Label')}
            </p>
            <p className="max-w-[36ch] text-pretty text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-ink-muted">
              {t('feat4Body')}
            </p>
          </div>
        </div>

        {/* Rangée de stats entre filets */}
        <div className="mt-[clamp(56px,9vh,110px)] grid grid-cols-1 gap-6 border-y border-hairline py-7 sm:grid-cols-3">
          {(['stat1', 'stat2', 'stat3'] as const).map((key) => (
            <div key={key} className="flex items-baseline gap-3">
              <span className="font-display text-[clamp(1.9rem,2.6vw,2.6rem)] font-normal leading-none tracking-tight text-accent">
                {t(`${key}Value`)}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                {t(`${key}Label`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
