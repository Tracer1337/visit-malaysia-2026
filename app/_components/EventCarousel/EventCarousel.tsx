import Link from 'next/link';
import EventCard from '../EventCard';
import Typography from '../ui/Typography';
import Carousel from '../ui/Carousel';
import { tailwindConfig } from '@/_lib/tailwind';

const items = Array(5).fill(0);

export function EventCarousel() {
  return (
    <>
      <div className="flex justify-between">
        <Typography variant="h3">Upcoming Events</Typography>
        <Link
          href="/"
          className="text-heading font-semibold text-xl leading-[24px] text-[#2A3075] text-nowrap"
        >
          See More
        </Link>
      </div>
      <Typography variant="h5" className="opacity-70 mt-2">
        Let’s join our activity from creator calendar 2024 - 2025
      </Typography>
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
        {items.map((_, i) => (
          <EventCard key={i} />
        ))}
      </Carousel>
    </>
  );
}
