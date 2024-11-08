import Image from 'next/image';
import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography';
import DottedMenuIcon from '@/_lib/svg/DottedMenuIcon';
import RatingStarIcon from '@/_lib/svg/RatingStarIcon';

export function LocationCard({
  data,
}: {
  data?: {
    title: string;
    description: string;
    coverImg: string | null;
  };
}) {
  data ??= {
    title: 'Trail visit for the mysterious Prince of Peace',
    description:
      'Witness the sacred monkey guardians keep the world’s biggest cave temple alive and make your wishes come true.',
    coverImg: null,
  };

  return (
    <div className="max-w-[278px] shadow-sm shadow-[#A6AFC366]">
      <div className="relative">
        {data.coverImg ? (
          <Image src={data.coverImg} alt="" width={278} height={292} />
        ) : (
          <Placeholder width={278} height={292} />
        )}
        <div className="absolute top-0 left-0 px-2.5 py-1 bg-[#F24949] rounded-br-md">
          <Typography variant="body2" className="font-semibold text-white">
            Editor Selected
          </Typography>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <div className="px-2.5 py-[3px] bg-[#2A3075] rounded-[4px]">
            <Typography variant="body3" className="text-white">
              Hannisa Travelers
            </Typography>
          </div>
          <DottedMenuIcon className="w-6 h-6" />
        </div>
        <div className="mt-3">
          <Typography variant="body1" className="font-semibold text-[#0B0B0B]">
            {data.title}
          </Typography>
          <Typography
            variant="body4"
            className="text-[#637381] line-clamp-2 mt-2"
            element="p"
          >
            {data.description}
          </Typography>
        </div>
        <div className="flex justify-between mt-3 items-center">
          <Typography variant="body3" className="opacity-70">
            4.5/5 Ratings
          </Typography>
          <div className="flex gap-1.5">
            <RatingStarIcon fill="#FF8F15" />
            <RatingStarIcon fill="#FF8F15" />
            <RatingStarIcon fill="#FF8F15" />
            <RatingStarIcon fill="#FF8F15" />
            <RatingStarIcon fill="#FF8F15" />
          </div>
        </div>
      </div>
    </div>
  );
}
