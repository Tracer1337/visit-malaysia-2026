import Link from 'next/link';
import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography';
import { LandingPageSearchGroup } from '@/_lib/strapi/landing-page';
import InputAutocomplete from './components/InputAutocomplete';

export function DiscoverySearch({ data }: { data: LandingPageSearchGroup }) {
  const links: {
    title: string;
    href: string;
  }[] = [
    {
      title: data.Suggestion1,
      href: '/',
    },
    {
      title: data.Suggestion2,
      href: '/',
    },
    {
      title: data.Suggestion3,
      href: '/',
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <Placeholder
        width={65}
        height={65}
        className="w-10 h-10 xl:w-16 xl:h-16"
      />
      <Typography variant="h2" className="text-[#0A1B74] text-center mt-3">
        {data.TitleDiscover}
      </Typography>
      <InputAutocomplete />
      <Typography variant="body1" className="font-semibold mb-6">
        {data.SubtitleMostPeople}
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
