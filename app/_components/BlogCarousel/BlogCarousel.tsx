import Link from 'next/link';
import BlogCard from '../BlogCard';
import Typography from '../ui/Typography';
import Carousel from '../ui/Carousel';
import { tailwindConfig } from '@/_lib/tailwind';
import { BlogContent } from '@/_lib/halaltravel/blog';

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
          className="text-heading font-semibold text-xl leading-[24px] text-[#2A3075] text-nowrap"
        >
          {data.seeMoreButton}
        </Link>
      </div>
      {data.subtitle && (
        <Typography variant="h5" className="opacity-70 mt-1 xl:mt-2">
          {data.subtitle}
        </Typography>
      )}
      <Carousel
        className="mt-4 xl:mt-6 [&_.slick-slide]:pr-[24px] [&_.slick-next:before]:text-black [&_.slick-prev:before]:text-black [&_.slick-track]:py-2"
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
