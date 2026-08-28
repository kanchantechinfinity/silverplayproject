"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { chipFor, type Product } from "@/lib/catalog";
import { cn, inr } from "@/lib/utils";

/**
 * Editorial card: a pale panel holding a style chip, the piece, its name and a
 * weighted price. Lifts on hover and cross-fades to the second shot.
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
  const alt = product.images[1];
  const sizes = "(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 24vw";

  return (
    <Link
      href={`/products/${product.handle}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn("group block", className)}
    >
      <motion.div
        animate={{ y: hover ? -8 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex h-full flex-col rounded-[var(--radius-lg)] bg-bone p-3 transition-shadow duration-700",
          "shadow-[0_2px_10px_-6px_rgba(26,22,20,0.14)]",
          "group-hover:shadow-[0_26px_50px_-24px_rgba(26,22,20,0.34)]",
        )}
      >
        {/* Style chip */}
        <div className="flex justify-center pb-3 pt-2">
          <span className="rounded-full border border-ink/15 px-4 py-1.5 font-display text-[0.56rem] uppercase tracking-[0.2em] text-ink/60 transition-colors duration-500 group-hover:border-ink/35 group-hover:text-ink">
            {chipFor(product)}
          </span>
        </div>

        {/* Piece */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] bg-bone-2">
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
            <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 font-display text-[0.54rem] uppercase tracking-[0.16em] text-bone">
              Sale
            </span>
          )}
          {!product.available && (
            <span className="absolute left-3 top-3 rounded-full border border-bone/60 bg-ink/70 px-3 py-1 font-display text-[0.54rem] uppercase tracking-[0.16em] text-bone backdrop-blur-sm">
              Sold out
            </span>
          )}
        </div>

        {/* Name + price */}
        <div className="mt-auto px-2 pb-2 pt-5 text-center">
          <h3 className="font-body text-[0.98rem] leading-snug text-ash-3 transition-colors duration-500 group-hover:text-ink/80">
            {product.title}
          </h3>
          <p className="mt-2.5 flex items-center justify-center gap-2 font-display text-[1.06rem] font-semibold tracking-[0.02em] text-ink">
            {inr(product.price)}
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ash-2" />
            {product.compareAt && product.compareAt > product.price && (
              <span className="font-normal text-[0.78rem] text-ash-3 line-through">
                {inr(product.compareAt)}
              </span>
            )}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
