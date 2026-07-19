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

## ⬜ M8 — Contact + footer (référence : template suite section 06)

_⚠️ Le titre du template (« Le fil s'arrête ici. / À vous de le reprendre. ») DOUBLE notre 404 — trancher lequel change. Le fil se termine visuellement sur un nœud (raccord M9)._

- [ ] 8.1 Titre géant + CTA mailto italique souligné + email en clair
- [ ] 8.2 Footer : localisation réelle, GitHub/LinkedIn (pas de Dribbble), année
- [ ] 8.3 Atelier copy + branchement des ancres de nav restées en attente
- [ ] 8.4 Rituel de fin de module

## ⬜ M9 — Le fil rouge (la couture finale)

_La signature : le SVG qui se dessine au scroll à travers toutes les scènes, avec ses nœuds qui s'allument. Architecture validée en annexe du plan (mesure des `data-fil-node`, spline, dashoffset par ref, ResizeObserver) — à confronter à la version plus simple du template (zigzag par section) au moment de choisir._

- [ ] 9.1 Poser/vérifier les ancres `data-fil-node` dans chaque scène + tracé statique complet
- [ ] 9.2 Dessin au scroll + nœuds qui s'allument au passage + intro au load
- [ ] 9.3 Robustesse : resize, fonts, reduced-motion (fil complet statique), perf
- [ ] 9.4 Rituel de fin de module

## ⬜ M10 — Polish global

- [ ] 10.1 Passe mobile complète (versions simplifiées des scènes pinnées)
- [ ] 10.2 Audit a11y (/a11y-check) + reduced-motion de bout en bout + navigation clavier
- [ ] 10.3 Perf (/perf-audit) : images (formats/sizes), LCP, poids JS
- [ ] 10.4 SEO : metadata OG/twitter, sitemap, robots, favicon/manifest
- [ ] 10.5 Passe copy EN intégrale (relecture d'un bloc) + README du repo réécrit
- [ ] 10.6 Rituel de fin de module

## ⬜ M11 — Mise en ligne

- [ ] 11.1 Vercel : projet, domaine définitif (TODO site.ts), variables d'env
- [ ] 11.2 Vérifs prod (Lighthouse, partage OG, 404, redirections /fr)
- [ ] 11.3 Annonce LinkedIn/GitHub (profil à jour) 🎉

## 🧊 Phase 2 (backlog, après mise en ligne)

Formulaire contact (Resend) · prise de RDV Cal.com · palette ⌘K IA (Q&A sur son profil, claude-haiku) · dark mode · étude de cas détaillée par projet si besoin (réintroduire MDX).

**Backlog médias (décisions 2026-07-18)** : portrait actuel gardé (photo Vietnam traitée : grade + grain + voile terracotta, brutes sur `~/Desktop/photos-portrait/`) — Thibault envisage un abonnement Higgsfield début août pour retravailler les portraits (Soul entraîné sur ses photos) · boucle vidéo NP-Evolution reportée (outil pressenti : Cap, gratuit — sinon Screen Studio) ; M3 démarrera avec des captures fixes traitées.

---

_Historique des décisions : voir CLAUDE.md (contraintes) et la mémoire projet. Ce fichier est LA source de vérité de l'avancement — le mettre à jour à chaque fin de module. Rédaction : pas de hard wrap (une idée = une ligne, l'éditeur plie tout seul)._
