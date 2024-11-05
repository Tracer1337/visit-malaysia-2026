import { tailwindConfig } from '@/_lib/tailwind';
import Carousel from '../ui/Carousel';
import Typography from '../ui/Typography';
import { ImageList } from '@/_lib/strapi/media';
import StrapiImage from '../ui/StrapiImage';

export function DocumentationCarousel({
  data,
}: {
  data: {
    title: string;
    images: ImageList;
  };
}) {
  return (
    <>
      <Typography variant="h3" className="text-center">
        {data.title}
      </Typography>
      <Carousel
        className="mt-6 [&_.slick-slide]:px-[12px] [&_.slick-next:before]:text-black [&_.slick-prev:before]:text-black"
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
        {data.images.data.map((item) => (
          <StrapiImage
            key={item.id}
            data={item.attributes}
            className="rounded-xl h-[142px] xl:h-[210px]"
          />
        ))}
      </Carousel>
    </>
  );
}
