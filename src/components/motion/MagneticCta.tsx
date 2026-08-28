"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

/**
 * Link that leans a few pixels toward the cursor, with a gold fill that wipes
 * up from the baseline on hover.
 */
export default function MagneticCta({
  href,
  children,
  className,
  variant = "solid",
  pull = 9,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "solid" | "ghost";
  pull?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 260, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 260, damping: 20, mass: 0.4 });
  const x = useTransform(sx, (v) => v * pull);
  const y = useTransform(sy, (v) => v * pull);

  function track(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
    my.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <MotionLink
      ref={ref}
      href={href}
      onMouseMove={track}
      onMouseLeave={reset}
      style={{ x, y }}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden",
        "px-8 py-4 font-display text-[0.7rem] uppercase tracking-[0.26em]",
        "border transition-colors duration-500",
        variant === "solid"
          ? "border-sepia/60 text-ivory"
          : "border-nav/35 text-nav",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-sepia transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
      />
      <span className="relative transition-colors duration-500 group-hover:text-void">
        {children}
      </span>
    </MotionLink>
  );
}
