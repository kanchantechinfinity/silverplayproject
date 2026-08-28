"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/catalog";
import { cn, inr } from "@/lib/utils";

/**
 * Product tile. Cross-fades to the second product shot on hover and reveals a
 * quick-add bar from the bottom edge.
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
  const alt = product.images[1];
  const discount =
    product.compareAt && product.compareAt > product.price
      ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
      : null;

  return (
    <Link
      href={`/products/${product.handle}`}
      className={cn("group block", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] bg-bone-2">
        <motion.div
          animate={{ scale: hover ? 1.06 : 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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

        <span className="pointer-events-none absolute inset-0 rounded-[var(--radius-md)] border border-ink/0 transition-colors duration-700 group-hover:border-ink/15" />

        {discount && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 font-display text-[0.58rem] uppercase tracking-[0.16em] text-bone">
            {discount}% off
          </span>
        )}
        {!product.available && (
          <span className="absolute left-3 top-3 rounded-full border border-bone/60 bg-ink/70 px-3 py-1 font-display text-[0.58rem] uppercase tracking-[0.16em] text-bone backdrop-blur-sm">
            Sold out
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/85 py-3.5 text-center backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          <span className="font-display text-[0.62rem] uppercase tracking-[0.26em] text-bone">
            Quick View
          </span>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="font-body text-[1.02rem] leading-snug text-ink/90 transition-colors duration-400 group-hover:text-ink">
          {product.title}
        </h3>
        <p className="mt-1.5 flex items-baseline gap-2.5 font-display text-[0.82rem] tracking-[0.06em] text-ink">
          {inr(product.price)}
          {product.compareAt && product.compareAt > product.price && (
            <span className="text-[0.72rem] text-ash-3 line-through">
              {inr(product.compareAt)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
