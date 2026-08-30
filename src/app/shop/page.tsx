import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import ShopGrid from "@/components/shop/ShopGrid";
import { heritage } from "@/data/site";

export const metadata = {
  title: "Shop All — Silver Play",
  description: "Browse the full Silver Play collection of handcrafted 925 sterling silver jewellery.",
};

export default function ShopPage() {
  const banner = heritage.find((h) => h.handle === "raajsi-shahi")!;

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Every Piece"
          heading="Shop All Silver"
          image={banner.image}
          description="233 pieces of handcrafted 92.5% sterling silver — earrings, pendants and rakhis, all BIS hallmarked."
        />

        <div className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
          <ShopGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
