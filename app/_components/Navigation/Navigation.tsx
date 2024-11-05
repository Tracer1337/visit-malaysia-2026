import Link from 'next/link';
import Button from '@/_components/ui/Button';
import { LandingPageHeader } from '@/_lib/strapi/landing-page';
import Image from 'next/image';
import BurgerMenuIcon from '@/_lib/svg/BurgerMenuIcon';
import LanguageSelect from '../LanguageSelect';

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
    <nav className="flex justify-between items-center xl:items-start relative z-10">
      <div className="flex">
        <Image
          src="/img/logo.png"
          alt="Visit Malaysia 2026a"
          width={153}
          height={51}
          className="mr-9 xl:hidden"
        />
        <Image
          src="/img/logo-white.png"
          alt="Visit Malaysia 2026a"
          width={153}
          height={51}
          className="mr-9 max-xl:hidden"
        />
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
        <BurgerMenuIcon className="xl:hidden bg-gray-400" />
        <div className="max-xl:hidden">
          <span className="mr-3">
            <LanguageSelect />
          </span>
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
