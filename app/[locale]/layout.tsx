import type { Metadata } from 'next';
import '../globals.css';
import { Inter, DM_Sans } from 'next/font/google';
import Navigation from '../_components/Navigation';
import Footer from '../_components/Footer';
import { i18n, Locale } from '../../i18n-config';
import { fetchLandingPage } from '@/_lib/strapi/landing-page';
import { GoogleMapsBootstrapScript } from '@/_lib/google/maps';
import { TouristInformationCenter, WithContext } from 'schema-dts';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm_sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.visitmalaysia2026.com'),
  title: 'Visit Malaysia 2026 | Home',
  description:
    'Discover Malaysia in 2026! Explore the rich culture, breathtaking landscapes, and vibrant cities of this Southeast Asian gem. Plan your perfect adventure with Visit Malaysia 2026 – your gateway to unforgettable experiences in Malaysia’s tropical paradise.',
};

export default async function RootLayout({
  children,
  hero,
  params,
}: {
  children: React.ReactNode;
  hero: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}) {
  const { locale } = await params;

  const landingPageData = await fetchLandingPage({ locale });

  const jsonLd: WithContext<TouristInformationCenter> = {
    '@context': 'https://schema.org',
    '@type': 'TouristInformationCenter',
    'name': 'Visit Malaysia 2026',
    'url': 'https://www.visitmalaysia2026.com',
    'logo': 'https://www.visitmalaysia2026.com/logo.png',
    'description':
      'Discover Malaysia in 2026! Explore the rich culture, breathtaking landscapes, and vibrant cities of this Southeast Asian gem.',
    'image':
      'https://www.visitmalaysia2026.com/images/malaysia-destination.jpg',
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'MY',
    },
    'sameAs': [
      'https://www.facebook.com/VisitMalaysia2026',
      'https://www.instagram.com/VisitMalaysia2026',
      'https://twitter.com/VisitMY2026',
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+60-123-456-789',
      'contactType': 'Customer Service',
      'areaServed': 'MY',
      'availableLanguage': ['English', 'Malay'],
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Malaysia 2026 Travel Packages',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'TouristTrip',
            'name': 'Cultural Heritage Tour',
            'description':
              'Explore Malaysia’s diverse heritage sites and cultural landmarks.',
            'offers': {
              '@type': 'Offer',
              'price': '500.00',
              'priceCurrency': 'USD',
            },
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'TouristTrip',
            'name': 'Adventure & Nature Experience',
            'description':
              "Immerse yourself in Malaysia's natural wonders, including rainforests and beaches.",
            'offers': {
              '@type': 'Offer',
              'price': '750.00',
              'priceCurrency': 'USD',
            },
          },
        },
      ],
    },
  };

  return (
    <html lang={locale}>
      <head>
        <GoogleMapsBootstrapScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${dm_sans.variable} antialiased`}>
        <div className="container mx-auto pt-4">
          <Navigation data={landingPageData.data.attributes.Header} />
        </div>
        {hero}
        {children}
        <Footer data={landingPageData.data.attributes.Footer} />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale: locale.code }));
}
