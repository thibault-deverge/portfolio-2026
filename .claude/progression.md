# Progression — Roadmap du portfolio

> **La référence** : template `templates/portfolio-cinetique/` du projet Claude Design (`25a8ead9-8c98-4830-8a48-0d4c313f910d`, lisible via DesignSync `get_file`). On le suit quasi à l'identique, porté vers motion/react, copy retravaillée scène par scène.
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

_Notes M3 : grammaire de reveals V2 (validée par Thibault, réutilisable M4-M8) : mots en blur-in (`data-reveal-words`, wrap post-hydratation), wipes directionnels (`data-reveal-wipe="left|right|up"`), tirets qui se dessinent (`.reveal-dash`), listes item par item — inspirée 21st.dev, fabriquée maison. Passe Tailwind canonique faite (aspect-a/b). Capture discussion NON utilisée (messages de test) — refaire une demo propre si besoin un jour._

## ⬜ M4 — Scène « Elloha » (galerie pinnée)

_La plus technique : section 240vh, stage sticky, galerie inclinée −5° qui dérive en diagonale au scroll, 2 paragraphes en cross-fade selon la progression._

- [ ] 4.1 Squelette pinning (sticky + piste haute) + galerie statique (visuels PUBLICS)
- [ ] 4.2 Dérive scrubbed de la galerie + cross-fade des paragraphes par fenêtres de progress
- [ ] 4.3 Atelier copy (vrai rôle : dev front-end, vraie échelle 10 000+ clients / 60+ canaux)
- [ ] 4.4 Rituel de fin de module

## ⬜ M5 — Scène « Manifeste »

- [ ] 5.1 Titre géant 2 lignes indentées + body (reveals du système M2 — module léger)
- [ ] 5.2 Atelier copy (sa vision du métier, ton juste, pas pompeux)
- [ ] 5.3 Rituel de fin de module

## ⬜ M6 — Scène « Projets » (scroll horizontal pinné)

- [ ] 6.1 Track horizontal pinné (x = −(scrollWidth − viewport), scrub) + cartes
- [ ] 6.2 Contenu réel : remplacer les 4 projets fictifs par les siens (42 : libft, minishell… + autres) — sélection et visuels avec Thibault
- [ ] 6.3 Interactions cartes (hover zoom, numéros) + atelier copy des descriptions
- [ ] 6.4 Rituel de fin de module

## ⬜ M7 — Bandeau marquee + Chiffres

- [ ] 7.1 Marquee (vitesse couplée au scroll) — copy à reformuler (PAS « disponible pour de nouvelles missions » → employeur-safe, à décider ensemble)
- [ ] 7.2 Chiffres : count-up au scroll — VRAIES stats à choisir (pas 48 projets/12 clients)
- [ ] 7.3 Rituel de fin de module

## ⬜ M8 — Contact + footer

- [ ] 8.1 Titre 3 lignes géant + CTA mailto pill magnétique + email en clair
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
