# Silver Play — Project Context

**Source of truth for content:** https://silverplay.in (Shopify store)
**Scope:** design mockup / prototype. No cart, checkout, or Storefront API.
**Stack:** Next.js 16.3 (App Router, Turbopack) · TypeScript · Tailwind v4 ·
Framer Motion 13 · Lenis

## Brand
- Name: Silver Play · Tagline: "Think Silver. Think Silver Play"
- Descriptor: handcrafted sterling silver jewellery, forged for the woman who
  wears her story
- 925 sterling / BIS certified / artisan crafted in India (Jaipur atelier)
- Curated by Dalljiet Kaur · care@silverplay.in
- Catalogue: 233 products, 74 collections, ₹1,250 – ₹34,999
- Product types: Earrings (192), Pendants (89), Rakhi

## Design system
Palette (from user's supplied palette screenshot — replaces the live site's
brown/gold):

| Token | Value | Use |
|---|---|---|
| `ink` | `#1A1614` | dark ground, footer, scrims |
| `ink-2/3/4` | `#211D1A` `#2B2622` `#3A342F` | elevated dark surfaces |
| `bone` | `#F5F2ED` | page background, light type |
| `bone-2/3` | `#EBE7E0` `#DED9D1` | image wells, hover states |
| `ash` | `#C9C6C0` | muted type (T80) |
| `ash-2/3` | `#A9A59F` `#8A857F` | eyebrows, meta |

Type: Cinzel (display) · Cinzel Decorative (flourish) · Cormorant Garamond
(body + the italic hero line) · Tiro Devanagari Hindi (Hindi collection names).

Curvature — the user asked for "slight curve in whole site as it looks
premium". Radius tokens: `--radius-xs` `.5rem` → `--radius-2xl` `3rem`.
Hero and footer are inset rounded cards; product images `--radius-md`;
buttons are pills.

## Files
- `src/data/site.ts` — all brand copy, nav, edits, intentions, FAQ, journal
- `src/data/products.json` — 233 products (title, price, images, tags)
- `src/data/collections.json` — 74 collections
- `src/data/collection-products.json` — collection → product handle map
- `src/lib/catalog.ts` — typed accessors, short-collection backfill
- `src/lib/shopifyLoader.ts` — custom next/image loader (see below)
- `src/components/motion/` — Reveal, Stagger, SplitText, Parallax, Marquee,
  MagneticCta

## Gotchas
- Source PNGs are 2–5 MB and time out Next's image optimizer. A custom loader
  rewrites Shopify URLs to the CDN's `_{width}x` suffix. `?width=` /
  `?format=webp` do **not** work on `silverplay.in/cdn/*` — only the filename
  suffix does.
- Any dark scrim over a hero photo needs an explicit dark container background,
  or the pre-load frame flashes pale.
- The Browser pane's `preview_start` launcher fails with `EPERM: uv_cwd` on this
  Mac. Start the dev server from a shell instead.
- Pane screenshots sometimes return stale blank frames; verify with JS.

## Section queue
Done: Header · Hero · Assurance marquee · Bestsellers · Footer
Pending screenshots: Featured Collections · Curated Edits · Shop By Occasion ·
Archive Silver Treasure · Crafted Like Heirlooms · Shop By Intention ·
Kavach Pendants · Journal · FAQ
