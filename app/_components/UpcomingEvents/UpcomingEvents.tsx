import Link from 'next/link';
import EventCard from '../EventCard';

const events = new Array(3).fill(0);

export default function UpcomingEvents() {
  return (
    <>
      <div className="flex justify-between">
        <h3 className="font-heading font-bold text-3xl">Upcoming Events</h3>
        <Link
          href="/"
          className="text-heading font-semibold text-xl leading-[24px] text-[#2A3075]"
        >
          See More
        </Link>
      </div>
      <h5 className="font-heading text-xl opacity-70">
        Let’s join our activity from creator calendar 2024 - 2025
      </h5>
      <div className="mt-6 flex gap-6">
        {events.map((_, i) => (
          <EventCard key={i} />
        ))}
      </div>
    </>
  );
}
