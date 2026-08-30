import Link from "next/link";
import EditCard from "@/components/EditCard";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { products } from "@/lib/catalog";

/** Newest 4 pieces by Shopify product id — the closest real signal to
 *  "just landed" this dataset has, since there's no dedicated new-arrivals
 *  collection on the live storefront. */
function newestProducts(limit: number) {
  return [...products].sort((a, b) => b.id - a.id).slice(0, limit);
}

export default function GenZEdit() {
  const items = newestProducts(8);

  return (
    <section className="bg-bone-3 py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow text-ash-3">Just Landed</p>
          </Reveal>

          <SplitText
            text="New Arrivals"
            className="mt-4 text-[clamp(1.9rem,4.4vw,3.2rem)] text-ink"
          />

          <Reveal delay={0.12}>
            <p className="mt-6 font-body text-[1.06rem] leading-relaxed text-ink/60 md:text-[1.12rem]">
              The newest additions to the Silver Play line — fresh cuts, fresh stones, straight from the workshop.
            </p>
          </Reveal>
        </div>

        <Stagger
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
          stagger={0.11}
        >
          {items.map((p, i) => (
            <StaggerItem key={p.handle} className="h-full">
              <EditCard product={p} priority={i < 2} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 font-display text-[0.66rem] uppercase tracking-[0.22em] text-bone transition-colors duration-500 hover:bg-ink-3"
          >
            Shop New Arrivals
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
