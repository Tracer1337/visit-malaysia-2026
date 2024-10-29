import ActivityShowcase from './_components/ActivityShowcase';
import Adverts from './_components/Adverts';
import AIGuide from './_components/AIGuide';
import TravelRecommendations from './_components/TravelRecommendations';
import Button from './_components/ui/Button';

export default function LandingPage() {
  return (
    <main>
      <div className="bg-[#F7F9FA] flex justify-center rounded-t-3xl -mt-6">
        <section className="my-20 max-w-[715px] w-full">
          <AIGuide />
        </section>
      </div>
      <section className="container mt-20 mx-auto">
        <Adverts />
      </section>
      <section className="container mt-[66px] mx-auto [&>div]:mt-[52px] pb-[26px]">
        <TravelRecommendations
          title="Top Recommend Itineraries"
          subtitle="Unique travel plans and experiences shared by guides and travellers"
        />
        <TravelRecommendations
          title="Island & Beaches"
          subtitle="From pristine beaches to deep sea dives among the mysteries of the ocean, our communities reserve their best experiences with you. "
        />
        <TravelRecommendations
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
    </main>
  );
}
