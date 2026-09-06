"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import type { Product } from "@/lib/catalog";
import { chipFor } from "@/lib/catalog";
import { inr } from "@/lib/utils";
import { HeritagePaisleyMark } from "@/components/heritage/deckle";

/** "Complete the look" — sits below the product (not beside it), per
 *  request. `pair` is a real, already-real product of a different type,
 *  chosen by the page rather than invented here. */
export default function ProductPairedWith({
  product,
  pair,
}: {
  product: Product;
  pair: Product;
}) {
  return (
    <section className="heritage-sec relative border-t border-ink/10 bg-bone py-16 md:py-20">
      {/* Same photo EffortlessElegance uses on the homepage, at the same
          overlay strength, so the two feel like they belong to one site. */}
      <Image
        src="/heritage/elegance-lotus.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-[-1] object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-bone/75" />

      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="text-center">
          <Reveal>
            <p className="eyebrow text-[#8a6a2e]">Complete The Look</p>
          </Reveal>
          <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] text-ink">
            Paired Well With {product.title}
          </h2>
        </div>

        <Reveal delay={0.1}>
          <Link
            href={`/products/${pair.handle}`}
            className="group relative mt-10 flex flex-col items-center gap-6 overflow-hidden rounded-[var(--radius-lg)] border border-[#8a6a2e]/20 bg-[#f8f0da] p-6 sm:flex-row sm:gap-8 sm:p-8"
          >
            <HeritagePaisleyMark className="pointer-events-none absolute -right-6 -top-6 z-[-1] h-40 w-40 opacity-[0.06]" />

            <div
              className="relative aspect-square w-40 shrink-0 overflow-hidden rounded-[var(--radius-md)] p-[3px] sm:w-48"
              style={{ background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)" }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--radius-md)-3px)] bg-bone-2">
                <Image
                  src={pair.images[0]}
                  alt={pair.title}
                  fill
                  sizes="192px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-[#8a6a2e]">
                {chipFor(pair)}
              </p>
              <h3 className="mt-2 font-display text-[1.2rem] text-ink">{pair.title}</h3>
              <p className="mt-2 flex items-baseline justify-center gap-2 font-display text-[1.05rem] font-semibold text-ink sm:justify-start">
                {inr(pair.price)}
                {pair.compareAt && pair.compareAt > pair.price && (
                  <span className="text-[0.85rem] font-normal text-[#8a6a2e] line-through">
                    {inr(pair.compareAt)}
                  </span>
                )}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#8a6a2e]/40 px-6 py-2.5 font-display text-[0.62rem] uppercase tracking-[0.2em] text-[#6b5326] transition-colors duration-500 group-hover:bg-[#241a10] group-hover:text-bone">
                View The Pair
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
