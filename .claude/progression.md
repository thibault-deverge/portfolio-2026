# Progression — Roadmap du portfolio

> **La référence** : template `templates/portfolio-cinetique/` du projet Claude Design (`25a8ead9-8c98-4830-8a48-0d4c313f910d`, lisible via DesignSync `get_file`) pour M1-M4 ; **à partir de M5, la référence est `templates/portfolio-suite/PortfolioSuite.dc.html`** (même projet, généré 2026-07-19 dans notre vocabulaire — scènes 04 manifeste / 05 projets / 06 contact). Copy retravaillée scène par scène.
> **Méthode** : un module à la fois — on ne passe au suivant que quand le précédent est parfait, reviewé, fignolé et validé par Thibault. Les étapes listées ici sont le niveau intermédiaire ; les micro-étapes (celles qu'on exécute une par une) sont définies au moment d'attaquer le module, et cochées ici au fur et à mesure.

## Le rituel de fin de module (identique pour tous)

1. Calibrage fin en preview (desktop 1440 / mobile 390 / reduced-motion, FR et EN)
2. `/review-changes` + `pnpm typecheck` + `pnpm lint` + `NODE_ENV=production pnpm build`
3. Validation Thibault sur son navigateur → commit (conventional EN, sans mention Claude)
4. Mise à jour de ce fichier (cocher, noter les décisions prises)

## Contraintes permanentes (rappel — détail dans CLAUDE.md et les rules)

- Employeur : le mot « freelance » est OK ; AUCUN signal de disponibilité (« open to work », « disponible pour missions ») — précisé 2026-07-18
- Elloha : visuels PUBLICS uniquement (NDA) · NP-Evolution : anonymisé (pas de données réelles)
- i18n : parité fr/en stricte, zéro texte hardcodé · tokens only, un seul accent
- Patterns SSR-safe (coquilles identiques, IO+classes, écritures par ref) · reduced-motion partout
- Une branche `feat/*` par module, mergée sur `main` en fin de module

---

## ✅ M0 — Socle (FAIT, mergé sur main)

Scaffold Next 16 + design system (tokens/fonts) + i18n fr/en + Lenis + Header v1 + Hero v1 (rideau/cascade/dérive — sera refait en M1) + 404 « Le fil s'arrête ici » + grand nettoyage (YAGNI : MDX, zod, gitkeep, orphelins) + visite guidée de la codebase.

## ✅ M1 — L'arrivée : loader, header/nav, hero, curseur (mergé sur main le 2026-07-18)

_Le but : la première impression du template — preloader, levée du voile, hero manifeste qui cascade, curseur custom. Branche `feat/arrivee`. Plan détaillé : `~/.claude/plans/tout-m-interesse-...-goofy-curry.md`._

**Cours A — Cadrage & décisions** ✅

- [x] A1 🎯 Décisions : **D1** = preloader salutations (Bonjour → Hola → Hello → Xin chào, le parcours en 4 mots) plutôt que la barre du template — exploration 21st.dev faite ; **D2** (dérive DriftLine) reportée à C1 (le titre sera refait — Thibault aime la dérive, à re-juger sur le nouveau titre) ; **D3** voile header GARDÉ ; **D4** hint scroll → M9 (avec le fil) ; **D5** nav SECTIONS évolutive. Branche `feat/arrivee` ✅

**Cours B — Le preloader** ✅ (validé par Thibault le 2026-07-16)

- [x] B1 ⚙️ Salutations Fraunces italique + nœud terracotta sur encre, grille 4% + grain papier + crop marks, levée courbée 0.8s — CSS pur, `Preloader.tsx` dédié
- [x] B2 ⚙️🎯 Reduced-motion (display:none) + cascade recalée (2.5s→2.9s) + frames validées
- ⚠️ Fignolage final du preloader (dose grille/grain, timings, éventuel « première visite seulement ») → repoussé en F2, à la fin du module

**Cours C — Le hero manifeste**

- [x] C1 ⚙️ Structure 3 lignes (muted/italique/accent) + eyebrow + i18n refondu (`headline1/2/3`, copy placeholder jusqu'à F1) — **D2 tranchée : dérive alternée GARDÉE (−70/+110/−50)**, validé par Thibault
- [x] C2 ⚙️ Reveals masqués recalés sur la levée (absorbé par C1 : délais 2.5/2.62/2.74 + sous-titre 2.95, validés visuellement)
- [x] C3 ⚙️ ScrambleText (eyebrow) — îlot client SSR-safe, déclenché par `animationstart` de hero-rise, textContent par ref
- [x] C4 🎯 Checkpoint complet (EN/mobile/reduced ✅) — grille déjà identique au template (rien à recaler) ; bug attrapé et corrigé : `.fil-node` display non-layered écrasait `hidden` (leçon CSS layers)

**Cours D — Header & nav** ✅

- [x] D1 ⚙️ Nav SECTIONS (vide au départ, scroll doux `lenis.scrollTo`, repli ancre native) — voile gardé (D3)
- [x] D2 ⚙️🎯 Pastille FR/EN bordée + entrée du header en fondu à 2.6s (opacité seule, le transform reste libre pour le masquage au scroll)

**Cours E — Le curseur custom** ✅

- [x] E1 ⚙️ `CustomCursor.tsx` + `styles/cursor.css` : dot collé + ring lerp 0.16 (rAF/ref), activation post-hydratation (pointeur fin + motion OK), cursor:none piloté par classe sur html
- [x] E2 ⚙️🎯 Grossissement ×2.3 par délégation pointerover (transition CSS sur span interne) — checkpoint captures OK, interplay halo grille + curseur validé

**Idée retenue pour la fin du module (ou backlog M9)** : 💎 le nœud terracotta du dernier « Xin chào » se détache du mot pendant la levée du voile et vient se poser à sa place définitive dans le hero — le point du preloader DEVIENT le premier nœud du fil rouge (JS soigné : mesures + technique FLIP). Validé par Thibault, à tenter en F2 si le budget temps le permet, sinon à raccrocher au module fil rouge (M9).

**Cours F — Copy, calibrage, rituel**

- [x] F1 ⚙️ Atelier copy hero FR→EN : « Concevoir, coder, livrer. » / « Design, build, ship. », eyebrow « Concepteur · Développeur — Freelance », sous-titre preuve Elloha nommée (10 000+ pros) + « menées seul jusqu'à la production » — 3 recherches (best practices, portfolios FR, faits Elloha sourcés) + fiches `.claude/refs/{np-evolution,elloha}.md` (gitignorées NDA) + skills copywriting/stop-slop. Voix : vouvoiement, pro chaleureux direct.
- [x] F2 ⚙️ Calibrage global : mobile (eyebrow resserré 1 ligne, pas d'overflow au drift), reduced-motion (contenu immédiat, curseur custom absent — vérifié DOM), EN — preloader gardé tel quel. 💎 Nœud voyageur : reporté (2e temps, ou M9)
- [x] F3 🎯 Review branche (i18n/tokens/SSR-safe/a11y ✅), build prod SSG ✅, fixes finaux (descendante du « g » 0.18em, IntroLock : scroll verrouillé pendant l'arrivée), 💎 nœud voyageur LIVRÉ, validation Thibault, merge fast-forward → main, branche supprimée

## ✅ M2 — Scène « À propos » (bio + portrait) — mergé sur main le 2026-07-18

- [x] 2.1 Structure : grid 1.35fr/1fr, numéro `01` scramble in-view, titre « Enchanté, / Thibault Deverge. », première entrée nav (`Nav.about`, Header traduit désormais ses labels)
- [x] 2.2 Système de reveal réutilisable : `components/motion/RevealGroup` (IO + classes post-hydratation, stagger CSS 90ms, cas déjà-visible +150ms) — **décision : trigger à -30% au lieu du -18% template** (sinon l'animation était finie avant la fin du geste)
- [x] 2.3 Parallax : `components/motion/Parallax` (±amount×60% scrubbed, contenu débordant ±12%) — effet discret tant que la page s'arrête à la scène (course amputée), s'exprimera dès M3
- [x] 2.4 Copy bio définitive (recherches best practices + reconversion) : pivot dit UNE fois converti en méthode, CDI Elloha + freelance en évidence, PAS de moto/déclic/âge/Xin chào (trop perso), « Enchanté, » gardé en EN (signature) ; prose « en escalier » généralisée (fragments espacés, mots-clés encre, clôture italique) + hero en « deux voix » (thèse Fraunces italique / preuve Geist) ; portrait = **placeholder soigné** (grille + crop marks + nœud épinglé au coin), la vraie photo se glissera dans la couche Parallax
- [x] 2.5 Rituel : passes mobile/reduced/EN ✅, review ✅, build prod SSG ✅, validation Thibault ✅, merge fast-forward → main

_Notes M2 : ScrambleText déménagé dans `components/motion/` (+ trigger 'in-view'), FilNode dans `components/fil/` ; ancre `data-fil-node` posée au coin du cadre portrait (Thibault envisage de la déplacer sur le « 01 — À propos » — à retrancher en M9) ; fix IntroLock : reload scrollé → retour en haut pendant l'intro ; leçon ICU : apostrophe droite = échappement → apostrophes typographiques partout dans les messages._

## ✅ M3 — Scène « NP-Evolution » (mission freelance) — mergé sur main le 2026-07-19

- [x] 3.1 Structure — GRAND ÉCART assumé vs template : « planche d'atelier » (idée Thibault) au lieu du média 16/9 unique — header éclaté (02 scramblé + titre accent + tag) · intro problème/réponse à kickers tirets · carte client avec TÉMOIGNAGE RÉEL (reco LinkedIn Nicolas Picaut, extraits verbatim, lien) · 3 moments en quinconce 12 col (supervision : dashboard en fenêtre navigateur + détail consultant · du livret à la signature : pile page+modale+cartes · tests+IA : radar + interprétation) · bande stats + ligne « sous le capot »
- [x] 3.2 Médias : 7 captures RÉELLES croppées au labo canvas (résolution native, q92, données démo), lightbox au clic (`components/ui/ImageLightbox`, réutilisable M4), rangées dans `public/np-evolution/` — leçon : next/image cache par URL → un asset remplacé = un nom nouveau
- [x] 3.3 Copy définitive : le BESOIN d'abord (cadre légal CPF/Qualiopi, paperasse), « plateforme privée » (pas SaaS — pas d'abonnement), listes intro+tirets, stats prod réelles (65 bénéficiaires · 298 signatures · 384 h — source NeonDB, archivé fiche refs), stop-slop passé (43/50)
- [x] 3.4 Rituel : mobile/reduced/EN ✅, review ✅, build prod SSG ✅, merge → main

_Polish 2026-07-19 (branche refactor/np-evolution, après M5) : scène raccourcie — moments 2+3 FUSIONNÉS en « Du livret au rapport final » (pile 4 visuels : page + signature + livrets + interprétation IA ; radar retiré → ~/.trash), liste condensée 3 tirets ; reveals ALLÉGÉS (plus de blur-in mot à mot hors manifeste, paragraphes en rise simple, listes et stats révélées en bloc) — décisions : ordre NP-E→elloha CONSERVÉ (preuve freelance d'abord, crescendo éditorial→pinning→encre) ; pas de 2e pause sombre entre NP-E et elloha (l'unicité du manifeste prime, le fil M9 séparera — à réévaluer M10)._

_Notes M3 : grammaire de reveals V2 (validée par Thibault, réutilisable M4-M8) : mots en blur-in (`data-reveal-words`, wrap post-hydratation), wipes directionnels (`data-reveal-wipe="left|right|up"`), tirets qui se dessinent (`.reveal-dash`), listes item par item — inspirée 21st.dev, fabriquée maison. Passe Tailwind canonique faite (aspect-a/b). Capture discussion NON utilisée (messages de test) — refaire une demo propre si besoin un jour._

## ✅ M4 — Scène « elloha » (galerie pinnée) — mergé sur main le 2026-07-19

- [x] 4.1 Squelette pinning : piste **190vh** (raccourcie vs 240vh template, décision Thibault) + stage sticky 100vh — layout pinné 100% CSS dans UN bloc `@media (min-width:64rem) and (prefers-reduced-motion: no-preference)` (`styles/elloha.css`), par défaut = flux empilé (mobile/reduced/no-JS servis par les utilities). Visuels **Vnext uniquement** (les mockups du site marketing = ANCIEN back-office, écartés — source : screenshots Google Play `fr.ellohapp` en `=w2400` + photo équipe 2024 du site) ; crops langue-neutres (zéro slogan FR incrusté).
- [x] 4.2 Mécanique : `useScroll` offset `['start start','end end']` + `useMotionValueEvent` → CSS vars `--drift-x/y` + `--fade-0/1` écrites par ref sur la section (PAS de motion.div — un style inline translaterait aussi le layout mobile). Dérive finale **−21%/−6%** (adoucie vs −44/−15 template), cross-fade resserré : acte 1 sort à 26→38%, acte 2 installé à 46%. Fenêtres via `seg()` clampé du template.
- [x] 4.3 Composition finale (≈6 itérations de feedback) : bande-collage basse de 5 éléments avec micro-rotations (photo équipe → planning tablette + 2 téléphones chevauchés → **carte avis HTML/CSS** qui ferme à droite : logo 2026 + 4,8★ 2 159 avis Google + Trustpilot « Excellent ») · voile terracotta `bg-accent/8 multiply` sur les vignettes (cohérence M3) · lightbox au clic · **constellation de 4 badges-anneaux** (écho curseur/nœuds : 60+ canaux · 19 000+ utilisateurs/jour · 106e Les Echos 2024 · 150 M+ résas/an) entre titre et couloir texte.
- [x] 4.4 Copy définitive : « elloha » MINUSCULE partout (branding) · rôle « Développeur · CDI · SaaS tourisme » (PAS « front-end » — Thibault ne veut pas s'enfermer) · acte 1 « Le produit » 2 phrases · acte 2 « Mon travail » = intro (arrivée octobre 2025) + 4 tirets concrets issus du résumé de l'agent interne elloha (features Jira de bout en bout + reviews, écrans Material UI, chemins critiques + bugs QA, i18n 5 langues/Sentry/legacy/API C#) + ligne stack mono. FilNode près du « 03 » (6e ancre).
- [x] 4.5 Rituel : mobile 390 (0 overflow, badges centrés 2×2, resserrage des paddings verticaux mobile de TOUTES les scènes `py-14`) ✅ · reduced-motion (flux statique, 0 classe reveal) ✅ · EN ✅ · SSR sans JS ✅ · IntroLock reload mi-section pinnée ✅ · build prod SSG ✅ · merge ff → main

_Notes M4 : le pinning sticky + scrub CSS vars = le socle réutilisable pour M6 (projets horizontaux). Chiffres écartés de la copy : « 10 000+ clients » (introuvable sur le site actuel — ⚠️ le hero M1 l'utilise encore, à re-vérifier avant mise en ligne), CA (non public), « Capital 2026 » (invérifiable). 180 M€ = volume traité pour les clients, jamais « CA ». Piège appris : la rotation −5° de la couche drift REMONTE les éléments éloignés du centre (~6-10vh) — les positions CSS des vignettes de droite compensent. Portrait M2 remplacé au passage par le portrait studio Soul Higgsfield (commit `b732228`, soul_id e0ce4b99, ~1 crédit/2 images — brutes dans le scratchpad `soul-portraits/`)._

## ✅ M5 — Scène « Manifeste » (respiration encre) — mergé sur main le 2026-07-19

- [x] 5.1 Structure : Server Component PUR (`features/manifeste/`, zéro JS client à nous), fond `bg-ink text-paper` (seul moment sombre — écho preloader), tokens + opacité (`text-paper/60`, `border-paper/15`, JAMAIS de hex), titre 2 lignes indentées sous masque + body `data-reveal-words` + tagline italique + signature mono sous filet. 8e ancre FilNode. Pas d'entrée nav (décision).
- [x] 5.2 Copy définitive « **Codé pour ceux qui s'en servent.** » (direction choisie parmi 3 — angle utilisateur : le livret NP-E + le planning elloha renvoient aux scènes précédentes) ; body ~55 mots stop-slop ; tagline « Du premier croquis à la production — et à ce qui vit après. » ; mono « Conception · Code · Production ». EN : « Built for the people who use it. » — leçon : virgule APRÈS un `<k>` fermant = risque de virgule orpheline en début de ligne → la rentrer dans le span.
- [x] 5.3 Rituel : mobile 390 ✅ · reduced-motion (0 classe, opacity 1) ✅ · EN ✅ · contraste paper/60 sur encre ≈ 6,3:1 AA ✅ · build prod SSG ✅ · merge ff → main

_Notes M5 : la copy du template suite (« Un produit n'existe que livré ») écartée — redondante avec le hero et ton maxime ; sobriété motion VOULUE (reveals one-shot, zéro mouvement continu — l'arrêt après la dérive elloha EST l'effet). Module le plus léger du chantier (5 fichiers, +96)._

## ✅ M6 — Scène « Projets » (LISTE sobre — décision 2026-07-19, rail horizontal pinné ABANDONNÉ)

_Le template suite remplace le rail par une liste de lignes numérotées (hover surface + reveals) — cohérent « une seule animation spectaculaire » (elloha + fil rouge suffisent). Corrections vs template appliquées : métas Next 16 · Motion ; **webserv du template = repo INEXISTANT (inventé)** → remplacé ; ligne « Votre projet ? » COUPÉE (signal de démarchage + doublon avec le contact M8 qui suit)._

- [x] 6.1 Liste : **4 lignes** (01 Ce portfolio · 02 ft_transcendence · 03 minishell · 04 cub3d) + lien « Tout est sur GitHub ↗ » ; ↗ de « Ce portfolio » → profil GitHub (repo privé — le rendre public + pointer le ↗ dessus = backlog M11) ; entrée nav « Projets » ; FilNode sur le « 05 » (7 ancres au DOM)
- [x] 6.2 Interactions (hover `bg-surface` + nudge de flèche `motion-reduce` safe) + rows en rise masqué staggeré ; reflux mobile par placement de grille explicite (`col-start`/`row-start`, un seul markup) ; **bonus : LinkedIn unifié** (`site.ts` corrigé avec l'URL courte réelle, NpEvolution consomme `siteConfig.links`)
- [x] 6.3 Rituel : mobile 390 (0 overflow) ✅ · reduced-motion (0 classe, opacity 1) ✅ · EN ✅ · review ✅ · typecheck/lint/build SSG ✅ · merge ff `21c268a` → main

_Notes M6 : validé SANS ajustement au checkpoint (module le plus court — 8 fichiers, +145). Backlog M10 : `sr-only` « nouvel onglet » sur les liens `target="_blank"`. Pré-M6 sur main (`20d65a2`) : `wheelMultiplier: 0.8`, acte 1 elloha 6→34 %, copy NP-E allégée, `localeDetection: false` (URL = seule source de vérité des locales)._

## ❌ M7 — Bandeau marquee + Chiffres — SUPPRIMÉ (décision Thibault 2026-07-19)

_Les vrais chiffres vivent déjà DANS les scènes (badges elloha, stats NP-Evolution) — une section count-up globale dupliquerait ou gonflerait artificiellement. Le marquee posait en plus un problème de copy employeur-safe. Page finale : arrivée → à propos → NP-Evolution → elloha → manifeste court → projets → contact._

## ✅ M8 — Contact + footer (référence : template suite section 06)

_Doublon tranché : le CONTACT garde « Le fil s'arrête ici. / À vous de le reprendre. » (choix Thibault) → **404 retitrée** « Ce fil ne mène nulle part. » / « This thread leads nowhere. ». La phrase du template (« Une mission freelance… ») = signal de démarchage BANNI → « Un projet, une question, ou simplement envie d'en parler — »._

- [x] 8.1 Section centrée : **connecteur fil** (trait dégradé `from-accent/0 to-accent` qui se dessine + anneau qui pop autour du FilNode — **8e et dernière ancre**, `styles/contact.css` branché sur RevealGroup via l'astuce `.contact-fil` qui neutralise son propre rise) + titre géant 2 lignes (2e italique accent) + **email en clair** mailto Fraunces italique souligné accent
- [x] 8.2 Footer DANS la section (comme le template) : © année calculée (passée en `String` — ICU formaterait « 2 026 ») · GitHub ↗ / LinkedIn ↗ via `siteConfig.links` · `LocaleSwitcher` réutilisé (2e instance, stateless). SANS localisation (décision)
- [x] 8.3 Copy validée du premier coup (EN : « The thread ends here. / Yours to pick up. ») + entrée nav « Contact »
- [x] 8.4 Rituel : mobile 390 (0 overflow) ✅ · reduced-motion (connecteur statique visible) ✅ · EN ✅ · 404 fr/en ✅ · review ✅ · typecheck/lint/build SSG ✅ · merge ff `48037e9` → main

_Notes M8 : 2 bugs attrapés en preview — `<p>` dans `<p>` (ScrambleText rend un `<p>` → wrapper `<div>` obligatoire, c'était une erreur d'hydratation) ; keyframe sans `to` explicite = retombe sur l'état de base caché (anim 0→0, connecteur invisible — fix `to { scaleY(1) }`, même pattern que reveal-dash). **LA PAGE EST COMPLÈTE** : arrivée → à propos → NP-E → elloha → manifeste → projets → contact._

## ✅ M9 — Le fil rouge (la couture finale)

_LA signature, livrée en 5 leçons (E1 tracé → E2 dessin → E4 naissance → E3 allumage → E5 robustesse) + rituel. Mécanisme : le vrai fil de portfolio-cinetique (la suite n'en avait pas), SANS GSAP — motion + refs. Décisions : fil DERRIÈRE le contenu (2 plongées narratives : sous l'encre du manifeste et sous le stage elloha pinné — la plongée elloha se coupe PILE au bord de la piste via une via dédiée) ; ancre About gardée sur le portrait ; hint scroll D4 = le fil seul qui pend après l'atterrissage ; **9 nœuds** (kicker « 02 » ajouté en cours de route) + **9 vias invisibles** (`FilVia`, guides de gouttières — plus aucun texte coupé)._

- [x] 9.1 Tracé statique : `FilRouge` premier enfant de main (peint derrière), mesure deltas-de-rects (nœud elloha sticky = formule au-repos), spline **Catmull-Rom CENTRIPÈTE** (α=.5 — la version uniforme du template part en épingle sur segments inégaux), viewBox 1:1, build après fonts.ready
- [x] 9.2 Dessin : dashoffset scrubbed, cible = regard (scrollY + 60%vh) via table longueur→y échantillonnée + **enveloppe monotone** + recherche binaire (le mapping linéaire du template est faux avec la piste elloha 190vh) ; naissance après l'événement `fil:origin-landed` du TravelingNode (couture 0.8s, filets timeout/voile-déjà-levé) ; allumage aux **seuils exacts en longueur de fil** (préfixes `toPartialPathD` + path de travail), réversible, nœuds 1 et pastille exclus (chorégraphies existantes)
- [x] 9.3 Robustesse : `applyMode()` unique + bascules matchMedia VIVANTES (lg + rm) + premier **ResizeObserver** du repo (debounce 200ms, rebuild idempotent) ; reduced-motion = fil complet statique nœuds pleins ; mobile = 0 fil, nœuds pleins ; pas de useSpring (Lenis suffit) ; 1 écriture style/frame
- [x] 9.4 Rituel : mobile 390 ✅ · rm ✅ · EN ✅ · parité ✅ · review ✅ · typecheck/lint/build SSG ✅ · merge ff `50359ae` → main

_Notes M9 : bonus — fix lightbox elloha (overlay `fixed` piégé par le `transform` de la dérive → `createPortal(document.body)`, l'image zoomée était inclinée à −5°). Le connecteur statique du contact est `lg:invisible` : en desktop c'est le FIL qui descend sa ligne et se noue sur la pastille. LE SITE EST COMPLET ET COUSU — reste M10 (polish) → M11 (live)._

## ✅ M10 — Polish global (2026-07-20, branche feat/polish → `785f8be`)

_Deux inventaires d'agents (perf + SEO/a11y) puis 5 passes. Le « ça rame » venait du
**halo curseur du hero** : mask radial repositionné = repaint du calque entier par frame._

- [x] 10.3 Perf : halo = **fenêtre composée en transform + grille contre-translatée**
  (zéro repaint, offsets page en cache) ; anneau curseur qui **s'endort** une fois convergé ;
  `priority` portrait ; fonts VÉRIFIÉES saines (129K les 4 woff2 — rien à faire) ;
  eager elloha conservé. Lighthouse mobile prod : 84 → **87** (TBT 20ms, CLS 0 ; LCP 3,6s
  = l'intro ASSUMÉE, décision : intacte)
- [x] 10.4 SEO : metadata complète par locale (OG + twitter + canonical + hreflang +
  themeColor), **og.png 1200×630 composée** (titre + fil + nœuds, HTML→playwright),
  **favicon « T. »** (le point = le nœud du fil ; hinomaru → ~/.trash), sitemap/robots/
  apple-icon en statique. Lighthouse **SEO 100, best-practices 100**
- [x] 10.2 A11y : `:focus-visible` accent global (critique avec cursor:none) · skip-link →
  #main · **12/12 alts localisés** (namespace clés alt*, aria-hidden du portrait retiré) ·
  8/8 liens externes « (nouvel onglet) » sr-only (namespace A11y) · nav labellisée · hero
  `<header>`→`<section>` · vérifié Tab/DOM playwright. Lighthouse **a11y 96** (résidus
  backlog : contraste petits labels accent, un label-content-name-mismatch)
- [x] 10.1 + revue guidée : hero — claim « 10 000+ pros » **SOURCÉE** (elloha.com l'affiche
  tel quel ; presse : 7 500→9 000→15 000+ en 2026 ; ≠ métrique des 19 000 utilisateurs/jour
  → aucune incohérence) ; vide mobile hero assumé (plein viewport) ; intros NP-E gardées ;
  **chevauchement carte avis elloha ASSUMÉ** (mesuré : la dérive ne dégage le couloir qu'à
  ~94% de piste — retard de l'acte 2 inefficace, revert commenté) ; bonus : lightbox portalée
- [x] 10.5 partiel : EN maintenue en parité tout du long (relecture Thibault ok) ;
  **README du repo → reporté** avec la décision repo public (11.3)
- [x] 10.6 Rituel complet + merge + push (deploy) + vérifs prod (OG/sitemap/robots/icons 200)

## 🟡 M11 — Mise en ligne (ANTICIPÉE le 2026-07-20, avant M10)

_Repo GitHub **privé** créé et poussé (`portfolio-2026`, fiches NDA vérifiées absentes) ;
déployé sur Vercel : **https://thibault-deverge.vercel.app** — vérifié en prod : `/` FR,
`/en`, 404 thématisée. Chaque push sur `main` redéploie._

- [x] 11.1 Vercel : en ligne sur `.vercel.app` — **domaine payant : NON, décision assumée
  2026-07-20** (commenté dans site.ts ; un futur domaine se branchera sans rien casser)
- [x] 11.2 Vérifs prod : Lighthouse mobile **87/96/100/100**, OG/sitemap/robots/icons 200,
  redirections/canonical fr-en OK
- [x] 11.3a **Repo PUBLIC** (décision 2026-07-20) : README réécrit (bannière og, concept
  du fil, partis pris, archi), description + homepage GitHub, ↗ « Ce portfolio » →
  github.com/thibault-deverge/portfolio-2026 (`ef8aa39`)
- [ ] 11.3b Annonce LinkedIn (profil à jour) 🎉 — le moment de Thibault

## 🧊 Phase 2 (backlog, après mise en ligne)

- [x] **2.1 Formulaire contact (Resend)** — livré en prod le 2026-07-20 (`422239e`) : repli
  « Pas de client mail ? » sous le mailto (email + message), server action + `useActionState`,
  état discriminé à clés i18n, gardes anti-spam (honeypot faux-succès · time-trap 3 s ·
  rate limit best-effort 3/10 min — invérifiable en dev, modules isolés par requête),
  `replyTo` = visiteur, page restée ● SSG. `RESEND_API_KEY` en `.env.local` + Vercel
  (⚠️ leçon : une env Vercel ne s'applique qu'aux deploys lancés APRÈS — redeploy
  nécessaire). Testé en réel local ET prod.
- [ ] 2.2 Palette ⌘K IA (Q&A sur son profil, claude-haiku) — SUIVANT. Garde-fous tokens
  exigés par Thibault : rate limit + plafond de dépense + prompt verrouillé
- Reste : prise de RDV Cal.com (⚠️ à jauger employeur-safe) · dark mode (déconseillé —
  l'identité EST le papier) · études de cas MDX (quand plus de projets)

**Backlog médias (décisions 2026-07-18)** : portrait actuel gardé (photo Vietnam traitée : grade + grain + voile terracotta, brutes sur `~/Desktop/photos-portrait/`) — Thibault envisage un abonnement Higgsfield début août pour retravailler les portraits (Soul entraîné sur ses photos) · boucle vidéo NP-Evolution reportée (outil pressenti : Cap, gratuit — sinon Screen Studio) ; M3 démarrera avec des captures fixes traitées.

---

_Historique des décisions : voir CLAUDE.md (contraintes) et la mémoire projet. Ce fichier est LA source de vérité de l'avancement — le mettre à jour à chaque fin de module. Rédaction : pas de hard wrap (une idée = une ligne, l'éditeur plie tout seul)._
