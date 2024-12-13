import Carousel from '@/_components/Carousel';
import Typography from '@/_components/Typography';
import { tailwindConfig } from '@/_lib/tailwind/config';
import ReviewCard from '../ReviewCard';

const items = Array(5).fill(0);

export function ReviewCarousel() {
  return (
    <>
      <Typography variant="h3" className="text-center">
        Our Review
      </Typography>
      <Typography variant="h5" className="mt-2 text-center opacity-70">
        We’ve 4.7/5 Positive Reviews From Several Credential Reviewers Platform
      </Typography>
      <Carousel
        className="mt-4 xl:mt-6 [&_.slick-next:before]:text-black [&_.slick-prev:before]:text-black [&_.slick-slide]:pr-[24px]"
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
          <ReviewCard key={i} />
        ))}
      </Carousel>
    </>
  );
}
