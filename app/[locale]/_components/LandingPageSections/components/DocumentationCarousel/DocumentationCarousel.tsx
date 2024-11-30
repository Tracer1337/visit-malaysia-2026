import Carousel from '@/_components/Carousel';
import StrapiImage from '@/_components/StrapiImage';
import Typography from '@/_components/Typography';
import { ImageList } from '@/_lib/strapi/media';
import { tailwindConfig } from '@/_lib/tailwind';

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
        className="mt-6 [&_.slick-next:before]:text-black [&_.slick-prev:before]:text-black [&_.slick-slide]:px-[12px]"
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
            data={item}
            className="h-[142px] rounded-xl xl:h-[210px]"
          />
        ))}
      </Carousel>
    </>
  );
}
