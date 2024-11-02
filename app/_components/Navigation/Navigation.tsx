import Link from 'next/link';
import Button from '@/_components/ui/Button';
import Placeholder from '../ui/Placeholder';
import { LandingPageHeader } from '@/_lib/strapi/landing-page';

export function Navigation({ data }: { data: LandingPageHeader }) {
  const links: {
    title: string;
    href: string;
  }[] = [
    {
      title: data.HomeButton,
      href: '/',
    },
    {
      title: data.StorefrontButton,
      href: '/',
    },
    {
      title: data.TravelIdeaButton,
      href: '/',
    },
    {
      title: data.BecomeCreatorButton,
      href: '/',
    },
    {
      title: data.ContactUsButton,
      href: '/',
    },
  ];

  return (
    <nav className="flex justify-between items-center xl:items-start">
      <div className="flex">
        <Placeholder width={153} height={51} className="mr-9" />
        <div className="hidden xl:flex items-center">
          {links.map((link, i) => (
            <Link
              href={link.href}
              key={i}
              className="mr-6 last:mr-0 text-white"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Placeholder width={32} height={32} className="xl:hidden" />
        <div className="hidden xl:block">
          <Link href="/" className="mr-3">
            <Button variant="secondary">{data.SignInButton}</Button>
          </Link>
          <Link href="/">
            <Button>{data.SignUpButton}</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
