# Silver Play Revamp — Project Handoff

Read this before touching any code. It is written for a Claude session that has
never seen this project before.

## 1. What this is

A ground-up visual redesign of **silverplay.in**, a Shopify storefront selling
handcrafted 925 sterling silver jewellery (earrings, pendants, rakhis) made in
Jaipur, India. The client drives the redesign **one section at a time**: they
paste a reference screenshot (usually another brand's site, or a Pinterest/
Fiverr-style mockup), name which section of Silver Play it's for, and expect
that section rebuilt to match the reference's layout/animation — using Silver
Play's own real copy, prices, and product photography.

**This is a design mockup, not the live storefront.** All product and
collection data is static JSON scraped once from the real store. There is no
cart, checkout, or Storefront API integration, and none should be added unless
the client explicitly asks to go to production.

The client is non-technical-sounding but decisive: short instructions, expects
fast turnaround, gets impatient with narration ("do fast why so much time").
Give them working code and brief confirmations, not process commentary.

## 2. Stack

- **Next.js 16.3**, App Router, TypeScript, `src/` dir, `@/*` import alias
- **Tailwind CSS v4** (the new CSS-first `@theme inline` config, not a JS config file)
- **Framer Motion 13** for all animation
- **Lenis** for momentum/smooth scrolling, exposed globally as `window.__lenis`
- No database, no backend, no auth. Everything is static/client-rendered.

Run it:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. Build for production with `npm run build`.

### Known environment quirk (may not apply on your machine)

On the machine this was built on, `mcp__Claude_Browser__preview_start` (the
Claude Code browser-preview launcher) could not start the dev server —
`EPERM: operation not permitted, uv_cwd`. The workaround was starting Next
directly from a shell (`node ./node_modules/next/dist/bin/next dev -p 3000 &`)
and pointing the preview pane at the resulting URL. If you hit the same error,
do the same.

Also on that machine, the browser preview pane intermittently returned **stale
blank screenshots** after JS-driven scrolling, even though the DOM was fully
painted. If a screenshot looks blank, verify with `javascript_tool` (check
`getComputedStyle`, `getBoundingClientRect`, `element.textContent`) before
concluding the page is broken — it usually isn't.

## 3. Where everything lives

```
src/
  app/
    layout.tsx       — fonts (Google, via next/font), <SmoothScroll/>, root shell
    globals.css       — ALL design tokens: colors, radii, fonts, keyframes
    page.tsx          — homepage; assembles sections in order
  components/
    layout/
      Header.tsx      — sticky nav, transparent-over-hero → floating pill on scroll
      Footer.tsx      — inset rounded dark card, link columns
    motion/           — reusable animation primitives (see §5)
    sections/         — one file per homepage section (see §6)
    ProductCard.tsx   — grid-style product tile (image crossfade, quick-view)
    EditCard.tsx      — pale editorial panel tile (style chip, name, price)
    SmoothScroll.tsx  — mounts Lenis, exposes window.__lenis
  data/
    site.ts           — ALL brand copy: nav, hero text, edits, intentions,
                        FAQ, journal, footer links — hand-written, copied
                        verbatim from the live site
    products.json     — 233 real products scraped from the store
    collections.json  — 74 real collections scraped from the store
    collection-products.json — {collectionHandle: [productHandle, ...]}
                        for the ~31 collections actually referenced in site.ts
  lib/
    catalog.ts        — typed accessors over the JSON above (getProduct,
                        collectionProducts, bestsellers, chipFor, taglineFor)
    shopifyLoader.ts  — custom next/image loader (see §4 — important)
    utils.ts          — cn() classname merge, inr() currency formatter
next.config.ts        — wires the custom image loader
.claude/launch.json    — dev server launch config for Claude Code's browser preview
memory.md              — condensed project brief (palette, structure, gotchas)
BUILD_LOG.md            — dated changelog of what was built and why, session by session
```

## 4. The image pipeline (read this before touching any `<Image>`)

**All imagery is hotlinked from the live Shopify CDN** — `cdn.shopify.com` and
`silverplay.in/cdn/*`. The client explicitly asked to use only the site's real
photography, so this is deliberate, not a placeholder to replace later.

The source PNGs are 2–5 MB. Routed through Next's built-in image optimizer
they blow past its upstream fetch timeout and render broken
(`upstream image response timed out`). The fix: `src/lib/shopifyLoader.ts` is
registered as a **custom loader** (`images.loader: "custom"` in
`next.config.ts`). It rewrites any Shopify URL to the CDN's own
`_{width}x` filename-suffix resizing convention and lets Shopify do the
resizing; the browser negotiates WebP via its own Accept header.

```
https://cdn.shopify.com/.../SomeProduct.png?v=123
  → https://cdn.shopify.com/.../SomeProduct_800x.png?v=123
```

**Important:** `?width=` and `?format=webp` query params do **not** work on
`silverplay.in/cdn/*` URLs — only the filename-suffix form does. Don't "fix"
the loader to use query params; it was tried and fails silently (200 OK, but
un-resized).

Non-Shopify image sources pass through the loader untouched, so `next/image`
still works normally for anything else.

If you add a hero-style image with a dark scrim over it, give the *container*
an explicit dark background (e.g. `bg-ink`), not just the scrim gradient —
otherwise there's a visible pale flash before the photo decodes.

## 5. Animation primitives (`src/components/motion/`)

All respect `prefers-reduced-motion` (either directly or via the global CSS
override in `globals.css`). Reuse these instead of writing new Framer Motion
boilerplate per section:

- **`Reveal`** — single element fade/slide/blur-in when scrolled into view.
  Props: `direction` (`up|down|left|right|none`), `delay`, `duration`, `blur`.
- **`Stagger` / `StaggerItem`** — wrap a list; children cascade in with
  `staggerChildren`. Use for grids of cards.
- **`SplitText`** — headline that rises word-by-word or char-by-char from
  behind a mask, `aria-label`led for accessibility. Use for section headings.
- **`Parallax`** — scroll-linked vertical drift + optional scale, spring-smoothed.
- **`Marquee`** — seamless infinite horizontal ticker (double-track, no seam).
  Used for the trust-badge banner.
- **`MagneticCta`** — link that leans toward the cursor with a fill-wipe hover.
- **`SmoothScroll`** — mounted once in `layout.tsx`; owns the Lenis instance
  and exposes it as `window.__lenis` so any component can call
  `window.__lenis.scrollTo(...)` (used by the carousel's arrow buttons).

### The scroll-driven carousel pattern

`RoyalSimplicity.tsx` established a reusable pattern for any future
horizontal "deck" section (lookbooks, heritage strips, etc.) — **not** a
click-only slider library:

1. Make the section much taller than the viewport (`(items+1) * 85vh`).
2. Put a `sticky top-0 h-screen` stage inside it.
3. `useScroll({ target: sectionRef, offset: ["start start", "end end"] })`
   gives 0→1 progress as the user scrolls through the tall section.
4. Feed that through a `useSpring` and map it to the track's `x` transform —
   this makes the deck advance *with* scroll position, not on a timer.
5. Derive the "active" card index from the same progress value
   (`useMotionValueEvent`) so text emphasis and scale stay in sync.
6. Prev/next arrows compute a target scroll offset and call
   `window.__lenis.scrollTo(...)` — same source of truth as natural scrolling,
   so the two never fight each other.

Copy this shape rather than reaching for Embla/Swiper/etc.

## 6. Homepage sections built so far (in order)

1. **`Header`** — full-width, transparent, overlaid on the hero. Once scrolled
   past ~70% of the viewport height it animates into a floating rounded
   "pill" nav (background, border-radius, margin, and width are all animated
   together, not just opacity).
2. **`Hero`** — edge-to-edge (no inset, no corner radius — the client
   corrected an earlier inset-card version). Full-bleed photo, 2.2s slow
   zoom-in, upright caps line ("THINK SILVER.") stacked over an oversized
   italic Cormorant line ("Think Silver Play"), staggered blur-in, pill CTAs,
   animated scroll cue. Background photo is `bg-ink` based so there's no pale
   flash before it loads.
3. **`AssuranceBar`** — the live site's trust-badge row (BIS Certified, 925
   Sterling Silver, etc.) as a `Marquee`.
4. **`GenZEdit`** — "Gen Z — It Girl" curated edit. Pale `EditCard` panels
   (style chip / image / name / price) in a 4-up grid, built from a supplied
   Fiverr-style product-card reference image. Real products: Feathered
   Sparrow, Butterfly Flutter, Triangular Sword, Dragonfly Whisper earrings.
5. **`RoyalSimplicity`** — "Her Royal Simplicity" curated edit as the
   scroll-driven carousel described in §5. Real products: Turquoise Blossom
   Grace, Emerald Sunburst Jewel, Flower Stud, Half Moon Sophistication, Twin
   Line Minimalist earrings.
6. **Bestsellers grid** (inline in `page.tsx`) — the four products actually
   featured on the live homepage, using `ProductCard` (grid tile with hover
   image crossfade, discount/sold-out pills, quick-view slide-up).
7. **`Footer`** — inset rounded dark card (this one *does* keep the inset/
   curve treatment — only the hero's inset was removed per client feedback).
8. A **"Build Queue"** placeholder grid at the bottom of `page.tsx` lists every
   section still awaiting a client screenshot. Remove each entry as its
   section gets built.

## 7. Design system (`src/app/globals.css`)

The palette was **replaced once already** — the live site's brown/gold scheme
was swapped for a warm monochrome the client specified via a screenshot of a
Figma/palette tool:

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#1A1614` | near-black ground, footer, scrims, dark cards |
| `--color-ink-2/3/4` | `#211D1A` / `#2B2622` / `#3A342F` | elevated dark surfaces |
| `--color-bone` | `#F5F2ED` | page background, light type |
| `--color-bone-2/3` | `#EBE7E0` / `#DED9D1` | image wells, editorial section backgrounds |
| `--color-ash` | `#C9C6C0` | muted secondary type |
| `--color-ash-2/3` | `#A9A59F` / `#8A857F` | eyebrows, captions, meta text |

If a future screenshot implies a *different* palette, ask before overwriting
these tokens globally — every built section depends on them.

**Curvature is a deliberate, standing instruction** ("keep slight curve in
whole site as it looks premium"): radius tokens run `--radius-xs` (0.5rem)
through `--radius-2xl` (3rem). Buttons are pills, product images use
`--radius-md`, large panels (footer, dark carousel cards) use `--radius-xl`/
`--radius-2xl`. The **hero is the one deliberate exception** — it was made
full-bleed/square-cornered on client request, don't "fix" it back to rounded.

Fonts (all via `next/font/google`, declared in `layout.tsx`):
- **Cinzel** — display/heading font, nav, eyebrows, buttons
- **Cinzel Decorative** — reserved for flourish use, not yet used anywhere load-bearing
- **Cormorant Garamond** — body copy, and the italic hero line
- **Tiro Devanagari Hindi** — for the Hindi-named heritage collections
  (`विरासत`, `कारीगरी`, etc. — see `heritage` array in `site.ts`)

## 8. Content — what's already wired vs. what's still just data

`src/data/site.ts` already has fully-populated arrays for sections **not yet
built visually**:

- `edits` — 5 curated edits total; only `gen-z` and `minimalist-collection`
  (Her Royal Simplicity) have been designed. `quiet-luxury-2` (Cool Girl
  Silver), `spotlight-glam` (Spotlight Glam), and
  `festive-wedding-collection` (Effortless Elegance) are still just data.
- `occasions` — Party Wear, Bali Collection, Office Muse, Everyday Elegance
- `heritage` — 6 Hindi-named collections (Archive Silver Treasure)
- `intentions` — 6 stone-meaning collections (Shop By Intention)
- `faqs` — 4 real FAQ entries
- `journal` — 3 real blog posts with images
- `offers` — the 2 limited-offer callouts (Rakhi, Gift For Her)
- `footerNav` — already used by `Footer.tsx`

When building any of these, follow the same pattern as `GenZEdit`/
`RoyalSimplicity`: add a `picks: [...]` array of exact product handles to the
relevant entry in `site.ts` if the reference screenshot implies specific
pieces, otherwise fall back to `collectionProducts(handle, n)` from
`catalog.ts` (which auto-tops-up short collections from the Earrings pool so
grids never render half-empty — see `collectionProducts` in `catalog.ts`).

**To find a product's real handle/price before wiring it into `site.ts`:**

```bash
node -e '
const p = require("./src/data/products.json");
p.filter(x => x.title.toLowerCase().includes("keyword"))
 .forEach(x => console.log(x.handle, x.price, x.images.length));
'
```

## 9. Section queue (not yet built)

In the order they appear on the live homepage:
- Featured Collections (Gulabi Noor, Shakti Kavach, Mann Shanti, Neel Samudra,
  Rajsi Dharti, Rare Ratna, Gemstone)
- Cool Girl Silver, Spotlight Glam, Effortless Elegance (remaining 3 curated edits)
- Shop By Occasion
- Archive Silver Treasure (Hindi heritage collections)
- Crafted Like Heirlooms — Moonlight Sparkle
- Shop By Intention (Hindi stone-meaning collections)
- Kavach Pendants
- Journal
- FAQ

Each is a **layout-only task** — the copy and product data are already in
`site.ts` / `catalog.ts`. Wait for the client's reference screenshot before
designing the layout; don't invent a design ahead of it.

## 10. Working conventions this client has established

- **They drive by screenshot.** Don't redesign a section speculatively — wait
  for their reference image and their name for which section it maps to.
- **They want real content only.** Never invent placeholder product names,
  prices, or stock photography — always pull from `products.json` /
  `collections.json`, and verify a handle exists before using it (a typo'd
  handle silently falls back to the Earrings collection in `bestsellers()`/
  `collectionProducts()` — this actually happened once and was caught by
  spot-checking prices against the live site).
- **They want speed over narration.** Make the edit, verify it compiles and
  renders, report the result in a few lines. Don't describe your reasoning
  process or ask permission for things clearly implied by the request.
- **Verify, don't assume, when the preview pane misbehaves.** If a screenshot
  looks wrong/blank, check the DOM via `javascript_tool` before reporting a
  problem or reverting working code.

## 11. Quick sanity checklist after any change

```bash
npx tsc --noEmit      # must be clean
npm run build          # must succeed
```

Then open the dev server and at minimum confirm: the section renders with
real images (not broken-image icons), text is legible against its background,
and nothing overflows horizontally (the whole site is `overflow-x: hidden` at
the body level — a section that's wider than 100vw will get silently clipped
rather than causing a visible scrollbar, so check widths explicitly if a
layout looks off).
