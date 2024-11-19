import { ImageList } from '@/_lib/strapi/media';
import Typography from '../ui/Typography';
import StrapiImage from '../ui/StrapiImage';

export function PressShowcase({
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
      <div className="-mx-4 mt-6 flex max-w-[100vw] items-start justify-center gap-3 overflow-hidden">
        {data.images.data.map((image) => (
          <StrapiImage key={image.id} data={image} />
        ))}
      </div>
    </>
  );
}
