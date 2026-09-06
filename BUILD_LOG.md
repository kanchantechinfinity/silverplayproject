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

## 2026-09-06 — Product page: metafield sections, header fix, centering fixes

**Requested** (spread across several rounds of screenshot feedback)
Header should read brown-then-white-pill on hero-less pages instead of
staying transparent or permanently brown; shop/collections background photo
must stay fixed while filters + grid scroll; add a 3D-view toggle on the
product gallery; build out the product page using
`salty.co.in/products/rose-gold-diamond-luxury-watch` as a structural
reference — What's Inside The Box, Paired With, Loved By Creators (real
video, not a fake per-post clip), gift/PIN-check controls beside the buy box,
Ratings & Reviews, FAQ — "give it a touch of ancient Indian heritage." Then:
center the new sections, play a real video on Loved By Creators click, add a
photo to Reviews, reuse Kavach's background on Box Contents, reuse homepage
photos as backgrounds elsewhere, make the gallery image sticky against the
taller info column. Final round: Loved By Creators and Similar Products
still weren't centered; review photo should be a rectangle that fills its
space.

**Built**
- `ProductGallery` — 3D-view button, cursor-tilt modal (`Tilt3DModal`),
  portalled to `<body>`.
- `ProductBuyBox` — savings badge, "sending as a gift" note field, PIN-code
  delivery-estimate check (illustrative, not a real serviceability API).
- `ProductBoxContents` (new) — same photo + overlay treatment as Kavach
  (`vanity-mood.jpg`), real box contents (already promised elsewhere in the
  accordion/assurance copy, not invented).
- `ProductPairedWith` (new) — "Complete the look" below the product, using
  `elegance-lotus.jpg` (same photo as `EffortlessElegance` on the homepage),
  a real different-type product chosen deterministically by product id.
- `ProductReviews` (new) — honest ratings/breakdown (no invented reviewer
  quotes — no review app exists yet), plus a gilt-framed rectangular (4:3)
  product photo beside the breakdown so the section isn't empty.
- `ProductLovedByCreators` (new) — draggable card strip (`story-veena.jpg`
  bg); clicking a card plays the site's one real cinematic video
  (`/hero/silverplay-cinematic.mp4`) in a portalled `ReelModal`, instead of
  only linking out to Instagram.
- Product page grid: `md:items-start` + `md:sticky md:top-32` on the gallery
  so it holds in place while the (now much taller) info column scrolls past,
  rather than the two columns finishing at different times and leaving a gap.
- `Header` — pin threshold now measures the real `[data-page-hero]` element
  (GSAP `__heroScrollEnd` on the homepage) instead of guessing 70vh; hero-less
  pages get a `noHero` flag that swaps the pre-pin background to brown
  (`rgba(36,26,16,0.97)`) while keeping the same scroll-to-white-pill
  transition as every other page.

**Bugs hit and fixed**
1. Draggable card track (`ProductLovedByCreators`) stayed visually off-center
   even after adding `mx-auto` — root cause: Framer Motion's `drag="x"` +
   `dragConstraints={ref}` was applying an inline
   `transform: translateX(180px)` that exactly duplicated the `mx-auto`
   margin, double-shifting the track right (measured `trackLeft:400,
   trackRight:40` against an expected 220/220). Fixed by removing the margin
   centering from the draggable element and centering its non-motion parent
   with `flex justify-center` instead — confirmed symmetric at
   `180px/180px` with no stray transform. See [[memory.md]] gotchas.
2. Similar Products used a fixed `grid-cols-2 lg:grid-cols-5`; with fewer
   than 5 related items the empty trailing columns left the row flush-left.
   Switched to `flex flex-wrap justify-center` with explicit per-breakpoint
   item widths matching the old grid's proportions — a partial row (e.g. 4
   items) now centers as a group.
3. Enlarging the review photo by changing its width to `w-full max-w-[220px]`
   collapsed it to 6px wide — a percentage width has no definite size inside
   a `grid-cols-[auto_1fr_auto]` column, which itself sizes from the child's
   *intrinsic* contribution. Fixed by using explicit fixed widths
   (`w-[220px] md:w-[260px]`) instead, same pattern as the original.
3D-view modal and 3-round header centering issue (measured asymmetric
stage offsets, fixed via `createPortal`) were resolved earlier in this same
round; see [[memory.md]] for the reusable patterns extracted from all three
(portal-for-fixed-under-Reveal, drag+margin, percentage-in-auto-grid).

**Verification**
- `npx tsc --noEmit` clean; `npm run build` clean across all 558 static
  routes.
- Live-measured (not just screenshotted) the Loved By Creators track
  (`180/180`) and Similar Products row (`40/40` either side, matching the
  container's own padding) post-fix.
- Reviews photo confirmed rendering at 260×197 (4:3, `object-fit: cover`).
- Clicked a Loved By Creators card end-to-end: modal opens centered, video
  autoplays, close button dismisses it.
- No horizontal overflow at 1280px (`scrollWidth === clientWidth`).

**Not done / next**
Nothing outstanding from this round. Pushed to `origin/main` at `2113029` on
explicit request.

## 2026-09-06 — Vercel deploy check; Royal Simplicity paper-card revert

**Requested**
"Many things are not pushed correctly on Vercel" (no specifics given).
Then, from a screenshot of the live "Her Royal Simplicity" homepage section:
the deck isn't visibly advancing left/right on scroll, and remove the
"ancient paper design" entirely — go back to how the section looked before.
Two follow-ups: confirmed the re-tuned scroll pacing now works and to keep
it; make the cards a little taller and restore the visible brown gradient
behind the card title/tagline (as it looked before the section was trimmed).

**Diagnosis: "not pushed correctly on Vercel"**
Direct HTTP checks (`curl`, bypassing the Browser pane entirely) showed the
deployment was actually correct and current: HTML 200, the CSS bundle 200
and containing the exact `aspect-ratio:4/3` rule from the just-pushed review
photo fix, heritage photos/video/JS chunks all 200, and the real
`cdn.shopify.com` image URLs in the rendered HTML 200. What looked broken
inside the Browser pane itself (`position:static` instead of `relative`,
an image collapsed to viewport size) traced to the pane's own network layer
returning `net::ERR_BLOCKED_BY_CLIENT` for `_next/static/*` and `/heritage/*`
requests — a tooling artifact of that preview browser, not a deployment
defect. No code change was needed for this part; see [[memory.md]] gotchas.

**Diagnosis: scroll not advancing**
Dispatched real wheel-scroll input (not `window.scrollTo`, which Lenis/GSAP
smooth-scroll setups make an unreliable proxy for real interaction — see
existing gotcha) and read the track's live computed `transform` before and
after. Scroll position and horizontal transform did correlate correctly, so
the tracking mechanism itself wasn't broken — but the section's scroll
distance (`items.length * 85vh`, 4+ viewport-heights to traverse the whole
deck) meant one normal scroll gesture only produced a small fraction of a
card-width's movement, reading as "not working."

**Changes** (`RoyalSimplicity.tsx`)
- Removed the DECKLE clip-path gilt mat, `heritage-sec`/heritage-wallpaper
  texture, and `HeritageMonument` silhouette entirely. Cards are back to
  plain `rounded-[var(--radius-xl)]` with a gold ring highlight on the
  active card — the pre-heritage-styling look from commit `1aaccfd` — but
  keep the height-driven responsive sizing (`h-[clamp(...)]`) from the
  overflow-bug fix rather than reverting to the original's fixed width,
  since that fixed width could still overflow at short viewports.
- Section height `items.length * 85vh` -> `65vh` so scroll pacing matches
  real input.
- Card height clamp `220-420px @44vh` -> `240-500px @48vh` (taller, per
  follow-up feedback) — verified this still leaves headroom against the
  deck's available flex height at a short (563px) viewport, no overflow.
- Bottom-of-section gradient `h-16 from-ink/60` -> `h-32 from-ink
  via-ink/70 to-transparent` (restores the stronger fade the user
  remembered, lost during an earlier space-trimming round).

**Verification**
- `npx tsc --noEmit` and `npm run build` clean (558 routes).
- Confirmed the paper styling was gone and cards read taller via DOM
  `className`/computed-size checks — screenshots intermittently returned a
  stale cached frame mid-session (same known Browser pane issue); a hard
  navigate reload reliably produced a fresh, correct capture.
- Re-ran the real-wheel-scroll transform check after the height change to
  confirm the fix, then got direct user confirmation scroll pacing now
  feels right.

Pushed to `origin/main` at `cee9114`.
