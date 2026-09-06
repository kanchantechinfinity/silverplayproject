import Image from "next/image";
import Link from "next/link";
import HeritageEditCard from "@/components/HeritageEditCard";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { treasures } from "@/data/site";
import { getProduct } from "@/lib/catalog";

/** Real "As Seen & Loved" picks, presented as a Best Sellers row — same
 *  layout as New Arrivals, but on its own dark tone (ink-3, not the ink
 *  Her Royal Simplicity already uses just above it). */
export default function BestSellers() {
  const items = treasures.picks
    .map(getProduct)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="heritage-sec bg-ink-3 py-24 md:py-32">
      <Image
        src="/heritage/seen-ghat-vista.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-[-1] object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-ink-3/62" />
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow text-ash-3">{treasures.eyebrow}</p>
          </Reveal>

          <SplitText
            text="Best Sellers"
            className="mt-4 text-[clamp(1.9rem,4.4vw,3.2rem)] text-bone"
          />

          <Reveal delay={0.12}>
            <p className="mt-6 font-body text-[1.06rem] leading-relaxed text-bone/60 md:text-[1.12rem]">
              The pieces Silver Play wearers keep coming back for — proven favourites, worn on repeat.
            </p>
          </Reveal>
        </div>

        <Stagger
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
          stagger={0.08}
        >
          {items.map((p, i) => (
            <StaggerItem key={p.handle} className="h-full">
              <HeritageEditCard product={p} priority={i < 2} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2.5 rounded-full bg-bone px-8 py-4 font-display text-[0.66rem] uppercase tracking-[0.22em] text-ink transition-colors duration-500 hover:bg-bone-3"
          >
            Shop Best Sellers
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
