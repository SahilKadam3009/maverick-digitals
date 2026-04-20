# Design Brief — Maverick Digitals

## Direction
Maverick Digitals Premium Agency — immersive handcrafted digital experience with luxury tech aesthetic. Neon-infused glassmorphism, asymmetric layouts, cinematic micro-interactions, and custom geometric iconography replace all AI-generated marks.

## Tone
Luxury tech maximalism executed with precision — bold neon purple/cyan accents on ultra-dark surfaces, editorial composition, premium without excess. Human-crafted geometric forms (not stock icons) reinforce authenticity.

## Differentiation
Neon-bordered glassmorphic panels with edge-only glow on ultra-dark backgrounds create dimensional depth; custom geometric icon marks (industry categories, process steps, features) replace all generic Lucide icons — the site feels distinctly handmade, never templated or AI-generated.

## Color Palette

| Token        | OKLCH Light        | OKLCH Dark         | Role                          |
| ------------ | ------------------ | ------------------ | ----------------------------- |
| background   | 0.975 0.004 280    | 0.09 0 0           | Premium off-white / Ultra-dark |
| card         | 0.99 0.002 280     | 0.13 0 0           | Light card / Glass panel      |
| foreground   | 0.1 0.01 265       | 0.94 0 0           | Deep navy text / White text   |
| primary      | 0.55 0.26 308      | 0.68 0.24 308      | Neon purple (CTA, accent)     |
| secondary    | 0.58 0.2 200       | 0.72 0.19 200      | Neon cyan (secondary accent)  |
| accent       | 0.52 0.24 260      | 0.65 0.22 260      | Electric blue (highlights)    |
| border       | 0.88 0.008 280     | 0.22 0 0           | Light / Dark dividers         |
| muted        | 0.94 0.006 280     | 0.18 0 0           | Secondary surfaces (both)     |

## Typography

| Level     | Light Mode          | Dark Mode           | Usage                    |
| --------- | ------------------- | ------------------- | ------------------------ |
| Display   | Space Grotesk 700   | Space Grotesk 700   | Hero, section titles     |
| H1        | 56–64px bold        | 56–64px bold        | Hero headline            |
| H2        | 32–40px bold        | 32–40px bold        | Section heading          |
| H3        | 24–28px semi-bold   | 24–28px semi-bold   | Card title              |
| Body      | Inter 400 16px      | Inter 400 16px      | Body text, readable     |
| Label     | Inter 500 14px      | Inter 500 14px      | UI labels, captions     |
| Caption   | Inter 400 12px      | Inter 400 12px      | Meta text, hints        |
| Mono      | JetBrains Mono 400  | JetBrains Mono 400  | Code, technical accents |

## Elevation & Depth

Light mode: subtle shadows (0 4px 12px rgba(0,0,0,0.12)), soft card backgrounds (0.99 L), minimal glow. Dark mode: glassmorphic cards (0.13 L, 12–16px blur) with 1–2px white/neon borders, layered shadows, neon glow (0 0 24px rgba primary / 0.4).

## Structural Zones

| Zone       | Light Background | Dark Background | Border              | Notes                                   |
| ---------- | ---------------- | --------------- | ------------------- | --------------------------------------- |
| Header     | 0.975 L          | 0.09 L gradient | bottom 0.88 / 0.22  | Sticky PillNav, compact, minimal       |
| Hero       | gradient accent  | 0.09 L + balls  | —                   | Ballpit animation, full-width CTA      |
| Content    | 0.975 / 0.94 L   | 0.09 / 0.12 L   | —                   | Section alternation for rhythm         |
| Card       | 0.99 L shadow    | 0.13 L glow     | 1px border/neon     | Glassmorphism, 3D tilt hover, parallax |
| Footer     | 0.94 L           | 0.12 L          | top 0.88 / 0.22     | Multi-column, subtle hover             |

## Spacing & Rhythm

6–8px base grid; 24–48px section padding (py-20 sm:py-28); card padding 16–24px; content gaps 16–32px; label spacing 8px; text-balance on all headings for rhythm.

## Component Patterns

- **Buttons**: rounded-lg (10px), gradient fill (primary→accent), glow on hover (0.3s), text bold, uppercase letter-spacing
- **Cards**: rounded-lg, light: shadow-subtle + bg-card; dark: glassmorphic + 1px border neon, glow-neon on hover
- **Badges**: inline neon text (no bg), semi-bold 12px, uppercase, letter-spacing 0.5px
- **Forms**: input 0.9 L (light) / 0.2 L (dark), border 0.88 / 0.22, focus ring primary 0.7 opacity

## Icon Design Principles

**Remove all generic Lucide icons. Replace with custom geometric marks:**

1. **Industry category marks** (8 icons):
   - E-commerce: minimalist stacked boxes outline, 2px stroke
   - SaaS: tilted grid/dashboard grid, 2px stroke
   - Healthcare: simplified cross/medical symbol, single line 2px
   - Real Estate: house silhouette outline, geometric 2px
   - Education: open book outline, clean 2px stroke
   - Travel: minimalist plane/compass combo, 2px stroke
   - Fashion: clothing hanger or A-line silhouette, 2px stroke
   - Coaching: people/network nodes outline, 2px stroke

2. **Process step marks** (01–05):
   - Use bold numerals (Space Grotesk bold 32–40px) as primary visual
   - Minimal geometric accent: thin circle or line behind numeral
   - No icon — typography-focused, editorial aesthetic

3. **Feature/WhyChooseUs marks** (4 marks):
   - Strategy: minimalist nested triangles or growth arrow (single stroke 2px)
   - Results: chart/graph outline (2px bars/line)
   - Speed: lightning bolt simplified single-line (2px)
   - Support: chat bubble outline or handshake outline (2px stroke)

4. **Contact section marks**:
   - Email: envelope outline (1.5–2px stroke)
   - Phone: phone receiver outline (2px stroke)
   - Address: map pin outline (2px stroke)
   - LinkedIn: clean word mark only, no icon silhouette

**All custom marks:**
- Single-line stroke (1.5–2px), no fill unless intentional
- OKLCH color: primary or secondary (inherit from section theme)
- Size: 24–32px for section icons, 16–20px for inline/button icons
- SVG format, minimal complexity (fewer than 8 points per shape)
- Consistent stroke width across all marks
- Geometric + editorial, avoid organic/rounded curves

## Motion

- **Entrance**: fade + scale-in on scroll, 0.6s ease-out
- **Hover**: scale 1.02, glow intensify, border brighten, 0.3s smooth transition-smooth
- **Decorative**: scroll-linked parallax (2–5px offset), floating animations on hero, orbit rotations smooth and deliberate
- **Interaction**: button ripple glow, card 3D tilt on pointer move, smooth label swoosh on PillNav

## Constraints

- No generic stock icons; all marks are custom geometric forms
- Glassmorphism only on interactive/content cards; never on typography
- Neon glows restrained (4–24px blur) to prevent content washout
- No bounce/elastic animations; all motion smooth and intentional
- Dark: 7:1+ contrast for text; neon only for interactive elements
- Light: 4.5:1+ contrast minimum; avoid white text on neon backgrounds
- All animations and 3D effects untouched — design guidance only

## Signature Detail

Custom geometric icon marks (thin-stroke, editorial) replace all AI-generated generic icons — paired with neon-bordered glassmorphic cards and scroll-linked parallax, the design communicates premium handcrafted authenticity that no template could replicate.
