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
import { getProduct, products, collectionProducts, chipFor } from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return {};
  return {
    title: `${product.title} — Silver Play`,
    description: product.description.slice(0, 155),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const related = collectionProducts(product.type.toLowerCase(), 5).filter(
    (p) => p.handle !== product.handle,
  );

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
            <Link href={`/collections/${product.type.toLowerCase()}`} className="hover:text-ink">
              {product.type}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink/75">{product.title}</span>
          </nav>

          <div className="mt-6 grid gap-10 pb-24 md:grid-cols-2 md:gap-14 md:pb-32">
            <Reveal>
              <ProductGallery images={product.images} title={product.title} />
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <ProductBuyBox product={product} chip={chipFor(product)} />
              <ProductInfoAccordion product={product} />
            </Reveal>
          </div>
        </div>

        {related.length > 0 && (
          <section className="border-t border-ink/10 bg-bone-2 py-20 md:py-28">
            <div className="mx-auto max-w-[1500px] px-5 md:px-10">
              <Reveal>
                <p className="eyebrow text-ash-3">You May Also Love</p>
              </Reveal>
              <Stagger className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
                {related.map((p, i) => (
                  <StaggerItem key={p.handle}>
                    <ProductCard product={p} priority={i === 0} />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
