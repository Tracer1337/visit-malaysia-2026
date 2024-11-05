import { LandingPageEvent } from '@/_lib/strapi/landing-page';
import Typography from '../ui/Typography';
import LocationIcon from '@/_lib/svg/LocationIcon';
import StrapiImage from '../ui/StrapiImage';

export function EventCard({ data }: { data: LandingPageEvent }) {
  return (
    <div className="shadow-lg p-4 max-w-[336px] bg-white rounded-xl">
      <div className="grid grid-cols-[116px_minmax(0,_1fr)] grid-rows-1">
        <div className="w-[116px] h-[116px] relative">
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
              className="font-semibold opacity-75 line-clamp-1"
            >
              {data.StateName}
            </Typography>
          </div>
          <Typography variant="body3" className="opacity-75 mt-1" element="p">
            {data.EventDate}
          </Typography>
          <Typography
            variant="body1"
            className="font-semibold mt-1 line-clamp-1"
            element="p"
          >
            {data.EventTitle}
          </Typography>
          <Typography
            variant="body2"
            className="opacity-75 line-clamp-2"
            element="p"
          >
            {data.EventTitle2}
          </Typography>
        </div>
      </div>
      <Typography
        variant="body3"
        className="mt-3 opacity-75 line-clamp-2"
        element="p"
      >
        {data.EventDesc}
      </Typography>
    </div>
  );
}
