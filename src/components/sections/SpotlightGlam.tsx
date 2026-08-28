"use client";

import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { edits } from "@/data/site";

const VIDEO_SRC =
  "https://silverplay.in/cdn/shop/videos/c/vp/539c56465be146a5a0bda29b8ceaccfd/539c56465be146a5a0bda29b8ceaccfd.HD-720p-2.1Mbps-88733084.mp4?v=0";

const headingWords = ["Spotlight", "Glam"];

/** Full-width promo band — no inset, no rounding, edge to edge. */
export default function SpotlightGlam() {
  const edit = edits.find((e) => e.handle === "spotlight-glam")!;

  return (
    <section className="w-full overflow-hidden bg-ink pb-14 md:pb-20">
      <div className="relative aspect-[12/5] w-full min-h-[300px]">
        {/* Arch-topped photo, inset and bottom-anchored */}
        <div
          className="absolute bottom-0 left-[5%] w-[42%] overflow-hidden sm:left-[6%] md:w-[40%] lg:left-[7%]"
          style={{ height: "94%", borderRadius: "50% 50% 0 0" }}
        >
          <video
            className="h-full w-full object-cover"
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Text — big enough to carry the rest of the band */}
        <div className="absolute inset-y-0 left-[52%] right-4 flex flex-col items-start justify-center sm:right-6 md:left-[50%] md:right-10 lg:left-[48%] lg:right-14">
          <Reveal>
            <p className="script text-[1rem] text-ash-3 sm:text-[1.2rem] md:text-[1.5rem] lg:text-[1.8rem]">
              The Edit
            </p>
          </Reveal>
          <h2 className="mt-1 font-display leading-[0.92] text-bone md:mt-2">
            {headingWords.map((word, i) => (
              <SplitText
                key={word}
                text={word}
                as="span"
                className="block text-[clamp(2.4rem,8vw,6.4rem)] uppercase"
                delay={i * 0.1}
              />
            ))}
          </h2>
          <Reveal delay={0.35}>
            <Link
              href={`/collections/${edit.handle}`}
              className="mt-5 inline-flex items-center rounded-full bg-bone px-7 py-3 font-display text-[0.66rem] uppercase tracking-[0.22em] text-ink transition-colors duration-500 hover:bg-bone-3 sm:mt-7 sm:px-8 sm:py-3.5 sm:text-[0.7rem] md:mt-9"
            >
              Shop Now
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
