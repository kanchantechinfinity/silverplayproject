import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import ShopGrid from "@/components/shop/ShopGrid";
import { getCollection, collectionProducts, collectionImage, collections, type Product } from "@/lib/catalog";

/**
 * Placeholder tiles for a real collection whose Shopify export listed a
 * non-zero count but has no products mapped in our membership data — a real
 * gap in the scraped dataset (~40 of 70 collections hit this). Shown only as
 * a temporary stand-in so the PLP layout/filters can be previewed; every
 * label says "Sample" so it's never mistaken for a real listing.
 */
function dummyProducts(type: string): Product[] {
  const image = "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-cascade-chains-earring.png?v=1786310334";
  return Array.from({ length: 6 }, (_, i) => ({
    id: -(i + 1),
    handle: `sample-product-${i + 1}`,
    title: `Sample ${type} ${i + 1}`,
    type,
    price: 2500 + i * 750,
    compareAt: i % 3 === 0 ? 2500 + i * 750 + 500 : null,
    available: i !== 4,
    tags: [type, "Sterling Silver"],
    description: "Placeholder listing — real pieces for this collection aren't mapped yet.",
    images: [image],
  }));
}

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

  const realItems = collectionProducts(handle);
  const items = realItems.length > 0 ? realItems : dummyProducts(collection.title);
  const isDummy = realItems.length === 0;
  const banner = collectionImage(handle) ?? items[0]?.images[0];

  return (
    <>
      <Header />
      <main className="flex-1">
        {banner ? (
          <PageHero
            eyebrow="Collection"
            heading={collection.title}
            image={banner}
            description={collection.description || undefined}
          />
        ) : (
          <div className="pt-32" />
        )}

        <div className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
          {isDummy && (
            <p className="mb-8 rounded-[var(--radius-sm)] border border-[#8a6a2e]/30 bg-[#f8f0da] px-5 py-3 text-center font-body text-[0.85rem] text-[#6b5326]">
              Sample layout — real pieces for this collection aren&apos;t mapped in our data yet.
            </p>
          )}
          <ShopGrid baseProducts={items} />
        </div>
      </main>
      <Footer />
    </>
  );
}
