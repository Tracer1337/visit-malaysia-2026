import Link from 'next/link';
import LocationCard from '../LocationCard';
import Typography from '../ui/Typography';

const locations = new Array(3).fill(0);

export function LocationCarousel({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <div className="flex justify-between">
        <Typography variant="h3">{title}</Typography>
        <Link
          href="/"
          className="text-heading font-semibold text-xl leading-[24px] text-[#2A3075]"
        >
          See More
        </Link>
      </div>
      <Typography variant="h5" className="opacity-70 mt-2">
        {subtitle}
      </Typography>
      <div className="mt-6 flex gap-6">
        {locations.map((_, i) => (
          <LocationCard key={i} />
        ))}
      </div>
    </>
  );
}
