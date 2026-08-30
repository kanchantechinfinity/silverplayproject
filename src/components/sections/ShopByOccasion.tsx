"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { occasions } from "@/data/site";
import { cn } from "@/lib/utils";

const byHandle = new Map(occasions.map((o) => [o.handle, o]));
const bali = byHandle.get("baali-collection")!;
const partyWear = byHandle.get("party-wear")!;
const officeMuse = byHandle.get("office-muse")!;
const everydayElegance = byHandle.get("everyday-elegance")!;

function OccasionCard({
  o,
  className,
}: {
  o: (typeof occasions)[number];
  className?: string;
}) {
  return (
    <Link
      href={`/collections/${o.handle}`}
      className={cn(
        "group relative block w-full overflow-hidden rounded-[var(--radius-sm)] bg-ink-2",
        className,
      )}
    >
      <Image
        src={o.image}
        alt={o.title}
        fill
        sizes="(max-width: 768px) 45vw, 25vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
        <p className="font-display text-[0.62rem] uppercase tracking-[0.2em] text-bone">
          {o.title}
        </p>
        <span className="grid h-8 w-8 shrink-0 translate-y-2 place-items-center rounded-full bg-bone text-ink opacity-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
          &rarr;
        </span>
      </div>

      <span className="absolute inset-0 rounded-[var(--radius-sm)] ring-1 ring-inset ring-bone/0 transition-all duration-500 group-hover:ring-bone/30" />
    </Link>
  );
}

export default function ShopByOccasion() {
  return (
    <section className="bg-ink px-5 py-16 md:px-10 md:py-20">
      <div className="relative mx-auto max-w-[1500px] grid gap-4 md:grid-cols-[minmax(220px,30%)_1fr] md:gap-6 lg:gap-8">
        {/* Headline */}
        <Reveal>
          <div className="flex flex-col items-start justify-start pt-2">
            <p className="eyebrow text-ash-3">Dressed For The Moment</p>
            <Link
              href="/collections"
              className="group mt-4 flex h-11 w-fit items-center gap-2 rounded-full border border-bone/40 px-6 font-display text-[0.6rem] uppercase tracking-[0.22em] text-bone transition-colors duration-500 hover:bg-bone hover:text-ink"
            >
              Shop Now
            </Link>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.4rem)] uppercase leading-[1.05] text-bone">
              Shop By
              <br />
              Occasion
            </h2>
          </div>
        </Reveal>

        {/* Bento — two columns, each a stacked pair of unequal heights */}
        <Stagger className="grid grid-cols-2 gap-4 md:h-[560px] md:gap-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <StaggerItem className="flex-[1.5]">
              <OccasionCard o={bali} className="aspect-[4/5] h-full md:aspect-auto" />
            </StaggerItem>
            <StaggerItem className="flex-1">
              <OccasionCard o={partyWear} className="aspect-[4/3] h-full md:aspect-auto" />
            </StaggerItem>
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <StaggerItem className="flex-1">
              <OccasionCard o={officeMuse} className="aspect-[4/3] h-full md:aspect-auto" />
            </StaggerItem>
            <StaggerItem className="flex-[1.3]">
              <OccasionCard o={everydayElegance} className="aspect-[4/5] h-full md:aspect-auto" />
            </StaggerItem>
          </div>
        </Stagger>
      </div>
    </section>
  );
}
