import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import ShopGrid from "@/components/shop/ShopGrid";

export const metadata = {
  title: "Shop All — Silver Play",
  description: "Browse the full Silver Play collection of handcrafted 925 sterling silver jewellery.",
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-28 md:pt-32">
        <div className="mx-auto max-w-[1500px] px-5 pb-10 md:px-10">
          <Reveal>
            <p className="eyebrow text-ash-3">Every Piece</p>
          </Reveal>
          <SplitText text="Shop All Silver" className="mt-3 text-[clamp(2rem,5vw,3.4rem)] text-ink" />
        </div>

        <div className="mx-auto max-w-[1500px] px-5 pb-24 md:px-10 md:pb-32">
          <ShopGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
