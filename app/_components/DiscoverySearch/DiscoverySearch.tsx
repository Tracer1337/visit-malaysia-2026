import { Link } from '@/_lib/i18n/routing';
import { LandingPageSearchGroup } from '@/_lib/strapi/landing-page';
import AiStarsIcon from '@/_lib/svg/AiStarsIcon';
import Typography from '../ui/Typography';
import DiscoverySearchForm from './components/DiscoverySearchForm';

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
      <AiStarsIcon fill="#0A1B74" className="h-10 w-10 xl:h-16 xl:w-16" />
      <Typography variant="h2" className="mt-3 text-center text-[#0A1B74]">
        {data.TitleDiscover}
      </Typography>
      <DiscoverySearchForm />
      <Typography variant="body1" className="mb-6 font-semibold">
        {data.SubtitleMostPeople}
      </Typography>
      <div className="flex flex-wrap justify-center gap-4">
        {links.map((link, i) => (
          <Link
            href={link.href}
            key={i}
            className="rounded-xl bg-[#F5F5F5] px-4 py-3"
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
