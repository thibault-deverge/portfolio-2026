# Progression — Roadmap du portfolio

> **La référence** : template `templates/portfolio-cinetique/` du projet Claude Design (`25a8ead9-8c98-4830-8a48-0d4c313f910d`, lisible via DesignSync `get_file`). On le suit quasi à l'identique, porté vers motion/react, copy retravaillée scène par scène.
> **Méthode** : un module à la fois — on ne passe au suivant que quand le précédent est parfait, reviewé, fignolé et validé par Thibault. Les étapes listées ici sont le niveau intermédiaire ; les micro-étapes (celles qu'on exécute une par une) sont définies au moment d'attaquer le module, et cochées ici au fur et à mesure.

## Le rituel de fin de module (identique pour tous)

1. Calibrage fin en preview (desktop 1440 / mobile 390 / reduced-motion, FR et EN)
2. `/review-changes` + `pnpm typecheck` + `pnpm lint` + `NODE_ENV=production pnpm build`
3. Validation Thibault sur son navigateur → commit (conventional EN, sans mention Claude)
4. Mise à jour de ce fichier (cocher, noter les décisions prises)

## Contraintes permanentes (rappel — détail dans CLAUDE.md et les rules)

- Employeur : AUCUNE mention « disponible / freelance » visible (la copy du template en a → reformuler)
- Elloha : visuels PUBLICS uniquement (NDA) · NP-Evolution : anonymisé (pas de données réelles)
- i18n : parité fr/en stricte, zéro texte hardcodé · tokens only, un seul accent
- Patterns SSR-safe (coquilles identiques, IO+classes, écritures par ref) · reduced-motion partout
- Une branche `feat/*` par module, mergée sur `main` en fin de module

---

## ✅ M0 — Socle (FAIT, mergé sur main)

Scaffold Next 16 + design system (tokens/fonts) + i18n fr/en + Lenis + Header v1 + Hero v1 (rideau/cascade/dérive — sera refait en M1) + 404 « Le fil s'arrête ici » + grand nettoyage (YAGNI : MDX, zod, gitkeep, orphelins) + visite guidée de la codebase.

## ⬜ M1 — L'arrivée : loader, header/nav, hero, curseur

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

- [ ] F1 ⚙️ Atelier copy hero FR→EN (employeur-safe)
- [ ] F2 ⚙️ Calibrage global + mobile + reduced-motion + retouches finales preloader
- [ ] F3 🎯 Rituel de fin de module + merge sur main + M1 coché ✅

## ⬜ M2 — Scène « À propos » (bio + portrait)

- [ ] 2.1 Structure : grid bio 1.35fr/1fr, numéro scramble `01`, titre 2 lignes, portrait 3/4
- [ ] 2.2 Système de reveal au scroll réutilisable (masques + stagger, déjà-visible vs on-scroll)
- [ ] 2.3 Parallax image (le portrait qui glisse dans son cadre)
- [ ] 2.4 Atelier copy bio (droit → Asie → 42 → dev, SA vraie histoire) + portrait (asset/Higgsfield)
- [ ] 2.5 Rituel de fin de module

## ⬜ M3 — Scène « NP-Evolution » (mission freelance)

- [ ] 3.1 Structure : header de section + tag, média 16/9, body + stat mise en avant
- [ ] 3.2 Média : capture/vidéo de l'app ANONYMISÉE (vraie copy : bilans de compétences, Next/Prisma/eIDAS — pas le « cabinet de conseil » du placeholder)
- [ ] 3.3 Atelier copy + vraie stat (ou formulation honnête sans chiffre inventé)
- [ ] 3.4 Rituel de fin de module

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

---

_Historique des décisions : voir CLAUDE.md (contraintes) et la mémoire projet. Ce fichier est LA source de vérité de l'avancement — le mettre à jour à chaque fin de module. Rédaction : pas de hard wrap (une idée = une ligne, l'éditeur plie tout seul)._
