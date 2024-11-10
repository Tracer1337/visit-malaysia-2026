import { fetchLocationDetails } from '@/_lib/halaltravel/location/details';
import BlogCard from '../BlogCard';
import Typography from '../ui/Typography';
import { LocationPageSearchParams } from '@/[locale]/@hero/location/page';
import Image from 'next/image';
import { fetchLocationBlog } from '@/_lib/halaltravel/blog';
import BlogCarousel from '../BlogCarousel';
import { LandingPageData } from '@/_lib/strapi/landing-page';

export async function LocationDetails({
  landingPageData,
  query,
}: {
  landingPageData: LandingPageData;
  query: LocationPageSearchParams;
}) {
  const [details, blog] = await Promise.all([
    fetchLocationDetails(query),
    fetchLocationBlog(query),
  ]);

  return (
    <>
      <div className="mt-4 xl:-mt-[67px] h-[396px] xl:h-[661px] relative">
        {query.thumbnailUrl && (
          <Image
            src={query.thumbnailUrl}
            alt=""
            fill
            sizes="100vw"
            className="object-center object-cover pointer-events-none -z-10 brightness-50"
          />
        )}
        <div className="relative container mx-auto pt-[60px] xl:pt-[230px]">
          <Typography variant="h1" className="text-white xl:max-w-[60%]">
            {details.title}
          </Typography>
        </div>
      </div>
      <div className="container mx-auto mt-4 xl:flex xl:gap-[42px] xl:mt-[46px] xl:pb-[100px]">
        <div>
          <Typography variant="body1" element="p" className="mb-8">
            {details.summary}
          </Typography>
          <Typography
            variant="body1"
            element="p"
            dangerouslySetInnerHTML={{ __html: details.blog }}
          />
        </div>
        <div className="max-xl:mt-[42px] min-w-[278px] max-xl:hidden">
          <Typography variant="h3">Top Recommend Itineraries</Typography>
          <div className="mt-6 flex xl:flex-col gap-6 max-xl:overflow-x-hidden">
            {blog.content.map((content) => (
              <BlogCard key={content.id} data={content} />
            ))}
          </div>
        </div>
        <div className="xl:hidden mx-4 py-7">
          <BlogCarousel
            data={{
              title: 'Top Recommend Itineraries',
              subtitle:
                'Unique travel plans and experiences shared by guides and travellers',
              items: blog.content,
              seeMoreButton: landingPageData.attributes.SeeMoreButton,
            }}
          />
        </div>
      </div>
    </>
  );
}
