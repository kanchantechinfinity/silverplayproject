import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AssuranceBar from "@/components/sections/AssuranceBar";
import CinematicHero from "@/components/sections/CinematicHero";
import GenZEdit from "@/components/sections/GenZEdit";
import RoyalSimplicity from "@/components/sections/RoyalSimplicity";
import ArchiveTreasure from "@/components/sections/ArchiveTreasure";
import ShopByOccasion from "@/components/sections/ShopByOccasion";
import CoolGirlSilver from "@/components/sections/CoolGirlSilver";
import SpotlightGlam from "@/components/sections/SpotlightGlam";
import TheTreasures from "@/components/sections/TheTreasures";
import EffortlessElegance from "@/components/sections/EffortlessElegance";
import JournalShowcase from "@/components/sections/JournalShowcase";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <CinematicHero />

        <AssuranceBar />

        <GenZEdit />

        <RoyalSimplicity />

        <ArchiveTreasure />

        <div className="pb-24 md:pb-32">
          <CoolGirlSilver />
        </div>

        <ShopByOccasion />

        <TheTreasures />

        <SpotlightGlam />

        <EffortlessElegance />

        <Testimonials />

        <JournalShowcase />
      </main>
      <Footer />
    </>
  );
}
