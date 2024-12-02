import Image from 'next/image';
import Button from '@/_components/Button';
import { Link } from '@/_lib/i18n/routing';
import { LandingPageHeader } from '@/_lib/strapi/landing-page';
import BurgerMenuIcon from '@/_lib/svg/BurgerMenuIcon';
import LocaleSelect from './components/LocaleSelect';
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
      <div className="fixed z-10 top-0 left-0 right-0 group-[.variant-default]:bg-white transition-colors">
        <nav className="flex items-center justify-between xl:items-start container mx-auto py-4">
          <div className="flex">
            <Image
              src="/img/logo.png"
              alt="Visit Malaysia 2026"
              width={153}
              height={51}
              className="mr-9 group-[.variant-light]:hidden"
            />
            <Image
              src="/img/logo-white.png"
              alt="Visit Malaysia 2026"
              width={153}
              height={51}
              className="mr-9 group-[.variant-default]:hidden"
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
            <div className="max-xl:hidden flex">
              <div className="mr-3">
                <LocaleSelect />
              </div>
              <Link href="/login" className="mr-3">
                <Button variant="secondary">{data.SignInButton}</Button>
              </Link>
              <Link href="/register">
                <Button>{data.SignUpButton}</Button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </NavigationVariants>
  );
}
