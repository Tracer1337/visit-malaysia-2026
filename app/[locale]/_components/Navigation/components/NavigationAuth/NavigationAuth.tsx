'use client';

import Button from '@/_components/Button';
import { useAuthPlaceholder } from '@/_lib/auth/context';
import { Link } from '@/_lib/i18n/routing';
import { LandingPageHeader } from '@/_lib/strapi/landing-page';
import NavigationAuthUserMenu from './components/NavigationAuthUserMenu';

export function NavigationAuth({ data }: { data: LandingPageHeader }) {
  const authPlaceholder = useAuthPlaceholder();

  if (authPlaceholder.user) {
    return <NavigationAuthUserMenu />;
  }

  return (
    <div className="max-xl:hidden">
      <Link href="/login" className="mr-3">
        <Button variant="secondary">{data.SignInButton}</Button>
      </Link>
      <Link href="/register">
        <Button>{data.SignUpButton}</Button>
      </Link>
    </div>
  );
}
