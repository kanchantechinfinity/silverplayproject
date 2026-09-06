import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/product/ProductGallery";
import ProductBuyBox from "@/components/product/ProductBuyBox";
import ProductInfoAccordion from "@/components/product/ProductInfoAccordion";
import ProductBoxContents from "@/components/product/ProductBoxContents";
import ProductPairedWith from "@/components/product/ProductPairedWith";
import ProductReviews from "@/components/product/ProductReviews";
import ProductLovedByCreators from "@/components/product/ProductLovedByCreators";
import RecentlyViewed from "@/components/product/RecentlyViewed";
import FAQ from "@/components/sections/FAQ";
import { getProduct, getCollection, products, collections, collectionProducts, chipFor } from "@/lib/catalog";
import { dummyProductByHandle, dummyCollectionHandle, makeDummyProducts } from "@/lib/dummy";

export function generateStaticParams() {
  const real = products.map((p) => ({ handle: p.handle }));

  // Same real collections that fall back to sample listings on the PLP —
  // pre-render their sample product pages too, so "View Full Details" from
  // a sample tile doesn't 404.
  const dummy = collections
    .filter((c) => c.count > 0 && collectionProducts(c.handle).length === 0)
    .flatMap((c) => makeDummyProducts(c.handle, c.title).map((p) => ({ handle: p.handle })));

  return [...real, ...dummy];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const resolved = resolveProduct(handle);
  if (!resolved) return {};
  const { product } = resolved;
  return {
    title: `${product.title} — Silver Play`,
    description: product.description.slice(0, 155),
  };
}

/** Real product first; falls back to a deterministic dummy piece for
 *  "sample-<collection>-<n>" handles (see collections/[handle]/page.tsx). */
function resolveProduct(handle: string) {
  const real = getProduct(handle);
  if (real) return { product: real, isDummy: false, collectionHandle: null as string | null };

  const collectionHandle = dummyCollectionHandle(handle);
  if (!collectionHandle) return null;
  const collection = getCollection(collectionHandle);
  if (!collection) return null;
  const dummy = dummyProductByHandle(handle, collection.title);
  if (!dummy) return null;
  return { product: dummy, isDummy: true, collectionHandle };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const resolved = resolveProduct(handle);
  if (!resolved) notFound();
  const { product, isDummy, collectionHandle } = resolved;

  const related = isDummy
    ? makeDummyProducts(collectionHandle!, getCollection(collectionHandle!)!.title).filter(
        (p) => p.handle !== product.handle,
      )
    : collectionProducts(product.type.toLowerCase(), 5).filter((p) => p.handle !== product.handle);

  // "Complete the look" pairs a genuinely different piece type (a pendant
  // gets an earring suggestion, not another pendant) — deterministic by
  // product id rather than random, so the pairing is stable on reload.
  const otherType = products.filter((p) => p.type !== product.type && p.handle !== product.handle);
  const pairProduct = otherType.length > 0 ? otherType[product.id % otherType.length] : null;

  const creatorPicks = (related.length > 0 ? related : products.filter((p) => p.handle !== product.handle)).slice(0, 8);

  return (
    <>
      <Header />
      <main className="flex-1 pt-28 md:pt-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <nav aria-label="Breadcrumb" className="font-body text-[0.8rem] text-ink/50">
            <Link href="/shop" className="hover:text-ink">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/collections/${isDummy ? collectionHandle : product.type.toLowerCase()}`}
              className="hover:text-ink"
            >
              {product.type}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink/75">{product.title}</span>
          </nav>

          <div className="mt-6 grid gap-10 pb-24 md:grid-cols-2 md:items-start md:gap-14 md:pb-32">
            {/* Sticky on desktop: the image stays put while the (now much
                taller, with the gift/PIN/box additions) info column scrolls
                past it, and only scrolls away itself once that column runs
                out — rather than the two columns racing at different
                speeds and leaving a bare gap under the shorter one. */}
            <Reveal className="md:sticky md:top-32">
              <ProductGallery images={product.images} title={product.title} />
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <ProductBuyBox product={product} chip={chipFor(product)} />
              <ProductInfoAccordion product={product} />
            </Reveal>
          </div>
        </div>

        <ProductBoxContents />

        {pairProduct && <ProductPairedWith product={product} pair={pairProduct} />}

        <ProductReviews product={product} />

        <ProductLovedByCreators picks={creatorPicks} />

        {related.length > 0 && (
          <section className="border-t border-ink/10 bg-bone-2 py-20 md:py-28">
            <div className="mx-auto max-w-[1500px] px-5 md:px-10">
              <Reveal>
                <p className="eyebrow text-ash-3">Similar Products</p>
              </Reveal>
              <Stagger className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
                {related.map((p, i) => (
                  <StaggerItem
                    key={p.handle}
                    className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(20%-1.2rem)]"
                  >
                    <ProductCard product={p} priority={i === 0} />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        <RecentlyViewed currentHandle={product.handle} />

        <FAQ />
      </main>
      <Footer />
    </>
  );
}
