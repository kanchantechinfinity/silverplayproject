import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import ShopGrid from "@/components/shop/ShopGrid";
import { getCollection, collectionProducts, collections } from "@/lib/catalog";

export function generateStaticParams() {
  return collections.filter((c) => c.count > 0).map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) return {};
  return {
    title: `${collection.title} — Silver Play`,
    description: collection.description || `Shop the ${collection.title} collection at Silver Play.`,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) notFound();

  const items = collectionProducts(handle);

  return (
    <>
      <Header />
      <main className="flex-1 pt-28 md:pt-32">
        <div className="mx-auto max-w-[1500px] px-5 pb-10 md:px-10">
          <Reveal>
            <p className="eyebrow text-ash-3">Collection</p>
          </Reveal>
          <SplitText text={collection.title} className="mt-3 text-[clamp(2rem,5vw,3.4rem)] text-ink" />
          {collection.description && (
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-xl font-body text-[1rem] leading-relaxed text-ink/60">
                {collection.description}
              </p>
            </Reveal>
          )}
        </div>

        <div className="mx-auto max-w-[1500px] px-5 pb-24 md:px-10 md:pb-32">
          {items.length > 0 ? (
            <ShopGrid baseProducts={items} />
          ) : (
            <p className="py-20 text-center font-body text-ink/50">
              This collection doesn&apos;t have any pieces listed yet.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
