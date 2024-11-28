import Image from 'next/image';
import Button from '@/_components/ui/Button';
import LanguageSelect from '@/_components/ui/LanguageSelect';
import { Link } from '@/_lib/i18n/routing';
import { LandingPageHeader } from '@/_lib/strapi/landing-page';
import BurgerMenuIcon from '@/_lib/svg/BurgerMenuIcon';
import NavigationVariants from './components/NavigationVariants';

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
    <NavigationVariants>
      <nav className="relative z-10 flex items-center justify-between xl:items-start">
        <div className="flex">
          <Image
            src="/img/logo.png"
            alt="Visit Malaysia 2026"
            width={153}
            height={51}
            className="mr-9 group-[.variant-light]:xl:hidden"
          />
          <Image
            src="/img/logo-white.png"
            alt="Visit Malaysia 2026"
            width={153}
            height={51}
            className="mr-9 group-[.variant-light]:max-xl:hidden group-[.variant-default]:hidden"
          />
          <div className="hidden items-center xl:flex">
            {links.map((link, i) => (
              <Link
                href={link.href}
                key={i}
                className="mr-6 last:mr-0 group-[.variant-default]:text-[#0A0A0ABF] group-[.variant-default]:opacity-75 group-[.variant-light]:text-white"
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
            <Link href="/login" className="mr-3">
              <Button variant="secondary">{data.SignInButton}</Button>
            </Link>
            <Link href="/register">
              <Button>{data.SignUpButton}</Button>
            </Link>
          </div>
        </div>
      </nav>
    </NavigationVariants>
  );
}
