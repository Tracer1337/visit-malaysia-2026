import { tailwindConfig } from '@/_lib/tailwind';
import Carousel from '../ui/Carousel';
import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography';

const items = Array(5).fill(0);

export function DocumentationCarousel() {
  return (
    <>
      <Typography variant="h3" className="text-center">
        Our Fun Documentation
      </Typography>
      <Carousel
        className="mt-6 [&_.slick-slide]:pr-[24px] [&_.slick-next:before]:text-black [&_.slick-prev:before]:text-black"
        variableWidth
        infinite
        centerMode
        responsive={[
          {
            breakpoint: parseInt(tailwindConfig.theme.screens.xl),
            settings: {
              arrows: false,
            },
          },
        ]}
      >
        {items.map((_, i) => (
          <Placeholder
            width={210}
            height={210}
            className="rounded-xl min-w-[142px] xl:min-w-[210px]"
            key={i}
          />
        ))}
      </Carousel>
    </>
  );
}
