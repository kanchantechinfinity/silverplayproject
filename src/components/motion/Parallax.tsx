"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shifts its children against the scroll direction. `speed` is in pixels of
 * total travel across the full time the element is on screen.
 */
export default function Parallax({
  children,
  className,
  speed = 80,
  scale = false,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  scale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const y = useTransform(smooth, [0, 1], [speed, -speed]);
  const s = useTransform(smooth, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y, scale: scale ? s : 1 }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
