"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/catalog";
import { cn, inr } from "@/lib/utils";
import VintageBadge from "@/components/VintageBadge";
import {
  ease,
  placeholderRating,
  Stars,
  QuickViewModal,
  WishlistButton,
  QuickViewButton,
} from "@/components/ProductQuickView";

/**
 * Product tile. Cross-fades to the second product shot on hover, carries a
 * wishlist toggle and a quick-view popup, both without leaving the grid.
 */
export default function ProductCard({
  product,
  className,
  priority = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw",
}: {
  product: Product;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [hover, setHover] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const alt = product.images[1];
  const discount =
    product.compareAt && product.compareAt > product.price
      ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
      : null;
  const { rating, count } = placeholderRating(product.id);

  return (
    <>
      <Link
        href={`/products/${product.handle}`}
        className={cn("group block", className)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className="rounded-[var(--radius-md)] p-[3px] transition-shadow duration-700"
          style={{
            background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
            boxShadow: hover
              ? "0 22px 44px -22px rgba(26,22,20,0.4)"
              : "0 2px 8px -5px rgba(26,22,20,0.18)",
          }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius-md)-3px)] bg-bone-2">
            <motion.div
              animate={{ scale: hover ? 1.06 : 1 }}
              transition={{ duration: 0.9, ease }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                sizes={sizes}
                priority={priority}
                className={cn(
                  "object-cover transition-opacity duration-700",
                  hover && alt ? "opacity-0" : "opacity-100",
                )}
              />
              {alt && (
                <Image
                  src={alt}
                  alt=""
                  fill
                  sizes={sizes}
                  aria-hidden
                  className={cn(
                    "object-cover transition-opacity duration-700",
                    hover ? "opacity-100" : "opacity-0",
                  )}
                />
              )}
            </motion.div>

            {discount && (
              <VintageBadge
                lines={[`${discount}%`, "Off"]}
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
        </div>

        <div className="pt-4">
          <h3 className="truncate font-body text-[1.02rem] leading-snug text-[#3a2b1c]/90 transition-colors duration-400 group-hover:text-[#3a2b1c]">
            {product.title}
          </h3>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-[0.82rem] tracking-[0.06em] text-[#3a2b1c]">
            {inr(product.price)}
            {product.compareAt && product.compareAt > product.price && (
              <span className="text-[0.72rem] text-[#8a6a2e] line-through">
                {inr(product.compareAt)}
              </span>
            )}
            <span aria-hidden className="h-1 w-1 rounded-full bg-[#8a6a2e]/40" />
            <span className="flex items-center gap-1">
              <Stars rating={rating} size={9} />
              <span className="font-body text-[0.62rem] font-normal text-[#8a6a2e]">
                ({count.toLocaleString("en-IN")})
              </span>
            </span>
          </p>

          <span
            role="button"
            className="mt-3 block w-full rounded-full bg-[#241a10] py-2.5 text-center font-display text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#f2e8d0] transition-colors duration-500 group-hover:bg-[#3a2b1c]"
          >
            Buy Now
          </span>
        </div>
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
