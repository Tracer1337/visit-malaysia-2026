import Link from 'next/link';
import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography';

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

export function AIGuide() {
  return (
    <div className="flex flex-col items-center">
      <Placeholder width={65} height={65} />
      <Typography variant="h2" className="text-[#0A1B74] text-center mt-3">
        Discover Malaysia&apos;s Wonders
        <br />
        With Our AI Guide
      </Typography>
      <div className="my-7 h-[59px] bg-gray-700 w-full"></div>
      <Typography variant="body1" className="font-semibold mb-6">
        Most people ask for travel plan
      </Typography>
      <div className="flex justify-center flex-wrap gap-4">
        {links.map((link, i) => (
          <Link
            href={link.href}
            key={i}
            className="bg-[#F5F5F5] px-4 py-3 rounded-xl"
          >
            <Typography
              variant="body2"
              className="font-semibold text-[#A1A1A1]"
            >
              {link.title}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
}
