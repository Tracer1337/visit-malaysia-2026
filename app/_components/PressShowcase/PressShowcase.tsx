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
      <div className="flex justify-center items-start gap-3 mt-6">
        {data.images.data.map((image) => (
          <StrapiImage key={image.id} data={image} />
        ))}
      </div>
    </>
  );
}
