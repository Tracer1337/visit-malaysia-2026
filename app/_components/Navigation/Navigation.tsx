import Image from 'next/image';
import Button from '@/_components/ui/Button';
import { Link } from '@/_lib/i18n/routing';
import { LandingPageHeader } from '@/_lib/strapi/landing-page';
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
    <nav className="relative z-10 flex items-center justify-between xl:items-start">
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
        <div className="hidden items-center xl:flex">
          {links.map((link, i) => (
            <Link
              href={link.href}
              key={i}
              className="mr-6 text-white last:mr-0"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <BurgerMenuIcon className="bg-gray-400 xl:hidden" />
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
