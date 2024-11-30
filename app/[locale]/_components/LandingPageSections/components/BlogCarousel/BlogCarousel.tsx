import Carousel from '@/_components/Carousel';
import Typography from '@/_components/Typography';
import { BlogContent } from '@/_lib/halaltravel/blog';
import { Link } from '@/_lib/i18n/routing';
import { tailwindConfig } from '@/_lib/tailwind';
import BlogCard from '../BlogCard';

export function BlogCarousel({
  data,
}: {
  data: {
    title: string;
    subtitle?: string;
    items: BlogContent[];
    seeMoreButton: string;
  };
}) {
  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h3">{data.title}</Typography>
        <Link
          href="/"
          className="text-heading text-nowrap text-xl font-semibold leading-[24px] text-[#2A3075]"
        >
          {data.seeMoreButton}
        </Link>
      </div>
      {data.subtitle && (
        <Typography variant="h5" className="mt-1 opacity-70 xl:mt-2">
          {data.subtitle}
        </Typography>
      )}
      <Carousel
        className="mt-4 xl:mt-6 [&_.slick-next:before]:text-black [&_.slick-prev:before]:text-black [&_.slick-slide]:pr-[24px] [&_.slick-track]:py-2"
        variableWidth
        dots
        responsive={[
          {
            breakpoint: parseInt(tailwindConfig.theme.screens.xl),
            settings: {
              arrows: false,
              dots: false,
            },
          },
        ]}
      >
        {data.items.map((item, i) => (
          <BlogCard key={i} data={item} />
        ))}
      </Carousel>
    </div>
  );
}
