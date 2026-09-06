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
- Pane screenshots sometimes return stale/blank frames after scroll-driven
  changes; verify via computed style/DOM measurement, not just the image.
- Windows dev machine: `next build` and `next dev` cannot hold `.next/` at the
  same time (EPERM) — stop the dev server before building. A transient
  `Cannot find name 'LayoutProps'` tsc error right after deleting `.next`
  resolves once `next dev` regenerates route types; not a real bug.
- Framer Motion `drag="x"` + `mx-auto` (or any margin-based centering) on the
  *same* element: FM's drag-constraint measurement can apply an inline
  `transform: translateX(Npx)` that exactly duplicates the margin offset,
  double-shifting the element off-center. Fix: never center the draggable
  element itself — wrap it in a plain (non-motion) parent using
  `flex justify-center` instead.
- A percentage width (`w-full`, `max-w-*` alone) on a child of a CSS Grid
  column sized `auto` (e.g. `grid-cols-[auto_1fr_auto]`) has no definite size
  to resolve against and collapses toward 0. Use an explicit fixed width
  (`w-[220px]`) for anything living in an `auto` grid track.
- `createPortal(node, document.body)` is required for any `position: fixed`
  modal that lives under a `<Reveal>` (Framer Motion transform breaks
  viewport-relative fixed positioning for descendants). Established pattern —
  reused by QuickViewModal, Tilt3DModal, ReelModal.
- `.heritage-sec` (CSS: `position:relative; isolation:isolate`) is required on
  any section that layers a `z-index:-1` photo + overlay background, or the
  background paints behind the section's own bg instead of above it.
- CSS Grid sticky sidebar: put `md:items-start` on the grid and
  `md:sticky md:top-N` on the shorter child only — its containing block
  becomes the (taller) row while it stays natural height.
- The Browser pane can spuriously return `net::ERR_BLOCKED_BY_CLIENT` for
  `_next/static/*`/image requests on a deployed (non-localhost) origin,
  making a perfectly good deploy look broken (unstyled layout, images
  collapsed to viewport size) inside the pane. Before concluding a
  Vercel/production deploy is broken, verify with a direct `curl` (HTML
  200, the actual CSS bundle 200 and containing the expected rule, a real
  asset URL 200) — bypasses the pane entirely.
- Testing a Lenis/GSAP scroll-linked section: `window.scrollTo()` is an
  unreliable proxy (see existing note). To check whether Framer Motion's
  `useScroll`/`useTransform` is really tracking, dispatch a real wheel
  scroll (`computer` tool's `scroll` action) and read the target's live
  computed `transform`, not just scrollY. A section can be mechanically
  correct yet still feel "broken" to a user if its scroll distance
  (e.g. `items.length * 85vh`) is so long that one normal scroll gesture
  only moves the content a few percent — tune the vh-per-item multiplier
  for perceptible movement, don't assume the hook is broken.
- Screenshot staleness (existing gotcha) can persist across several
  scroll/JS-triggered repaints in the same tab; when a screenshot
  contradicts a direct DOM/computed-style check, trust the DOM check and
  force a fresh capture via a hard `navigate` reload rather than retrying
  screenshot alone.

## Section queue
Homepage, shop/collections (dark filter sidebar + fixed bg photo), and product
page are all fully built out — this list is no longer accurate as a todo and
is kept only as a historical note. See [[silverplay-product-page]] and
BUILD_LOG.md for what actually shipped and when.
