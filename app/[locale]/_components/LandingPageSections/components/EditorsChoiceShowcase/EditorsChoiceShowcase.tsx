import StrapiImage from '@/_components/StrapiImage';
import Typography from '@/_components/Typography';
import { LandingPageEditorsChoiceGroup } from '@/_lib/strapi/landing-page';

export function EditorsChoiceShowcase({
  data,
}: {
  data: LandingPageEditorsChoiceGroup;
}) {
  return (
    <div className="md:grid md:grid-cols-2 md:grid-rows-1 md:items-center">
      <div className="md:mr-12 md:justify-self-end md:p-0 lg:pl-[50px]">
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
          className="text-white opacity-75 md:mt-3"
          element="p"
        >
          {data.EditorsChoiceDesc}
        </Typography>
        <div className="mt-3 grid grid-cols-2 grid-rows-3 gap-2 xl:grid-cols-3 xl:grid-rows-2">
          {data.EditorsChoiceImgs.data.map((img) => (
            <div key={img.id} className="relative h-[130px] w-[100%]">
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
      <div className="mt-6 bg-white md:ml-6 md:mt-0 xl:w-[552px]">
        <div className="relative">
          <video
            width={552}
            height={322}
            className="max-md:w-full"
            src={data.EditorsChoiceVideo.data.attributes.url}
            controls
          />
          <div className="absolute left-0 top-0 rounded-br-md bg-[#F24949] px-2.5 py-1">
            <Typography variant="body2" className="text-shite font-semibold">
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
