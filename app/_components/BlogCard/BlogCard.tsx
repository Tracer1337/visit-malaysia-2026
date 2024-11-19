import Image from 'next/image';
import Typography from '../ui/Typography';
import RatingStarIcon from '@/_lib/svg/RatingStarIcon';
import { BlogContent, resolveBlogCoverImageUrl } from '@/_lib/halaltravel/blog';
import BlogCardMenu from './components/BlogCardMenu';

export function BlogCard({ data }: { data: BlogContent }) {
  return (
    <div className="max-w-[278px] shadow-sm shadow-[#A6AFC366]">
      <div className="relative">
        <div className="relative h-[292px] w-[278px]">
          <Image
            src={resolveBlogCoverImageUrl(data)}
            alt=""
            fill
            sizes="278px"
            className="object-cover"
          />
        </div>
        <div className="absolute left-0 top-0 rounded-br-md bg-[#F24949] px-2.5 py-1">
          <Typography variant="body2" className="font-semibold text-white">
            {data.type}
          </Typography>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <div className="rounded-[4px] bg-[#2A3075] px-2.5 py-[3px]">
            <Typography variant="body3" className="text-white">
              {data.username}
            </Typography>
          </div>
          <BlogCardMenu />
        </div>
        <div className="mt-3">
          <div className="flex gap-1.5 opacity-70">
            <Typography variant="body3">{data.savedCount} Saves</Typography>
            <Typography variant="body3">•</Typography>
            <Typography variant="body3" className="line-clamp-1 max-w-[150px]">
              {data.interests.join(', ')}
            </Typography>
          </div>
          <Typography
            variant="body1"
            className="mt-2 line-clamp-2 min-h-[2lh] font-semibold text-[#0B0B0B]"
          >
            {data.title}
          </Typography>
          <Typography
            variant="body4"
            className="mt-2 line-clamp-2 min-h-[2lh] text-[#637381]"
            element="p"
          >
            {data.description}
          </Typography>
        </div>
        <div className="mt-3 flex items-center justify-between">
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
