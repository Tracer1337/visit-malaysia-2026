import ActivityShowcase from '@/_components/ActivityShowcase';
import Adverts from '@/_components/Adverts';
import AIGuide from '@/_components/AIGuide';
import LocationCarousel from '@/_components/LocationCarousel';
import LocationDetails from '@/_components/LocationDetails';
import DocumentationCarousel from '@/_components/DocumentationCarousel';
import EventCarousel from '@/_components/EventCarousel';
import PressShowcase from '@/_components/PressShowcase';
import ReviewCarousel from '@/_components/ReviewCarousel';
import TravelPlanShowcase from '@/_components/TravelPlanShowcase';
import Button from '@/_components/ui/Button';

export default function PreviewPage() {
  return (
    <main>
      {/* TODO: Render inside landing page */}
      <LocationDetails />
      <div className="bg-[#F7F9FA] flex justify-center rounded-t-3xl mt-[118px]">
        <section className="my-20 max-w-[715px] w-full">
          <AIGuide />
        </section>
      </div>
      <section className="container mt-20 mx-auto">
        <Adverts />
      </section>
      <section className="container mt-[66px] mx-auto [&>div]:mt-[52px] pb-[26px]">
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
      <section className="bg-[#F7F9FA] py-[80px]">
        <div className="container mx-auto">
          <ActivityShowcase />
        </div>
      </section>
      <section className="bg-[#0A1B74] py-[80px]">
        <div className="container mx-auto">
          <TravelPlanShowcase />
        </div>
      </section>
      <section className="bg-[#F7F9FA] pt-[108px]">
        <div className="container mx-auto">
          <EventCarousel />
        </div>
      </section>
      <section className="bg-[#F7F9FA] pt-[50px]">
        <div className="container mx-auto">
          <DocumentationCarousel />
        </div>
      </section>
      <section className="bg-[#F7F9FA] pt-[90px]">
        <div className="container mx-auto">
          <ReviewCarousel />
        </div>
      </section>
      <section className="bg-[#F7F9FA] pt-[100px] pb-[50px]">
        <div className="container mx-auto">
          <PressShowcase />
        </div>
      </section>
    </main>
  );
}
