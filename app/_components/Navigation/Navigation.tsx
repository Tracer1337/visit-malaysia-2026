import Link from 'next/link';
import Button from '@/_components/Button';

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

export default function Navigation() {
  return (
    <nav className="flex justify-between">
      <div className="flex">
        <div className="w-[153px] h-[51px] bg-gray-700 mr-9"></div>
        <div className="flex items-center">
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
        <Link href="/" className="mr-3">
          <Button variant="secondary">Sign in</Button>
        </Link>
        <Link href="/">
          <Button>Sign Up Today!</Button>
        </Link>
      </div>
    </nav>
  );
}
