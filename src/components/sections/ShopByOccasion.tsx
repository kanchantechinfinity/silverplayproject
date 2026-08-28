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
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" />
      <p className="absolute bottom-3 left-3 font-display text-[0.62rem] uppercase tracking-[0.2em] text-bone">
        {o.title}
      </p>
    </Link>
  );
}

export default function ShopByOccasion() {
  return (
    <section className="bg-ink px-5 py-16 md:px-10 md:py-20">
      <div className="relative mx-auto max-w-[1500px] grid gap-4 md:grid-cols-[minmax(220px,30%)_1fr] md:gap-6 lg:gap-8">
        {/* Headline */}
        <Reveal>
          <div className="flex flex-col justify-start pt-2">
            <p className="eyebrow text-ash-3">Dressed For The Moment</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4.6vw,3.4rem)] uppercase leading-[1.05] text-bone">
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

        <Link
          href="/collections"
          className="group flex h-14 w-fit items-center gap-2 self-end justify-self-end rounded-full border border-bone/40 bg-ink px-6 font-display text-[0.62rem] uppercase tracking-[0.22em] text-bone transition-colors duration-500 hover:bg-bone hover:text-ink md:col-start-2 md:mt-6"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
