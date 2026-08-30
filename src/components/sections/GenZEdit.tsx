import Link from "next/link";
import EditCard from "@/components/EditCard";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { edits } from "@/data/site";
import { collectionProducts, getProduct, type Product } from "@/lib/catalog";

/** The Gen Z — It Girl edit, presented as a row of pale product panels. */
export default function GenZEdit() {
  const edit = edits.find((e) => e.handle === "gen-z")!;

  const picks: Product[] = (edit.picks ?? [])
    .map(getProduct)
    .filter((p): p is Product => Boolean(p));

  const items = picks.length ? picks : collectionProducts(edit.handle, 4);

  return (
    <section className="bg-bone-3 py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow text-ash-3">The Edit</p>
          </Reveal>

          <SplitText
            text={edit.title}
            className="mt-4 text-[clamp(1.9rem,4.4vw,3.2rem)] text-ink"
          />

          <Reveal delay={0.12}>
            <p className="mt-6 font-body text-[1.06rem] leading-relaxed text-ink/60 md:text-[1.12rem]">
              {edit.copy}
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
            href={`/collections/${edit.handle}`}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 font-display text-[0.66rem] uppercase tracking-[0.22em] text-bone transition-colors duration-500 hover:bg-ink-3"
          >
            Shop The Edit
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
