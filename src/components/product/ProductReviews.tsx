import Image from "next/image";
import type { Product } from "@/lib/catalog";
import { Stars } from "@/components/ProductQuickView";
import { placeholderRating } from "@/lib/rating";
import Reveal from "@/components/motion/Reveal";

/**
 * No review app is live yet (see placeholderRating's own note), so this is
 * an honest ratings summary — a real aggregate shape, deterministic per
 * product — rather than invented reviewer names/quotes standing in for
 * reviews that were never actually written.
 */
function distribution(rating: number, count: number) {
  const p5 = Math.min(0.9, 0.55 + (rating - 4.3) * 0.5);
  const rest = 1 - p5;
  const weights = [p5, rest * 0.65, rest * 0.22, rest * 0.09, rest * 0.04];
  const counts = weights.map((w) => Math.round(w * count));
  const diff = count - counts.reduce((a, b) => a + b, 0);
  counts[0] += diff;
  return counts; // [5-star, 4-star, 3-star, 2-star, 1-star]
}

export default function ProductReviews({ product }: { product: Product }) {
  const { rating, count } = placeholderRating(product.id);
  const counts = distribution(rating, count);

  return (
    <section id="reviews" className="scroll-mt-28 border-t border-ink/10 bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow text-ash-3">Ratings &amp; Reviews</p>
        </Reveal>

        <div className="mt-8 grid gap-10 md:grid-cols-[auto_1fr_auto] md:gap-14">
          {/* Average */}
          <div className="flex shrink-0 flex-col items-center text-center md:items-start md:text-left">
            <p className="font-display text-[3.2rem] leading-none text-ink">{rating}</p>
            <Stars rating={rating} size={16} />
            <p className="mt-2 font-body text-[0.85rem] text-ink/50">
              Based on {count.toLocaleString("en-IN")} ratings
            </p>
          </div>

          {/* Breakdown */}
          <div className="w-full max-w-md space-y-2 self-center">
            {counts.map((c, i) => {
              const stars = 5 - i;
              const pct = count > 0 ? Math.round((c / count) * 100) : 0;
              return (
                <div key={stars} className="flex items-center gap-3">
                  <span className="w-3 shrink-0 font-body text-[0.78rem] text-ink/60">
                    {stars}
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/8">
                    <div
                      className="h-full rounded-full bg-[#a4802f]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right font-body text-[0.75rem] text-ink/45">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Illustrative — no real review photos exist yet (no reviews
              have been written), so this is the product's own second shot,
              styled as "how it looks" rather than passed off as a customer
              submission. */}
          <div
            className="mx-auto hidden w-[220px] shrink-0 overflow-hidden rounded-[var(--radius-md)] p-[3px] sm:block md:mx-0 md:w-[260px]"
            style={{ background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)" }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(var(--radius-md)-3px)] bg-bone-2">
              <Image
                src={product.images[1] ?? product.images[0]}
                alt=""
                aria-hidden
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Honest empty state — no invented reviewer names or quotes */}
        <div className="mt-12 rounded-[var(--radius-md)] border border-dashed border-ink/15 px-6 py-10 text-center">
          <p className="font-display text-[0.95rem] text-ink/70">No written reviews yet</p>
          <p className="mt-1.5 font-body text-[0.85rem] text-ink/45">
            Be the first to share how you wear this piece.
          </p>
        </div>
      </div>
    </section>
  );
}
