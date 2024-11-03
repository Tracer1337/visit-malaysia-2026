import { Locale } from '../../i18n-config';
import { fetchLandingPage } from '@/_lib/strapi/landing-page';
import ActivityShowcase from '../_components/ActivityShowcase';
import Adverts from '../_components/Adverts';
import DiscoverySearch from '../_components/DiscoverySearch';
import DocumentationCarousel from '../_components/DocumentationCarousel';
import LocationCarousel from '../_components/LocationCarousel';
import Button from '../_components/ui/Button';
import EventCarousel from '../_components/EventCarousel';
import ReviewCarousel from '../_components/ReviewCarousel';
import PressShowcase from '../_components/PressShowcase';
import EditorsChoiceShowcase from '@/_components/EditorsChoiceShowcase';

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const { data } = await fetchLandingPage({ locale });

  return (
    <main>
      <div className="bg-[#F7F9FA] flex justify-center rounded-t-3xl xl:-mt-6">
        <section className="mt-[26px] mb-3 xl:my-20 container xl:p-0 xl:max-w-[715px] w-full">
          <DiscoverySearch data={data.attributes.SearchGroup} />
        </section>
      </div>
      <section className="container mx-auto mt-6 xl:mt-20">
        <Adverts />
      </section>
      <section className="container mt-[50px] xl:mt-[66px] mx-auto [&>div]:mt-[52px] pb-[26px]">
        <LocationCarousel
          data={{
            title: 'Top Recommend Itineraries',
            subtitle:
              'Unique travel plans and experiences shared by guides and travellers',
            seeMoreButton: data.attributes.SeeMoreButton,
          }}
        />
        <LocationCarousel
          data={{
            title: 'Island & Beaches',
            subtitle:
              'From pristine beaches to deep sea dives among the mysteries of the ocean, our communities reserve their best experiences with you. ',
            seeMoreButton: data.attributes.SeeMoreButton,
          }}
        />
        <LocationCarousel
          data={{
            title: 'Cultural & Arts',
            subtitle:
              'Unique travel plans and experiences shared by guides and travellers',
            seeMoreButton: data.attributes.SeeMoreButton,
          }}
        />
        <div className="flex justify-center">
          <Button>Load More</Button>
        </div>
      </section>
      <section className="bg-[#F7F9FA] py-6 xl:py-[80px]">
        <div className="container mx-auto">
          <ActivityShowcase data={data.attributes.ActivityGroup} />
        </div>
      </section>
      <section className="bg-[#0A1B74] py-[50px] xl:py-[80px]">
        <div className="container mx-auto">
          <EditorsChoiceShowcase data={data.attributes.EditorsChoiceGroup} />
        </div>
      </section>
      <section className="bg-[#F7F9FA] pt-6 xl:pt-[108px]">
        <div className="container mx-auto">
          <EventCarousel
            data={{
              title: data.attributes.UpcomingEventTitle,
              subtitle: data.attributes.UpcomingEventSubtitle,
              seeMoreButton: data.attributes.SeeMoreButton,
              events: data.attributes.EventList,
            }}
          />
        </div>
      </section>
      <section className="bg-[#F7F9FA] pt-6 xl:pt-[50px]">
        <div className="container mx-auto">
          <DocumentationCarousel
            data={{
              title: data.attributes.OurFunDocumentation,
              images: data.attributes.OurFunDocumentationImg,
            }}
          />
        </div>
      </section>
      <section className="bg-[#F7F9FA] pt-[64px] xl:pt-[90px]">
        <div className="container mx-auto">
          <ReviewCarousel />
        </div>
      </section>
      <section className="bg-[#F7F9FA] pt-[84px] xl:pt-[100px] pb-[50px]">
        <div className="container mx-auto">
          <PressShowcase
            data={{
              title: data.attributes.FromPressTitle,
              images: data.attributes.PressImg,
            }}
          />
        </div>
      </section>
    </main>
  );
}
