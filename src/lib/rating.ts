/**
 * Deterministic placeholder rating from the product id — Silver Play has no
 * review app live yet, so there's no real per-product rating to show. Stable
 * per product (not random per render) so it doesn't jitter on re-render.
 * Plain function (not "use client") so both server and client components
 * can call it directly.
 * TODO: swap for real review data once a review app goes live.
 */
export function placeholderRating(id: number) {
  const h = Math.abs(Math.sin(id) * 10000);
  const frac = h - Math.floor(h);
  const rating = Math.round((4.3 + frac * 0.7) * 10) / 10;
  const count = 40 + Math.floor(frac * 1460);
  return { rating, count };
}
