import Link from 'next/link';
import Button from '@/_components/ui/Button';
import Placeholder from '../ui/Placeholder';

const links: {
  title: string;
  href: string;
}[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Storefront',
    href: '/',
  },
  {
    title: 'Travel Ideas',
    href: '/',
  },
  {
    title: 'Become a Creator',
    href: '/',
  },
  {
    title: 'Contact Us',
    href: '/',
  },
];

export function Navigation() {
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
            <Button variant="secondary">Sign in</Button>
          </Link>
          <Link href="/">
            <Button>Sign Up Today!</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
