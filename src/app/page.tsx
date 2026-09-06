import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AssuranceBar from "@/components/sections/AssuranceBar";
import CinematicHero from "@/components/sections/CinematicHero";
import GenZEdit from "@/components/sections/GenZEdit";
import RoyalSimplicity from "@/components/sections/RoyalSimplicity";
import BestSellers from "@/components/sections/BestSellers";
import ArchiveTreasure from "@/components/sections/ArchiveTreasure";
import ShopByOccasion from "@/components/sections/ShopByOccasion";
import CoolGirlSilver from "@/components/sections/CoolGirlSilver";
import Founder from "@/components/sections/Founder";
import InstagramSlider from "@/components/sections/InstagramSlider";
import EffortlessElegance from "@/components/sections/EffortlessElegance";
import JournalShowcase from "@/components/sections/JournalShowcase";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <CinematicHero />

        <AssuranceBar />

        <GenZEdit />

        <RoyalSimplicity />

        <BestSellers />

        <ArchiveTreasure />

        <div className="py-24 md:py-32">
          <CoolGirlSilver />
        </div>

        <ShopByOccasion />

        <InstagramSlider />

        <Founder />

        <EffortlessElegance />

        <Testimonials />

        <JournalShowcase />

        <FAQ />
      </main>
      <Footer />
    </>
  );
}
