# Portfolio Thibault Deverge — conventions du design system

Portfolio freelance bilingue (FR/EN), éditorial, chaleureux, light mode uniquement.
Signature : le « fil rouge » terracotta (un parcours non linéaire relié par un fil).

## Tokens (source de vérité : `tokens/tokens.css`, importé par `styles.css`)

Couleurs — TOUJOURS via `var(--*)`, jamais de hex en dur :
`--color-paper` #f5f1ea (fond) · `--color-surface` #fbf8f3 (cartes) · `--color-ink` #1a1a18
(texte) · `--color-ink-muted` #6f6a60 (secondaire) · `--color-accent` #d85a30 (terracotta,
LE SEUL accent) · `--color-hairline` #e5e0d8 (bordures 1px).

Fonts : `--font-display` (Fraunces — titres ; classe utilitaire `.font-display` = opsz auto
+ ss01 + tracking -0.025em ; l'italique = voix « signature ») · `--font-sans` (Geist — UI,
corps) · `--font-mono` (Geist Mono — labels techniques, eyebrows, chiffres ; classe `.font-mono`).

## Classes fournies par `styles.css`

- `.blueprint-grid` — filigrane grille technique (46px), fondu vers la gauche et haut/bas.
- `.blueprint-grid-light` — couche « allumée » de la même grille, révélée dans un halo radial
  positionné par `--mx`/`--my` (dans l'app : suit le curseur).
- `.font-display`, `.font-mono` — voir Fonts.

## Règles de composition (non négociables)

- **Un seul accent** : le terracotta sert au fil rouge, aux nœuds (ronds 6-12px), aux liens
  primaires, aux numéros. Jamais de 2e couleur vive.
- Hiérarchie typographique AFFIRMÉE : display en clamp() très grand vs corps sobre ;
  contraste ink vs ink-muted pour les deux temps d'une phrase.
- Espacements : contenu max 1240px, padding latéral 24/40/56px, indentation éditoriale 6-8vw
  pour les « chutes » de titres. Rayons 6px max.
- Motion : 150-300 ms ease-out, reveals en léger stagger ; UNE signature spectaculaire (le fil
  qui se dessine au scroll), tout le reste murmure ; toujours respecter prefers-reduced-motion.
- Interdits (anti-générique) : gradients violets, glassmorphism décoratif, particules, barres
  de compétences, hero « Hi, I'm X », dark indigo, curseur custom géant.

## Exemple idiomatique

```html
<section style="background: var(--color-paper); color: var(--color-ink)">
  <p class="font-mono" style="font-size:11px; letter-spacing:.18em; text-transform:uppercase;
     color: var(--color-ink-muted)">01 · Parcours</p>
  <h2 class="font-display" style="font-size:clamp(1.8rem,3.4vw,2.8rem); font-weight:500">
    Un seul fil relie <span style="color:var(--color-accent)">tout</span> le parcours.
  </h2>
</section>
```

Références visuelles : cartes `Colors`, `Type`, `Header` (bandeau d'identité, 2 états),
`Hero` (écran d'ouverture). Les sections Parcours/Projets/Contact ne sont pas encore
designées — les concevoir dans ce langage.
