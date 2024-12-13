import Carousel from '@/_components/Carousel';
import Typography from '@/_components/Typography';
import { Link } from '@/_lib/i18n/routing';
import { LandingPageEvent } from '@/_lib/strapi/landing-page';
import { tailwindConfig } from '@/_lib/tailwind/config';
import EventCard from '../EventCard';

export function EventCarousel({
  data,
}: {
  data: {
    title: string;
    subtitle: string;
    seeMoreButton: string;
    events: LandingPageEvent[];
  };
}) {
  return (
    <>
      <div className="flex justify-between">
        <Typography variant="h3">{data.title}</Typography>
        <Link
          href="/"
          className="text-heading text-nowrap text-xl font-semibold leading-[24px] text-[#2A3075]"
        >
          {data.seeMoreButton}
        </Link>
      </div>
      <Typography variant="h5" className="mt-2 opacity-70">
        {data.subtitle}
      </Typography>
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
        {data.events.map((item) => (
          <EventCard data={item} key={item.id} />
        ))}
      </Carousel>
    </>
  );
}
