import Link from 'next/link';
import DestinationCard from '../DestinationCard';

const destinations = new Array(3).fill(0);

export default function TravelRecommendations({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <div className="flex justify-between">
        <h3 className="font-heading font-bold text-3xl">{title}</h3>
        <Link
          href="/"
          className="text-heading font-semibold text-xl leading-[24px] text-[#2A3075]"
        >
          See More
        </Link>
      </div>
      <h5 className="font-heading text-xl opacity-70">{subtitle}</h5>
      <div className="mt-6 flex gap-6">
        {destinations.map((_, i) => (
          <DestinationCard key={i} />
        ))}
      </div>
    </>
  );
}
