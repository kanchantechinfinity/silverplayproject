"use client";

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { founder } from "@/data/site";

/** Real copy + portrait, straight from the live "Our Story" page. */
export default function Founder() {
  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                sizes="(max-width: 768px) 92vw, 44vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="border-t border-bone/15 pt-8 md:border-t-0 md:border-l md:pl-16 md:pt-0 lg:pl-20">
            <Reveal>
              <p className="eyebrow text-ash-3">{founder.eyebrow}</p>
            </Reveal>
            <SplitText
              text={founder.heading}
              className="mt-4 text-[clamp(1.9rem,4vw,3rem)] normal-case text-bone"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl font-body text-[1.02rem] leading-relaxed text-bone/65">
                {founder.bio}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8">
                <p className="font-display text-[1.1rem] text-[#d8b466]">{founder.name}</p>
                <p className="mt-1 font-display text-[0.62rem] uppercase tracking-[0.22em] text-bone/50">
                  {founder.title}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
