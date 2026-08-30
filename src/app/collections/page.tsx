import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { collections, collectionImage } from "@/lib/catalog";

export const metadata = {
  title: "Collections — Silver Play",
  description: "Every Silver Play collection, from everyday earrings to spiritual Kavach pendants.",
};

export default function CollectionsIndexPage() {
  const list = collections
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <>
      <Header />
      <main className="flex-1 pt-28 md:pt-32">
        <div className="mx-auto max-w-[1500px] px-5 pb-10 md:px-10">
          <Reveal>
            <p className="eyebrow text-ash-3">Browse</p>
          </Reveal>
          <SplitText text="All Collections" className="mt-3 text-[clamp(2rem,5vw,3.4rem)] text-ink" />
        </div>

        <div className="mx-auto max-w-[1500px] px-5 pb-24 md:px-10 md:pb-32">
          <Stagger className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {list.map((c) => {
              const image = collectionImage(c.handle);
              return (
                <StaggerItem key={c.handle}>
                  <Link
                    href={`/collections/${c.handle}`}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] bg-bone-2"
                  >
                    {image && (
                      <Image
                        src={image}
                        alt={c.title}
                        fill
                        sizes="(max-width: 768px) 45vw, 22vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="font-display text-[0.85rem] uppercase tracking-[0.12em] text-bone">
                        {c.title}
                      </p>
                      <p className="mt-1 font-body text-[0.72rem] text-bone/60">
                        {c.count} {c.count === 1 ? "piece" : "pieces"}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </main>
      <Footer />
    </>
  );
}
