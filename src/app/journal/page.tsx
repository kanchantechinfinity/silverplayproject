import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import JournalArchiveGrid from "@/components/journal/JournalArchiveGrid";
import { journal } from "@/data/site";

export const metadata = {
  title: "Journal — Silver Play",
  description: "Silver stories: guides, craft, and the people behind Silver Play's handcrafted jewellery.",
};

export default function JournalIndexPage() {
  const banner = journal.find((p) => p.slug === "inside-the-jaipur-atelier")!;

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Silver Stories"
          heading="Journal"
          image={banner.image}
          description="Guides, craft and the people behind Silver Play's handcrafted jewellery."
        />

        <div className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
          <JournalArchiveGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
