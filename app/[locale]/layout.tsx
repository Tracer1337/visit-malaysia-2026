import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale, appConfig } from '@/../config';
import { handleInvalidLocale } from '@/_lib/i18n/routing';
import RootLayout from './_components/RootLayout';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.visitmalaysia2026.com'),
  title: 'Visit Malaysia 2026 | Home',
  description:
    'Discover Malaysia in 2026! Explore the rich culture, breathtaking landscapes, and vibrant cities of this Southeast Asian gem. Plan your perfect adventure with Visit Malaysia 2026 – your gateway to unforgettable experiences in Malaysia’s tropical paradise.',
};

export default async function LocaleLayout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}) {
  const { locale } = await params;

  handleInvalidLocale(locale);

  setRequestLocale(locale);

  return (
    <RootLayout locale={locale} modal={modal}>
      {children}
    </RootLayout>
  );
}

export async function generateStaticParams() {
  return appConfig.i18n.locales.map((locale) => ({ locale }));
}
