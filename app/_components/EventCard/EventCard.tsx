import { LandingPageEvent } from '@/_lib/strapi/landing-page';
import LocationIcon from '@/_lib/svg/LocationIcon';
import StrapiImage from '../ui/StrapiImage';
import Typography from '../ui/Typography';

export function EventCard({ data }: { data: LandingPageEvent }) {
  return (
    <div className="max-w-[336px] rounded-xl bg-white p-4 shadow-lg">
      <div className="grid grid-cols-[116px_minmax(0,_1fr)] grid-rows-1">
        <div className="relative h-[116px] w-[116px]">
          <StrapiImage
            data={data.UserImg.data}
            fill
            sizes="116px"
            className="object-cover"
          />
        </div>
        <div className="pl-6">
          <div className="flex items-center">
            <LocationIcon fill="#F24949" className="mr-1" />
            <Typography
              variant="body2"
              className="line-clamp-1 font-semibold opacity-75"
            >
              {data.StateName}
            </Typography>
          </div>
          <Typography variant="body3" className="mt-1 opacity-75" element="p">
            {data.EventDate}
          </Typography>
          <Typography
            variant="body1"
            className="mt-1 line-clamp-1 font-semibold"
            element="p"
          >
            {data.EventTitle}
          </Typography>
          <Typography
            variant="body2"
            className="line-clamp-2 opacity-75"
            element="p"
          >
            {data.EventTitle2}
          </Typography>
        </div>
      </div>
      <Typography
        variant="body3"
        className="mt-3 line-clamp-2 opacity-75"
        element="p"
      >
        {data.EventDesc}
      </Typography>
    </div>
  );
}
