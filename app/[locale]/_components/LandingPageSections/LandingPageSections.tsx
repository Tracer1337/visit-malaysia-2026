import { BlogResponse } from '@/_lib/halaltravel/blog';
import { LandingPageData } from '@/_lib/strapi/landing-page';
import ActivityShowcase from './components/ActivityShowcase';
import Adverts from './components/Adverts';
import BlogCarousel from './components/BlogCarousel';
import DiscoverySearch from './components/DiscoverySearch';
import DocumentationCarousel from './components/DocumentationCarousel';
import EditorsChoiceShowcase from './components/EditorsChoiceShowcase';
import EventCarousel from './components/EventCarousel';
import PressShowcase from './components/PressShowcase';

export function LandingPageSections({
  landingPageData,
  mostBookmarkedBlogData,
  mostRecentBlogData,
}: {
  landingPageData: LandingPageData;
  mostBookmarkedBlogData: BlogResponse;
  mostRecentBlogData: BlogResponse;
}) {
  return (
    <>
      <div className="flex justify-center rounded-t-3xl bg-[#F7F9FA] xl:-mt-6">
        <section className="container mb-3 mt-[26px] w-full xl:my-20 xl:max-w-[715px] xl:p-0">
          <DiscoverySearch data={landingPageData.attributes.SearchGroup} />
        </section>
      </div>
      <section className="container mx-auto my-6 xl:my-20">
        <Adverts />
      </section>
      <section className="container mx-auto mt-[50px] pb-[26px] xl:mt-[66px] [&>div]:mt-[52px]">
        <BlogCarousel
          data={{
            title: 'Most Bookmarked',
            seeMoreButton: landingPageData.attributes.SeeMoreButton,
            items: mostBookmarkedBlogData.content,
          }}
        />
        <BlogCarousel
          data={{
            title: 'Most Recent',
            seeMoreButton: landingPageData.attributes.SeeMoreButton,
            items: mostRecentBlogData.content,
          }}
        />
      </section>
      <section className="bg-[#F7F9FA] py-6 xl:py-[80px]">
        <div className="container mx-auto">
          <ActivityShowcase data={landingPageData.attributes.ActivityGroup} />
        </div>
      </section>
      <section className="bg-[#0A1B74] py-[50px] xl:py-[80px]">
        <div className="container mx-auto">
          <EditorsChoiceShowcase
            data={landingPageData.attributes.EditorsChoiceGroup}
          />
        </div>
      </section>
      <section className="bg-[#F7F9FA] pt-6 xl:pt-[108px]">
        <div className="container mx-auto">
          <EventCarousel
            data={{
              title: landingPageData.attributes.UpcomingEventTitle,
              subtitle: landingPageData.attributes.UpcomingEventSubtitle,
              seeMoreButton: landingPageData.attributes.SeeMoreButton,
              events: landingPageData.attributes.EventList,
            }}
          />
        </div>
      </section>
      <section className="bg-[#F7F9FA] pt-6 xl:pt-[100px]">
        <div className="container mx-auto">
          <DocumentationCarousel
            data={{
              title: landingPageData.attributes.OurFunDocumentation,
              images: landingPageData.attributes.OurFunDocumentationImg,
            }}
          />
        </div>
      </section>
      {/* API for this sections is not available yet */}
      {/* <section className="bg-[#F7F9FA] pt-[64px] xl:pt-[90px]">
        <div className="container mx-auto">
          <ReviewCarousel />
        </div>
      </section> */}
      <section className="bg-[#F7F9FA] pb-[50px] pt-[84px] xl:pt-[100px]">
        <div className="container mx-auto">
          <PressShowcase
            data={{
              title: landingPageData.attributes.FromPressTitle,
              images: landingPageData.attributes.PressImg,
            }}
          />
        </div>
      </section>
    </>
  );
}
