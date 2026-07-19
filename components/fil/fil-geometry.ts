// ===== Géométrie du fil rouge (pur, sans DOM — testable) =====

/** Un point du tracé, en px dans le repère de <main>. */
export type Point = { x: number; y: number }

/** Un segment de Bézier cubique (le point de départ est la fin du segment précédent). */
export type BezierSegment = { c1: Point; c2: Point; to: Point }

// ----- Constantes du fil (consommées par FilRouge) -----

/** Le bout du fil vise ce ratio du viewport sous le haut de l'écran (la ligne de regard). */
export const FIL_HEAD_VIEWPORT_RATIO = 0.6
/** Pas d'échantillonnage de la table longueur→y (px de longueur de tracé). */
export const FIL_SAMPLE_STEP_PX = 24
/** Debounce du rebuild au resize. */
export const FIL_REBUILD_DEBOUNCE_MS = 200
/** Longueur minimale du bout de fil initial (le « hint scroll » qui pend sous le hero). */
export const FIL_HINT_MIN_LEN = 120
/** Durée du reveal du bout initial après l'atterrissage du nœud voyageur. */
export const FIL_REVEAL_S = 0.8
/** Filet : reveal forcé si l'atterrissage n'est jamais signalé (cohérent avec IntroLock). */
export const FIL_LANDED_TIMEOUT_MS = 4500
/** Le fil n'existe qu'en desktop (même pivot que le breakpoint `lg` et le pin elloha). */
export const DESKTOP_QUERY = '(min-width: 64rem)'
/** Reduced-motion : fil complet statique (décision projet), zéro scrub. */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
/** Émis par TravelingNode quand le nœud du preloader se pose — le fil peut naître. */
export const FIL_ORIGIN_LANDED_EVENT = 'fil:origin-landed'

// ----- Spline -----

/** Exposant centripète (α = 0.5) — la variante de Catmull-Rom SANS boucles ni épingles. */
const CENTRIPETAL_ALPHA = 0.5
/** Garde-fou : deux ancres confondues ne doivent pas diviser par zéro. */
const MIN_KNOT_INTERVAL = 1e-4

/**
 * Spline Catmull-Rom CENTRIPÈTE → Béziers cubiques. La version uniforme
 * ((P[i+1]−P[i−1])/6) part en épingle quand un très long segment précède un court :
 * ici les tangentes sont pondérées par la distance réelle entre points (^α), ce qui
 * garantit un tracé sans rebroussement quel que soit l'espacement des ancres.
 * N points → N−1 segments (préfixes superposables au tracé complet).
 */
export function catmullRomToBezierSegments(pts: Point[]): BezierSegment[] {
  const interval = (a: Point, b: Point) =>
    Math.max(Math.hypot(b.x - a.x, b.y - a.y) ** CENTRIPETAL_ALPHA, MIN_KNOT_INTERVAL)
  const segments: BezierSegment[] = []
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    if (!p0 || !p1 || !p2 || !p3) continue
    const d01 = interval(p0, p1)
    const d12 = interval(p1, p2)
    const d23 = interval(p2, p3)
    // tangentes non-uniformes (espacement uniforme ⇒ retombe sur le /6 classique)
    const w1 = d12 / (d01 + d12) / 3
    const w2 = d12 / (d12 + d23) / 3
    segments.push({
      c1: { x: p1.x + (p2.x - p0.x) * w1, y: p1.y + (p2.y - p0.y) * w1 },
      c2: { x: p2.x - (p3.x - p1.x) * w2, y: p2.y - (p3.y - p1.y) * w2 },
      to: p2,
    })
  }
  return segments
}

/** Arrondi à 2 décimales — garde le `d` compact. */
const round = (n: number) => Math.round(n * 100) / 100

function segmentsToD(start: Point, segments: BezierSegment[]): string {
  let d = `M ${round(start.x)} ${round(start.y)}`
  for (const s of segments) {
    d += ` C ${round(s.c1.x)} ${round(s.c1.y)}, ${round(s.c2.x)} ${round(s.c2.y)}, ${round(s.to.x)} ${round(s.to.y)}`
  }
  return d
}

/** Le `d` complet du fil. */
export function toPathD(pts: Point[]): string {
  const start = pts[0]
  if (!start || pts.length < 2) return ''
  return segmentsToD(start, catmullRomToBezierSegments(pts))
}

/**
 * Le `d` partiel du départ jusqu'au point d'index `upTo` inclus — un préfixe EXACT
 * du tracé complet (mêmes segments), pour mesurer la longueur du fil à chaque nœud.
 */
export function toPartialPathD(pts: Point[], upTo: number): string {
  const start = pts[0]
  if (!start || upTo < 1) return ''
  return segmentsToD(start, catmullRomToBezierSegments(pts).slice(0, upTo))
}

// ===== Table longueur → y (le scrub cherche « quelle longueur dessiner pour
// ===== atteindre cette ligne de regard ») =====

/** Un échantillon du tracé : à `len` px de fil dessiné, la tête est à `y` px. */
export type LengthSample = { len: number; y: number }

/**
 * Enveloppe MONOTONE des échantillons : yMax = plus bas atteint jusqu'ici.
 * Le tracé remonte localement (boucles, coins) — l'enveloppe garantit une
 * recherche binaire valide : « première longueur où la tête a atteint y ».
 */
export function buildLengthEnvelope(samples: LengthSample[]): LengthSample[] {
  let yMax = -Infinity
  return samples.map(({ len, y }) => {
    yMax = Math.max(yMax, y)
    return { len, y: yMax }
  })
}

/** Longueur à dessiner pour que la tête du fil atteigne yTarget (lerp entre échantillons). */
export function drawnLengthFor(envelope: LengthSample[], total: number, yTarget: number) {
  const first = envelope[0]
  const last = envelope[envelope.length - 1]
  if (!first || !last) return 0
  if (yTarget <= first.y) return 0
  if (yTarget >= last.y) return total
  // recherche binaire : premier échantillon dont y >= yTarget
  let lo = 0
  let hi = envelope.length - 1
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if ((envelope[mid]?.y ?? Infinity) >= yTarget) hi = mid
    else lo = mid + 1
  }
  const after = envelope[lo]
  const before = envelope[lo - 1]
  if (!after || !before) return after?.len ?? 0
  // interpolation linéaire — évite les crans de FIL_SAMPLE_STEP_PX
  const span = after.y - before.y
  const t = span > 0 ? (yTarget - before.y) / span : 1
  return before.len + (after.len - before.len) * t
}
