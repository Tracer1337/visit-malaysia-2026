import { LandingPageActivityGroup } from '@/_lib/strapi/landing-page';
import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography';

export function ActivityShowcase({ data }: { data: LandingPageActivityGroup }) {
  return (
    <div className="md:grid md:grid-cols-2 md:grid-rows-1 md:items-center">
      <div className="container md:p-0 md:max-w-[600px] justify-self-end">
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
          className="md:opacity-75 md:mt-3"
          element="p"
        >
          {data.ActivityNameDesc}
        </Typography>
        <div className="flex items-center mt-3">
          <Placeholder width={24} height={24} className="mr-2" />
          <Typography variant="body1">{data.InterestenButton}</Typography>
        </div>
        <div className="flex items-center mt-3">
          <Placeholder width={24} height={24} className="mr-2" />
          <Typography variant="body1">{data.ShowOtherButton}</Typography>
        </div>
      </div>
      <Placeholder
        width={469}
        height={373}
        className="max-md:w-full mt-6 md:mt-0 md:ml-4 xl:ml-14"
      />
    </div>
  );
}
