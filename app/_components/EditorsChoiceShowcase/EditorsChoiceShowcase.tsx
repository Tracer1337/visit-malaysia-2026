import { LandingPageEditorsChoiceGroup } from '@/_lib/strapi/landing-page';
import Typography from '../ui/Typography';
import StrapiImage from '../ui/StrapiImage';

export function EditorsChoiceShowcase({
  data,
}: {
  data: LandingPageEditorsChoiceGroup;
}) {
  return (
    <div className="md:grid md:grid-cols-2 md:grid-rows-1 md:items-center">
      <div className="md:p-0 md:max-w-[600px] md:justify-self-end md:mr-12">
        <Typography
          variant="body1"
          className="font-semibold text-white"
          element="p"
        >
          {data.EditorsChoiceTitle}
        </Typography>
        <Typography variant="h2" className="mt-3 text-white">
          {data.EditorsChoiceName}
        </Typography>
        <Typography
          variant="body2"
          className="opacity-75 md:mt-3 text-white"
          element="p"
        >
          {data.EditorsChoiceDesc}
        </Typography>
        <div className="gap-2 mt-3 grid grid-cols-2 grid-rows-3 xl:grid-cols-3 xl:grid-rows-2">
          {data.EditorsChoiceImgs.data.map((img) => (
            <div key={img.id} className="w-[100%] h-[130px] relative">
              <StrapiImage
                data={img}
                fill
                className="object-cover"
                sizes="181px"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="xl:w-[552px] bg-white md:ml-6 mt-6 md:mt-0">
        <div className="relative">
          <video
            width={552}
            height={322}
            className="max-md:w-full"
            src={data.EditorsChoiceVideo.data.attributes.url}
            controls
          />
          <div className="absolute top-0 left-0 px-2.5 py-1 bg-[#F24949] rounded-br-md">
            <Typography variant="body2" className="font-semibold text-shite">
              Tried & Tested
            </Typography>
          </div>
        </div>
        <div className="p-4">
          <Typography variant="h4">{data.EditorsChoiceBlogTitle}</Typography>
          <Typography variant="body1" className="mt-4 opacity-75" element="p">
            {data.EditorsChoiceBlogDesc}
          </Typography>
        </div>
      </div>
    </div>
  );
}
