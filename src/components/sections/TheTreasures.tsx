"use client";

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { treasures } from "@/data/site";
import { getProduct } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/** Gentle snake — each frame rides a slightly different point on the wave. */
const WAVE = [
  "translate-y-0",
  "md:translate-y-[-14px]",
  "md:translate-y-[-22px]",
  "md:translate-y-[-14px]",
  "translate-y-0",
  "md:translate-y-[14px]",
  "md:translate-y-[22px]",
  "md:translate-y-[14px]",
];

const HOLES_PER_FRAME = 5;

/** One row of sprocket holes, sized to a single frame's width. */
function Perforation() {
  return (
    <div className="flex h-3 items-center justify-between bg-black px-1 md:h-3.5 md:px-1.5">
      {Array.from({ length: HOLES_PER_FRAME }).map((_, i) => (
        <div key={i} className="h-1.5 w-1.5 shrink-0 rounded-[1px] bg-white md:h-2 md:w-2" />
      ))}
    </div>
  );
}

export default function TheTreasures() {
  const picks = treasures.picks
    .map(getProduct)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="relative overflow-hidden bg-bone-2 py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-5 pb-12 text-center md:pb-16">
        <Reveal>
          <p className="eyebrow text-ash-3">{treasures.eyebrow}</p>
        </Reveal>
        <SplitText
          text={treasures.title}
          className="mt-4 text-[clamp(1.8rem,4.2vw,3rem)] text-ink"
        />
      </div>

      {/* One continuous filmstrip ribbon — frames run flush, sprockets unbroken */}
      <div className="overflow-x-auto px-10 pb-6 [scrollbar-width:none] md:px-16 [&::-webkit-scrollbar]:hidden">
        <Stagger className="flex w-max shadow-[0_25px_50px_-20px_rgba(26,22,20,0.3)]">
          {picks.map((p, i) => (
            <div
              key={p.handle}
              className={cn(
                "w-32 shrink-0 transition-transform duration-700 md:w-40",
                WAVE[i % WAVE.length],
              )}
            >
              <StaggerItem>
                <Perforation />
                <div className="relative aspect-[3/4] overflow-hidden bg-black">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 8rem, 10rem"
                    className="object-cover"
                  />
                </div>
                <Perforation />
              </StaggerItem>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
