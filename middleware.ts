import createMiddleware from 'next-intl/middleware';
import { routing } from '@/_lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en)/:path*'],
};
