# Build Log — Silver Play revamp

## 2026-08-21 — Foundation + Hero

**Requested**
Revamp silverplay.in, taking all content and imagery from the live site.
Redesign section-by-section from user screenshots. Animation throughout.
Hero to match a supplied "STUDIO SOLEN" reference; palette from a supplied
swatch screenshot; slight curvature sitewide.

**Content extraction**
- Scraped the live storefront's public Shopify JSON: 233 products (title,
  price, compare-at, availability, tags, description, images), 74 collections,
  and a collection → product membership map for the 31 collections the design
  references.
- Copy (nav, hero, assurances, edits, intentions, FAQ, journal, footer) lifted
  verbatim into `src/data/site.ts`.
- All imagery hotlinks the site's own Shopify CDN — no substitutes.

**Scaffold**
- Next.js 16.3.1, App Router, TypeScript, Tailwind v4, src dir, `@/*` alias.
- Added framer-motion 13, lenis, clsx, tailwind-merge.

**Design system**
- Replaced the live site's brown/gold palette with the supplied warm
  monochrome: ink `#1A1614`, bone `#F5F2ED`, ash `#C9C6C0`, plus ramps.
- Fonts matched to the live site: Cinzel, Cinzel Decorative,
  Cormorant Garamond, Tiro Devanagari Hindi.
- Radius scale `--radius-xs` … `--radius-2xl` for the requested curvature.

**Animation layer** (`src/components/motion/`)
- `Reveal` — scroll-triggered fade/slide/blur, directional.
- `Stagger` / `StaggerItem` — cascading list entrance.
- `SplitText` — masked word- or char-level headline rise, aria-labelled.
- `Parallax` — spring-smoothed counter-scroll, optional scale.
- `Marquee` — seamless double-track ticker, pause on hover.
- `MagneticCta` — cursor-following link with a gold-wipe fill.
- `SmoothScroll` — Lenis momentum scrolling, disabled under
  `prefers-reduced-motion`. All primitives respect reduced motion.

**Sections built**
- `Header` — transparent over the hero, condenses into a floating bone pill
  past 70% viewport; centered nav, hover underlines, animated dropdown,
  full-screen mobile drawer.
- `Hero` — inset rounded full-bleed photo card per the reference: 2.2s image
  scale-in, upright caps line ("THINK SILVER.") over an oversized Cormorant
  italic line ("Think Silver Play"), staggered blur reveal, pill CTAs with
  arrow nudge, animated scroll cue.
- `AssuranceBar` — the live site's trust banner as a marquee.
- `Bestsellers` — the four products actually featured on the live homepage,
  verified against real handles and prices (₹5,450 / ₹4,999 / ₹13,500 /
  ₹29,999).
- `ProductCard` — hover cross-fade to the second product shot, image scale,
  quick-view slide-up, discount and sold-out pills.
- `Footer` — inset rounded dark card, revealed columns, hover underlines.

**Problems hit and fixed**
1. `create-next-app` warned about a package-lock outside the repo → set
   `turbopack.root`.
2. Source PNGs are 2–5 MB; Next's image optimizer timed out
   (`upstream image response timed out`). Wrote a custom `next/image` loader
   that hands resizing to Shopify's CDN via the `_{width}x` filename suffix.
   Confirmed `?width=` and `?format=webp` do not work on `silverplay.in/cdn/*`.
3. Hero flashed pale before the photo loaded — the dark scrim was compositing
   over white. Added an explicit `bg-ink` base to the hero card.
4. Hero subtitle wrapped badly at `max-w-[34ch]` → widened to `46ch`.
5. Bestseller handle `sterling-silver-cascade-chains-earring` didn't exist and
   was silently falling back to the Earrings pool; the real handle is
   `sterling-silver-silver-cascade-chains-earring`.
6. `mcp__Claude_Browser__preview_start` could not launch a dev server on this
   Mac (`EPERM: operation not permitted, uv_cwd` — the launcher shell has no
   accessible cwd). Started Next from a shell and pointed the pane at the URL.

**Verification**
- `npx tsc --noEmit` clean.
- `npm run build` succeeds — 2 static routes.
- Hero, header, marquee, bestsellers grid and footer confirmed rendering in the
  browser at 1400×880 with real product photography.
- Note: the Browser pane intermittently returns stale blank screenshots;
  rendering was confirmed via DOM inspection (computed opacity and bounding
  rects) when captures disagreed.

**Not done / next**
Nine sections still await reference screenshots: Featured Collections,
Curated Edits, Shop By Occasion, Archive Silver Treasure, Crafted Like
Heirlooms, Shop By Intention, Kavach Pendants, Journal, FAQ. Their content and
collection mappings are already wired in `src/data/site.ts`, so each is a
layout-only build once its screenshot arrives.

## 2026-08-21 — Full-bleed hero, Gen Z edit, Her Royal Simplicity carousel

**Requested**
1. Hero full width, no inset border on the section.
2. "Gen Z — It Girl" edit after the hero, styled like a supplied Fiverr-style
   product-card reference (pale panel, style label, name, price).
3. "Her Royal Simplicity" after that, styled like a supplied dark scroll-deck
   reference: cards swipe as the page scrolls, active card emphasized, bottom
   gradient.

**Changes**
- `Hero.tsx` — dropped the `px-2.5 pt-2.5` inset and corner radius; height
  raised to `92vh`.
- `Header.tsx` — now spans full width flush on the hero photo, animates into
  the floating rounded pill only once scrolled past the hero (radius, margin,
  and width are all animated, not just background).
- `EditCard.tsx` (new) — pale rounded panel: style chip pulled from the
  product's first non-boilerplate tag (`chipFor()` in `catalog.ts`), image
  with hover cross-fade to the second shot, name + price with a weighted
  numeral.
- `GenZEdit.tsx` (new) — heading + four `EditCard`s in a grid, staggered
  reveal, "Shop The Edit" pill.
- `RoyalSimplicity.tsx` (new) — scroll-driven carousel, see
  [[silverplay-scroll-carousel]] in memory for the mechanism. Bottom gradient,
  prev/next arrows wired to the same Lenis scroll position.
- `SmoothScroll.tsx` — now exposes `window.__lenis` so any section can drive
  scroll programmatically.
- `catalog.ts` — added `chipFor()` and `taglineFor()` helpers.
- `site.ts` — added explicit `picks` (real product handles) to the Gen Z and
  Her Royal Simplicity edit entries so they show the exact pieces referenced,
  not a collection-order fallback.

**Verification**
- `tsc --noEmit` and `npm run build` clean.
- Confirmed via DOM inspection (computed transform, font-size, opacity) that
  the carousel's scroll-to-track mapping and active-card emphasis work
  correctly, since the Browser pane repeatedly hung/blanked on
  scroll-triggered screenshots in this session (pre-existing tool issue, not
  a code issue — see [[silverplay-dev-server]]).

**Not done / next**
Three curated edits remain unstyled from screenshots: Cool Girl Silver,
Spotlight Glam, Effortless Elegance. Shop By Occasion, Archive Silver
Treasure, Crafted Like Heirlooms, Shop By Intention, Kavach Pendants, Journal,
FAQ still pending.
