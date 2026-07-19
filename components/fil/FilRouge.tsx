'use client'

import { useCallback, useEffect, useRef } from 'react'
import { animate, useMotionValueEvent, useScroll } from 'motion/react'
import {
  buildLengthEnvelope,
  DESKTOP_QUERY,
  drawnLengthFor,
  FIL_HEAD_VIEWPORT_RATIO,
  FIL_HINT_MIN_LEN,
  FIL_LANDED_TIMEOUT_MS,
  FIL_ORIGIN_LANDED_EVENT,
  FIL_REBUILD_DEBOUNCE_MS,
  FIL_REVEAL_S,
  FIL_SAMPLE_STEP_PX,
  REDUCED_MOTION_QUERY,
  toPartialPathD,
  toPathD,
  type LengthSample,
  type Point,
} from './fil-geometry'

/** Géométrie courante du tracé — remplie au build, lue par le scrub (zéro state React). */
type FilGeometry = {
  total: number
  envelope: LengthSample[]
  /** Position document du haut de <main> (les y du tracé sont dans son repère). */
  mainTop: number
  /** Nœuds gérés par l'allumage (2 à 7) + longueur de fil à laquelle chacun est atteint. */
  managed: { el: HTMLElement; threshold: number }[]
}

/**
 * Le fil rouge : SVG plein document, premier enfant de <main> — peint DERRIÈRE les
 * sections (elles sont `relative`, donc au-dessus), il « plonge » sous les surfaces
 * opaques (manifeste encre, stage elloha pinné) et ressort. Tracé = spline passant
 * par les ancres [data-fil-node] + [data-fil-via], dessiné au scroll : la tête du
 * fil suit la ligne de regard (scrollY + 60 % du viewport) via stroke-dashoffset.
 */
export function FilRouge() {
  const svgRef = useRef<SVGSVGElement>(null)
  const geomRef = useRef<FilGeometry | null>(null)
  // scrub actif = desktop + motion (en reduced-motion le fil reste complet, statique)
  const scrubRef = useRef(false)
  // le fil ne naît qu'après l'atterrissage du nœud voyageur (reveal ~0.8s), puis scrub
  const revealedRef = useRef(false)
  // combien de nœuds gérés sont allumés — le DOM n'est touché QUE quand ça change
  const litCountRef = useRef(0)

  //#region ---- Scrub (1 écriture de style par frame, jamais de re-render) ----
  const { scrollY } = useScroll()

  const drawnAt = useCallback((y: number, geom: FilGeometry) => {
    const yTarget = y + window.innerHeight * FIL_HEAD_VIEWPORT_RATIO - geom.mainTop
    return drawnLengthFor(geom.envelope, geom.total, yTarget)
  }, [])

  /** Allume/éteint les nœuds selon la longueur dessinée (réversible au scroll up). */
  const syncNodes = useCallback((drawn: number, geom: FilGeometry) => {
    let lit = 0
    while (lit < geom.managed.length && (geom.managed[lit]?.threshold ?? Infinity) <= drawn) {
      lit++
    }
    if (lit === litCountRef.current) return
    geom.managed.forEach(({ el }, i) => {
      el.classList.toggle('fil-node-lit', i < lit)
      el.classList.toggle('fil-node-dim', i >= lit)
    })
    litCountRef.current = lit
  }, [])

  const update = useCallback(
    (y: number) => {
      const path = svgRef.current?.querySelector('path')
      const geom = geomRef.current
      if (!path || !geom || !scrubRef.current || !revealedRef.current) return
      const drawn = drawnAt(y, geom)
      path.style.strokeDashoffset = `${geom.total - drawn}`
      syncNodes(drawn, geom)
    },
    [drawnAt, syncNodes],
  )

  useMotionValueEvent(scrollY, 'change', update)
  //#endregion

  //#region ---- Build (mesure + tracé + table), après fonts.ready ----
  useEffect(() => {
    const svg = svgRef.current
    const path = svg?.querySelector('path')
    const main = svg?.parentElement
    if (!svg || !path || !main) return

    let aborted = false
    // Bascules VIVANTES : resize à travers le breakpoint ou toggle reduced-motion
    // en cours de session → le mode est réappliqué (pas figé au chargement).
    const mqDesktop = window.matchMedia(DESKTOP_QUERY)
    const mqReduce = window.matchMedia(REDUCED_MOTION_QUERY)

    // Toutes les positions en deltas de rects (indépendant du scroll courant).
    // Nœuds visibles + vias de passage, fusionnés dans l'ordre du document ;
    // on retient l'index de chaque NŒUD dans le tracé (pour les seuils d'allumage).
    const measurePoints = () => {
      const mainRect = main.getBoundingClientRect()
      const anchors = Array.from(
        main.querySelectorAll<HTMLElement>('[data-fil-node], [data-fil-via]'),
      )
      const points: Point[] = []
      const nodes: { el: HTMLElement; pointIndex: number }[] = []
      anchors.forEach((anchor) => {
        const rect = anchor.getBoundingClientRect()
        const x = rect.left + rect.width / 2 - mainRect.left
        // Nœud du stage elloha : sticky pendant le pin → position AU REPOS
        // (le stage colle au haut de sa piste), toujours juste, même mi-scroll.
        const stage = anchor.closest<HTMLElement>('.elloha-stage')
        const section = stage?.parentElement
        let y: number
        if (stage && section) {
          const sectionTop = section.getBoundingClientRect().top
          const stageTop = stage.getBoundingClientRect().top
          y = sectionTop - mainRect.top + (rect.top - stageTop) + rect.height / 2
        } else {
          // (.contact-ring en scale(0) avant son reveal : rect dégénéré mais centré —
          // les transforms n'affectent pas le layout, la mesure reste bonne.)
          y = rect.top + rect.height / 2 - mainRect.top
        }
        if (anchor.hasAttribute('data-fil-node')) {
          nodes.push({ el: anchor, pointIndex: points.length })
        }
        points.push({ x, y })
      })
      return { points, nodes }
    }

    // Path de travail invisible : mesure la longueur des préfixes du tracé (seuils).
    const work = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    work.setAttribute('fill', 'none')
    work.setAttribute('stroke', 'none')
    svg.appendChild(work)

    const build = () => {
      // 1. Lectures groupées (rects), puis écritures groupées — zéro thrashing
      const mainRect = main.getBoundingClientRect()
      const { points, nodes } = measurePoints()
      if (points.length < 2) return
      svg.setAttribute(
        'viewBox',
        `0 0 ${Math.round(mainRect.width)} ${Math.round(mainRect.height)}`,
      )
      path.setAttribute('d', toPathD(points))
      // 2. Table longueur → y : échantillonnage UNIQUEMENT au build
      const total = path.getTotalLength()
      const samples: LengthSample[] = []
      for (let len = 0; len < total; len += FIL_SAMPLE_STEP_PX) {
        samples.push({ len, y: path.getPointAtLength(len).y })
      }
      samples.push({ len: total, y: path.getPointAtLength(total).y })
      // 3. Seuils d'allumage EXACTS : longueur du préfixe du tracé jusqu'à chaque
      //    nœud géré (2 à 7) — le premier (TravelingNode) et le dernier (pastille
      //    contact, chorégraphiée par contact.css) sont exclus.
      const managed = nodes.slice(1, -1).map(({ el, pointIndex }) => {
        work.setAttribute('d', toPartialPathD(points, pointIndex))
        return { el, threshold: work.getTotalLength() }
      })
      geomRef.current = {
        total,
        envelope: buildLengthEnvelope(samples),
        mainTop: mainRect.top + window.scrollY,
        managed,
      }
      // 4. Appliquer l'état visuel selon le mode — TOUJOURS idempotent (un rebuild
      //    au resize ne doit jamais faire clignoter fil ou nœuds)
      if (scrubRef.current) {
        // scrub : état des nœuds conservé, dash caché avant la naissance du fil,
        // sinon redessiné à la position courante
        const lit = litCountRef.current
        managed.forEach(({ el }, i) => {
          el.classList.toggle('fil-node-lit', i < lit)
          el.classList.toggle('fil-node-dim', i >= lit)
        })
        path.style.strokeDasharray = `${total}`
        if (revealedRef.current) update(scrollY.get())
        else path.style.strokeDashoffset = `${total}`
      } else {
        // reduced-motion : fil COMPLET statique, nœuds pleins (décision projet)
        path.style.removeProperty('stroke-dasharray')
        path.style.removeProperty('stroke-dashoffset')
        clearNodeStates()
      }
      maybeReveal()
    }

    /** Nœuds rendus à leur état plein (mobile, reduced-motion, démontage). */
    const clearNodeStates = () => {
      geomRef.current?.managed.forEach(({ el }) =>
        el.classList.remove('fil-node-dim', 'fil-node-lit'),
      )
      litCountRef.current = 0
    }

    /** Le point d'entrée de tout (re)build : relit l'environnement puis applique. */
    const applyMode = () => {
      scrubRef.current = mqDesktop.matches && !mqReduce.matches
      if (!mqDesktop.matches) {
        // mobile : le SVG est déjà caché par `hidden lg:block` — on rend juste
        // leurs pleins états aux nœuds (ils restent des points décoratifs)
        clearNodeStates()
        return
      }
      build()
    }

    // ---- Naissance du fil : à l'atterrissage du nœud voyageur (+ filets) ----
    let landed = false
    let revealControls: ReturnType<typeof animate> | undefined
    const maybeReveal = () => {
      const geom = geomRef.current
      if (!landed || revealedRef.current || !geom || !scrubRef.current) return
      // le premier bout : jusqu'au regard, jamais moins que le hint qui pend
      const drawn = Math.max(drawnAt(scrollY.get(), geom), FIL_HINT_MIN_LEN)
      revealControls = animate(geom.total, geom.total - drawn, {
        duration: FIL_REVEAL_S,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => path.style.setProperty('stroke-dashoffset', `${v}`),
        onComplete: () => {
          revealedRef.current = true // le scrub prend le relais
          update(scrollY.get()) // rattrape un scroll survenu pendant la couture
        },
      })
    }
    const onLanded = () => {
      landed = true
      maybeReveal()
    }
    window.addEventListener(FIL_ORIGIN_LANDED_EVENT, onLanded, { once: true })
    // Filets : voile déjà levé (hydratation tardive) → pas d'atterrissage à attendre ;
    // et un timeout de sécurité cohérent avec celui d'IntroLock.
    const loader = document.querySelector<HTMLElement>('.hero-loader')
    if (!loader || getComputedStyle(loader).visibility === 'hidden') landed = true
    const safety = window.setTimeout(onLanded, FIL_LANDED_TIMEOUT_MS)

    // Fraunces bouge les hauteurs de titres → premier build après le chargement des fonts.
    document.fonts.ready.then(() => {
      if (!aborted) applyMode()
    })

    // Rebuild débouncé : tout reflow de <main> (resize, images, bascule de breakpoint)
    // et tout changement d'environnement repassent par applyMode — idempotent.
    let rebuildTimer: number | undefined
    const scheduleRebuild = () => {
      window.clearTimeout(rebuildTimer)
      rebuildTimer = window.setTimeout(() => {
        if (!aborted) applyMode()
      }, FIL_REBUILD_DEBOUNCE_MS)
    }
    const resizeObserver = new ResizeObserver(scheduleRebuild)
    resizeObserver.observe(main)
    mqDesktop.addEventListener('change', scheduleRebuild)
    mqReduce.addEventListener('change', scheduleRebuild)

    return () => {
      aborted = true
      resizeObserver.disconnect()
      window.clearTimeout(rebuildTimer)
      mqDesktop.removeEventListener('change', scheduleRebuild)
      mqReduce.removeEventListener('change', scheduleRebuild)
      window.removeEventListener(FIL_ORIGIN_LANDED_EVENT, onLanded)
      window.clearTimeout(safety)
      revealControls?.stop()
      work.remove()
      // hygiène : ne pas laisser d'état d'allumage orphelin (StrictMode dev)
      clearNodeStates()
    }
    // tous stables (MotionValue + useCallback) — l'effet ne tourne qu'au mount
  }, [scrollY, update, drawnAt])
  //#endregion

  return (
    <svg
      ref={svgRef}
      aria-hidden
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
    >
      <path
        className="fill-none stroke-accent"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
