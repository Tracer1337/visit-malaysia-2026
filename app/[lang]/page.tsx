import ActivityShowcase from '../_components/ActivityShowcase';
import Adverts from '../_components/Adverts';
import AIGuide from '../_components/AIGuide';
import DocumentationCarousel from '../_components/DocumentationCarousel';
import TravelPlanShowcase from '../_components/TravelPlanShowcase';
import LocationCarousel from '../_components/LocationCarousel';
import Button from '../_components/ui/Button';
import EventCarousel from '../_components/EventCarousel';
import ReviewCarousel from '../_components/ReviewCarousel';
import PressShowcase from '../_components/PressShowcase';
import HeroSection from '../_components/HeroSection';

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <div className="bg-[#F7F9FA] flex justify-center rounded-t-3xl xl:-mt-6">
        <section className="mt-[26px] mb-3 xl:my-20 container xl:p-0 xl:max-w-[715px] w-full">
          <AIGuide />
        </section>
      </div>
      <section className="container mx-auto mt-6 xl:mt-20">
        <Adverts />
      </section>
      <section className="container mt-[50px] xl:mt-[66px] mx-auto [&>div]:mt-[52px] pb-[26px]">
        <LocationCarousel
          title="Top Recommend Itineraries"
          subtitle="Unique travel plans and experiences shared by guides and travellers"
        />
        <LocationCarousel
          title="Island & Beaches"
          subtitle="From pristine beaches to deep sea dives among the mysteries of the ocean, our communities reserve their best experiences with you. "
        />
        <LocationCarousel
          title="Cultural & Arts"
          subtitle="Unique travel plans and experiences shared by guides and travellers"
        />
        <div className="flex justify-center">
          <Button>Load More</Button>
        </div>
      </section>
      <section className="bg-[#F7F9FA] py-6 xl:py-[80px]">
        <div className="container mx-auto">
          <ActivityShowcase />
        </div>
      </section>
      <section className="bg-[#0A1B74] py-[50px] xl:py-[80px]">
        <div className="container mx-auto">
          <TravelPlanShowcase />
        </div>
      </section>
      <section className="bg-[#F7F9FA] pt-6 xl:pt-[108px]">
        <div className="container mx-auto">
          <EventCarousel />
        </div>
      </section>
      <section className="bg-[#F7F9FA] pt-6 xl:pt-[50px]">
        <div className="container mx-auto">
          <DocumentationCarousel />
        </div>
      </section>
      <section className="bg-[#F7F9FA] pt-[64px] xl:pt-[90px]">
        <div className="container mx-auto">
          <ReviewCarousel />
        </div>
      </section>
      <section className="bg-[#F7F9FA] pt-[84px] xl:pt-[100px] pb-[50px]">
        <div className="container mx-auto">
          <PressShowcase />
        </div>
      </section>
    </main>
  );
}