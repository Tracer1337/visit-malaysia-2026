import { fetchLocationDetails } from '@/_lib/halaltravel/location/details';
import BlogCard from '../BlogCard';
import Typography from '../ui/Typography';
import { LocationPageSearchParams } from '@/[locale]/@hero/location/page';
import Image from 'next/image';
import { fetchLocationBlog } from '@/_lib/halaltravel/blog';
import BlogCarousel from '../BlogCarousel';
import { LandingPageData } from '@/_lib/strapi/landing-page';
import Link from 'next/link';

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

  const thumbnailUrl = details.headerImage ?? query.thumbnailUrl;

  return (
    <>
      <div className="relative mt-4 h-[396px] xl:-mt-[67px] xl:h-[661px]">
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt=""
            fill
            sizes="100vw"
            className="pointer-events-none -z-10 object-cover object-center brightness-50"
          />
        )}
        <div className="container relative mx-auto pt-[60px] xl:pt-[230px]">
          <Typography variant="h1" className="text-white xl:max-w-[60%]">
            {details.title}
          </Typography>
        </div>
      </div>
      <div className="container mx-auto mt-4 xl:mt-[46px] xl:flex xl:gap-[42px] xl:pb-[100px]">
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
        <div className="min-w-[278px] max-xl:mt-[42px] max-xl:hidden">
          <Typography variant="h3">Top Recommend Itineraries</Typography>
          <div className="mt-6 flex gap-6 max-xl:overflow-x-hidden xl:flex-col">
            {blog.content.map((content) => (
              <BlogCard key={content.id} data={content} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              href="/"
              className="text-heading text-nowrap text-xl font-semibold leading-[24px] text-[#2A3075]"
            >
              {landingPageData.attributes.SeeMoreButton}
            </Link>
          </div>
        </div>
        <div className="mx-4 py-7 xl:hidden">
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
