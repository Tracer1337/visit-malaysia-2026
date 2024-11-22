import { setRequestLocale } from 'next-intl/server';
import BlogCarousel from '@/_components/BlogCarousel';
import EditorsChoiceShowcase from '@/_components/EditorsChoiceShowcase';
import {
  fetchMostBookmarkedBlog,
  fetchMostRecentBlog,
} from '@/_lib/halaltravel/blog';
import { fetchLandingPage } from '@/_lib/strapi/landing-page';
import ActivityShowcase from '../_components/ActivityShowcase';
import Adverts from '../_components/Adverts';
import DiscoverySearch from '../_components/DiscoverySearch';
import DocumentationCarousel from '../_components/DocumentationCarousel';
import EventCarousel from '../_components/EventCarousel';
import PressShowcase from '../_components/PressShowcase';

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const [{ data }, mostBookmarkedBlogData, mostRecentBlogData] =
    await Promise.all([
      fetchLandingPage({ locale }),
      fetchMostBookmarkedBlog(),
      fetchMostRecentBlog(),
    ]);

  return (
    <main>
      <div className="flex justify-center rounded-t-3xl bg-[#F7F9FA] xl:-mt-6">
        <section className="container mb-3 mt-[26px] w-full xl:my-20 xl:max-w-[715px] xl:p-0">
          <DiscoverySearch data={data.attributes.SearchGroup} />
        </section>
      </div>
      <section className="container mx-auto my-6 xl:my-20">
        <Adverts />
      </section>
      <section className="container mx-auto mt-[50px] pb-[26px] xl:mt-[66px] [&>div]:mt-[52px]">
        <BlogCarousel
          data={{
            title: 'Most Bookmarked',
            seeMoreButton: data.attributes.SeeMoreButton,
            items: mostBookmarkedBlogData.content,
          }}
        />
        <BlogCarousel
          data={{
            title: 'Most Recent',
            seeMoreButton: data.attributes.SeeMoreButton,
            items: mostRecentBlogData.content,
          }}
        />
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
      <section className="bg-[#F7F9FA] pt-6 xl:pt-[100px]">
        <div className="container mx-auto">
          <DocumentationCarousel
            data={{
              title: data.attributes.OurFunDocumentation,
              images: data.attributes.OurFunDocumentationImg,
            }}
          />
        </div>
      </section>
      {/* API for theses sections is not available yet */}
      {/* <section className="bg-[#F7F9FA] pt-[64px] xl:pt-[90px]">
        <div className="container mx-auto">
          <ReviewCarousel />
        </div>
      </section> */}
      <section className="bg-[#F7F9FA] pb-[50px] pt-[84px] xl:pt-[100px]">
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
