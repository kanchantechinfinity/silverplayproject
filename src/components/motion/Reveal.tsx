"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 34 },
  down: { x: 0, y: -34 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
};

/** Single element that eases in the first time it scrolls into view. */
export default function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.85,
  blur = true,
  amount = 0.25,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  blur?: boolean;
  amount?: number;
  once?: boolean;
}) {
  const { x, y } = offset[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x,
      y,
      filter: blur ? "blur(8px)" : "blur(0px)",
    },
    shown: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}
