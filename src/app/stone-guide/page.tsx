import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import StoneCard from "@/components/stoneguide/StoneCard";
import StoneJumpNav from "@/components/stoneguide/StoneJumpNav";
import { collectionImage } from "@/lib/catalog";
import { stoneGuide } from "@/data/stoneGuide";

export const metadata = {
  title: "Stone Guide — Silver Play",
  description:
    "Every Silver Play pendant is set with a genuine natural stone. Meet all of them right here — meaning, care and character, no clicking away.",
};

export default function StoneGuidePage() {
  const stones = stoneGuide.map((s) => ({
    ...s,
    image: collectionImage(s.handle) ?? "",
  }));

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Certified & Natural"
          heading="The Stone Guide"
          image={stones[0]?.image || ""}
          description="Every Silver Play pendant is set with a genuine natural stone. Meet the full lineup below — meaning, care and character, image included, all on this one page."
        />

        <section className="bg-bone-3 py-14 md:py-16">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <StoneJumpNav stones={stones.map(({ handle, name, image }) => ({ handle, name, image }))} />
          </div>
        </section>

        <section className="bg-bone py-16 md:py-24">
          <div className="mx-auto max-w-[1500px] px-5 md:px-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stones.map((stone) => (
                <StoneCard key={stone.handle} stone={stone} image={stone.image} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
