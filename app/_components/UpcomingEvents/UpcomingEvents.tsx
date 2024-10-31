import Link from 'next/link';
import EventCard from '../EventCard';
import Typography from '../ui/Typography/Typography';

const events = new Array(3).fill(0);

export default function UpcomingEvents() {
  return (
    <>
      <div className="flex justify-between">
        <Typography variant="h3">Upcoming Events</Typography>
        <Link
          href="/"
          className="text-heading font-semibold text-xl leading-[24px] text-[#2A3075]"
        >
          See More
        </Link>
      </div>
      <Typography variant="h5" className="opacity-70 mt-2">
        Let’s join our activity from creator calendar 2024 - 2025
      </Typography>
      <div className="mt-6 flex gap-6">
        {events.map((_, i) => (
          <EventCard key={i} />
        ))}
      </div>
    </>
  );
}
