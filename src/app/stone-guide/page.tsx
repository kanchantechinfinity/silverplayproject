import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import StoneExplorer from "@/components/stoneguide/StoneExplorer";
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
          description="Every Silver Play pendant is set with a genuine natural stone. Hover or tap any stone on the left to read its full guide here — meaning, care and character, all on this one page."
        />

        <section className="bg-bone py-16 md:py-24">
          <div className="mx-auto max-w-[1500px] px-5 md:px-10">
            <StoneExplorer stones={stones} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
