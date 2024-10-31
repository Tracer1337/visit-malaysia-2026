import Link from 'next/link';
import LocationCard from '../LocationCard';
import Typography from '../ui/Typography';

export function LocationCarousel({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h3">{title}</Typography>
        <Link
          href="/"
          className="text-heading font-semibold text-xl leading-[24px] text-[#2A3075] text-nowrap"
        >
          See More
        </Link>
      </div>
      <Typography variant="h5" className="opacity-70 mt-1 xl:mt-2">
        {subtitle}
      </Typography>
      <div className="mt-4 xl:mt-6 flex gap-6">
        <LocationCard />
      </div>
    </div>
  );
}
