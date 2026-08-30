import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import JournalArchiveGrid from "@/components/journal/JournalArchiveGrid";

export const metadata = {
  title: "Journal — Silver Play",
  description: "Silver stories: guides, craft, and the people behind Silver Play's handcrafted jewellery.",
};

export default function JournalIndexPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-28 md:pt-32">
        <div className="mx-auto max-w-[1500px] px-5 pb-12 text-center md:px-10 md:pb-16">
          <Reveal>
            <p className="eyebrow text-ash-3">Silver Stories</p>
          </Reveal>
          <SplitText text="Journal" className="mt-3 text-[clamp(2.4rem,6vw,4.2rem)] text-ink" />
        </div>

        <div className="mx-auto max-w-[1500px] px-5 pb-24 md:px-10 md:pb-32">
          <JournalArchiveGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
