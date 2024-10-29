import Link from 'next/link';
import Placeholder from '../ui/Placeholder';

const links: {
  title: string;
  href: string;
}[] = [
  {
    title: '🏨 what’s destination popular in penang whether have good hotel?',
    href: '/',
  },
  {
    title: '🏨 Create me travel plan 2days',
    href: '/',
  },
  {
    title: '✈️ Ticket flight from Malaysia to Singapore today',
    href: '/',
  },
];

export default function AIGuide() {
  return (
    <div className="flex flex-col items-center">
      <Placeholder width={65} height={65} />
      <h2 className="font-heading font-bold text-[38px] text-[#0A1B74] text-center">
        Discover Malaysia&apos;s Wonders
        <br />
        With Our AI Guide
      </h2>
      <div className="my-7 h-[59px] bg-gray-700 w-full"></div>
      <span className="font-semibold text-lg mb-6">
        Most people ask for travel plan
      </span>
      <div className="flex justify-center flex-wrap gap-4">
        {links.map((link, i) => (
          <Link
            href={link.href}
            key={i}
            className="text-[#A1A1A1] bg-[#F5F5F5] px-4 py-3 rounded-xl"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
