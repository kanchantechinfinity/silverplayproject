"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/catalog";
import { cn, inr } from "@/lib/utils";
import VintageBadge from "@/components/VintageBadge";
import {
  placeholderRating,
  Stars,
  QuickViewModal,
  WishlistButton,
  QuickViewButton,
} from "@/components/ProductQuickView";
import {
  DECKLE,
  HeritageCornerMark,
  HeritagePaisleyMark,
  HeritagePhotoVignette,
} from "@/components/heritage/deckle";

/**
 * Heritage-paper edition of the product tile, used only by "The Fresh Edit".
 * Same product data, same interactions (wishlist, quick view, badges) as
 * `EditCard` — only the outer framing is reworked: a hand-torn gilt-edged
 * parchment scrap instead of a smooth rounded gradient panel, with a faint
 * paisley watermark standing in for a manuscript seal.
 */
export default function HeritageEditCard({
  product,
  className,
  priority = false,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const alt = product.images[1];
  const sizes = "(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 24vw";
  const { rating, count } = placeholderRating(product.id);

  return (
    <>
      <Link
        href={`/products/${product.handle}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn("group block", className)}
      >
        <motion.div
          animate={{ y: hover ? -8 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="p-[3px] transition-[filter] duration-700"
          style={{
            clipPath: DECKLE,
            background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
            filter: hover
              ? "drop-shadow(0 22px 34px rgba(26,22,20,0.38))"
              : "drop-shadow(0 6px 14px rgba(26,22,20,0.22))",
          }}
        >
          <div
            className="grain relative flex h-full flex-col p-3"
            style={{
              clipPath: DECKLE,
              backgroundColor: "#f2e8d0",
              backgroundImage: [
                "radial-gradient(circle at 82% 10%, rgba(120,86,38,0.11), transparent 42%)",
                "radial-gradient(circle at 10% 86%, rgba(120,86,38,0.09), transparent 38%)",
                "radial-gradient(circle at 92% 92%, rgba(120,86,38,0.08), transparent 32%)",
                "repeating-linear-gradient(0deg, rgba(90,66,30,0.05) 0px, rgba(90,66,30,0.05) 1px, transparent 1px, transparent 25px)",
                "radial-gradient(140% 160% at 15% -10%, #f8f0da 0%, #f2e8d0 42%, #e6d3a8 78%, #d8c191 100%)",
              ].join(", "),
            }}
          >
            <HeritageCornerMark className="pointer-events-none absolute left-2 top-2 h-5 w-5 opacity-45" />

            {/* Piece — torn gilt mat around a torn photo, same deckle as the
                card itself, so the photo reads as part of the paper rather
                than a modern box dropped on top of it. Badges/wishlist/quick
                view sit on the unclipped outer layer so the jagged edge can
                never nick them. */}
            <div className="relative aspect-[4/5]">
              <div className="absolute inset-0 bg-bone-2" style={{ clipPath: DECKLE }}>
                <motion.div
                  animate={{ scale: hover ? 1.07 : 1 }}
                  transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes={sizes}
                    priority={priority}
                    className={cn(
                      "object-cover transition-opacity duration-[750ms]",
                      hover && alt ? "opacity-0" : "opacity-100",
                    )}
                  />
                  {alt && (
                    <Image
                      src={alt}
                      alt=""
                      aria-hidden
                      fill
                      sizes={sizes}
                      className={cn(
                        "object-cover transition-opacity duration-[750ms]",
                        hover ? "opacity-100" : "opacity-0",
                      )}
                    />
                  )}
                </motion.div>
                <HeritagePhotoVignette />
              </div>

              {product.compareAt && product.compareAt > product.price && (
                <VintageBadge
                  lines={["Sale"]}
                  className="absolute left-3 top-3 -rotate-6 group-hover:rotate-0"
                />
              )}
              {!product.available && (
                <VintageBadge
                  lines={["Sold", "Out"]}
                  className="absolute left-3 top-3 rotate-6 group-hover:rotate-0"
                />
              )}

              <WishlistButton
                wishlisted={wishlisted}
                onToggle={() => setWishlisted((w) => !w)}
                className="absolute right-3 top-3"
              />
              <QuickViewButton onOpen={() => setQuickView(true)} className="absolute bottom-3 right-3" />
            </div>

            {/* Name + price, with a faint paisley watermark standing in for a seal */}
            <div className="relative mt-auto px-2 pb-2 pt-5 text-center">
              <HeritagePaisleyMark className="pointer-events-none absolute left-1/2 top-1/2 h-[clamp(56px,13vw,88px)] w-[clamp(56px,13vw,88px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]" />

              <h3 className="relative truncate font-body text-[0.98rem] leading-snug text-[#6b5326] transition-colors duration-500 group-hover:text-[#3a2b1c]">
                {product.title}
              </h3>
              <p className="relative mt-2.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-display text-[1.06rem] font-semibold tracking-[0.02em] text-[#3a2b1c]">
                {inr(product.price)}
                {product.compareAt && product.compareAt > product.price && (
                  <span className="font-normal text-[0.78rem] text-[#8a6a2e] line-through">
                    {inr(product.compareAt)}
                  </span>
                )}
                <span aria-hidden className="h-1 w-1 rounded-full bg-[#8a6a2e]/40" />
                <span className="flex items-center gap-1">
                  <Stars rating={rating} size={8} />
                  <span className="font-body text-[0.6rem] font-normal text-[#8a6a2e]">
                    ({count.toLocaleString("en-IN")})
                  </span>
                </span>
              </p>

              <span
                role="button"
                className="relative mt-4 block w-full rounded-full bg-[#241a10] py-2.5 font-display text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#f2e8d0] shadow-[inset_0_0_0_1px_rgba(216,180,102,0.5)] transition-colors duration-500 group-hover:bg-[#3a2b1c]"
              >
                Buy Now
              </span>
            </div>
          </div>
        </motion.div>
      </Link>

      <AnimatePresence>
        {quickView && (
          <QuickViewModal
            product={product}
            rating={rating}
            count={count}
            onClose={() => setQuickView(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
