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

/**
 * Editorial card: a pale panel holding the piece, its name and a weighted
 * price. Lifts on hover and cross-fades to the second shot.
 */
export default function EditCard({
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
        className="rounded-[var(--radius-lg)] p-[3px] transition-shadow duration-700"
        style={{
          background:
            "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
          boxShadow: hover
            ? "0 26px 50px -24px rgba(26,22,20,0.4)"
            : "0 2px 10px -6px rgba(26,22,20,0.2)",
        }}
      >
        <div
          className="flex h-full flex-col rounded-[calc(var(--radius-lg)-3px)] p-3"
          style={{
            background:
              "radial-gradient(140% 160% at 15% -10%, #f8f0da 0%, #f2e8d0 45%, #e6d3a8 100%)",
          }}
        >
        {/* Piece */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] bg-bone-2 shadow-[inset_0_0_0_1px_rgba(138,106,46,0.25)]">
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

        {/* Name + price */}
        <div className="mt-auto px-2 pb-2 pt-5 text-center">
          <h3 className="font-body text-[0.98rem] leading-snug text-[#6b5326] transition-colors duration-500 group-hover:text-[#3a2b1c]">
            {product.title}
          </h3>
          <p className="mt-2.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-display text-[1.06rem] font-semibold tracking-[0.02em] text-[#3a2b1c]">
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
            className="mt-4 block w-full rounded-full bg-[#241a10] py-2.5 font-display text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#f2e8d0] transition-colors duration-500 group-hover:bg-[#3a2b1c]"
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
