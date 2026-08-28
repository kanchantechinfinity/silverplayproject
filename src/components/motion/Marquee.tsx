"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Seamless CSS ticker. Renders the track twice and translates -50%, so the
 * loop has no visible seam regardless of content width.
 */
export default function Marquee({
  items,
  className,
  itemClassName,
  speed = 42,
  reverse = false,
  separator = "✦",
  pauseOnHover = true,
}: {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
  speed?: number;
  reverse?: boolean;
  separator?: ReactNode;
  pauseOnHover?: boolean;
}) {
  const track = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((item, i) => (
        <span key={i} className={cn("flex items-center whitespace-nowrap", itemClassName)}>
          {item}
          <span className="mx-6 text-ink/30 md:mx-9">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex min-w-max animate-[marquee_linear_infinite]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track}
        {track}
      </div>
      <span className="sr-only">
        {items.map((i, k) => (
          <span key={k}>{i} </span>
        ))}
      </span>
    </div>
  );
}
