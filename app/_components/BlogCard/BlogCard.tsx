import Image from 'next/image';
import Typography from '../ui/Typography';
import RatingStarIcon from '@/_lib/svg/RatingStarIcon';
import { BlogContent } from '@/_lib/halaltravel/blog';
import Placeholder from '../ui/Placeholder';
import BlogCardMenu from './components/BlogCardMenu';

export function BlogCard({ data }: { data: BlogContent }) {
  return (
    <div className="max-w-[278px] shadow-sm shadow-[#A6AFC366]">
      <div className="relative">
        {data.coverImage.startsWith('/') ? (
          <Placeholder width={278} height={292} />
        ) : (
          <div className="w-[278px] h-[292px] relative">
            <Image
              src={data.coverImage}
              alt=""
              fill
              sizes="278px"
              className="object-cover"
            />
          </div>
        )}
        <div className="absolute top-0 left-0 px-2.5 py-1 bg-[#F24949] rounded-br-md">
          <Typography variant="body2" className="font-semibold text-white">
            {data.type}
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
          <BlogCardMenu />
        </div>
        <div className="mt-3">
          <Typography
            variant="body1"
            className="font-semibold text-[#0B0B0B] line-clamp-2 min-h-[2lh]"
          >
            {data.title}
          </Typography>
          <Typography
            variant="body4"
            className="text-[#637381] line-clamp-2 mt-2 min-h-[2lh]"
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
