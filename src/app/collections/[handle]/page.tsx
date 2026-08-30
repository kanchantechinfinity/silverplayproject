import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import ShopGrid from "@/components/shop/ShopGrid";
import { getCollection, collectionProducts, collectionImage, collections } from "@/lib/catalog";

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
