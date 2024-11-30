import StrapiImage from '@/_components/StrapiImage';
import Typography from '@/_components/Typography';
import { LandingPageActivityGroup } from '@/_lib/strapi/landing-page';
import ChevronRightIcon from '@/_lib/svg/ChevronRightIcon';

export function ActivityShowcase({ data }: { data: LandingPageActivityGroup }) {
  return (
    <div className="md:grid md:grid-cols-2 md:grid-rows-1 md:items-center">
      <div className="container justify-self-end md:p-0 lg:pl-[100px]">
        <Typography
          variant="body1"
          className="font-semibold text-[#0A1B74]"
          element="p"
        >
          {data.ActivitiesTitle}
        </Typography>
        <Typography variant="h2" className="md:mt-3">
          {data.ActivityNameTitle}
        </Typography>
        <Typography
          variant="body2"
          className="md:mt-3 md:opacity-75"
          element="p"
        >
          {data.ActivityNameDesc}
        </Typography>
        <div className="mt-3 flex items-center">
          <ChevronRightIcon className="mr-2" />
          <Typography variant="body1">{data.InterestenButton}</Typography>
        </div>
        <div className="mt-3 flex items-center">
          <ChevronRightIcon className="mr-2" />
          <Typography variant="body1">{data.ShowOtherButton}</Typography>
        </div>
      </div>
      <StrapiImage
        data={data.ActivityImg.data}
        width={469}
        height={373}
        className="mt-6 max-md:w-full md:ml-4 md:mt-0 xl:ml-14"
      />
    </div>
  );
}
