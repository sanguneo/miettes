# Miettes site — design contract

## 0. Research Log
- Brand reference (contract): `assets/og.png` / app icon — warm watercolor croissant + mouse, cream paper, brown wordmark, croissant-orange accents. The page takes its palette, softness, and tone from this art.
- Layer A mood: soft / calm editorial (warm paper, generous whitespace, rounded cards, no gloss).
- Skipped lanes: Lazyweb screen research and Imagen concept drafts were not run. This is a single download page for an existing brand, and the brand art already fixes the visual direction.

## 1. Tokens
| Token | Value | Use |
|---|---|---|
| `--cream` | `#FBF5EA` | page background (matches launcher background) |
| `--paper` | `#FFFDF8` | cards, header |
| `--ink` | `#3B2414` | body text |
| `--brown` | `#7A3E1B` | headings, wordmark, primary button |
| `--crust` | `#C8742A` | accent (icons, eyebrow, links on hover) |
| `--crumb` | `#F3DFC2` | soft fills, icon tiles |
| `--muted` | `#7C6553` | secondary text (AA on cream) |
| `--line` | `rgba(59,36,20,.10)` | hairlines, card borders |
| radius | `20px` cards, `999px` pills, `36px` phone frame |
| shadow | `0 1px 2px rgba(59,36,20,.06), 0 12px 32px -12px rgba(59,36,20,.18)` |

## 2. Typography
Pretendard Variable (dynamic subset). H1 clamp(34px, 5.2vw, 60px)/1.15 weight 800, tracking -0.02em. H2 clamp(26px, 3.4vw, 38px) weight 800. Body 17px/1.75. Small 14px.

## 3. Layout
Max width 1120px, 24px gutters. Section order follows the visitor's decision path: hook (hero + download) → greeting → story (name, why) → principles (4) → features → install → honest limits → closing CTA + footer.
Breakpoints: ≤720px single column; hero stacks text then phone.

## 4. Primitives
Button (primary brown fill / secondary paper with hairline), Pill (meta chips), Card (paper, hairline, radius 20), IconTile (48px crumb square with SVG Lucide-style stroke icon in crust), Step (numbered circle), Phone frame (demo GIF).

## 5. Motion
Only interaction feedback: buttons lift 1px and darken on hover (transform/opacity only). `scroll-behavior: smooth` disabled under `prefers-reduced-motion`.

## 6. Accessibility
`lang="ko"`, AA contrast for all text tokens on cream/paper, visible `:focus-visible` ring (crust, 3px), alt text on every image, decorative SVGs `aria-hidden`.

## 7. Accepted debt
- Demo GIF is ~4 MB. It is lazy-loaded and has explicit dimensions.
- Web font comes from a CDN (jsDelivr). System Korean fonts are the fallback.
