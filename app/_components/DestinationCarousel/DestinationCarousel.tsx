import Link from 'next/link';
import DestinationCard from '../DestinationCard';
import Typography from '../ui/Typography';

const destinations = new Array(3).fill(0);

export function DestinationCarousel({
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
        {destinations.map((_, i) => (
          <DestinationCard key={i} />
        ))}
      </div>
    </>
  );
}
