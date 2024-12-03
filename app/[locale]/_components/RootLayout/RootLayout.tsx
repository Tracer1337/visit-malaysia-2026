import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { DM_Sans, Inter } from 'next/font/google';
import React from 'react';
import { TouristInformationCenter, WithContext } from 'schema-dts';
import { Locale } from '@/../config';
import { AuthPlaceholderProvider } from '@/_lib/auth/context';
import { GoogleMapsBootstrapScript } from '@/_lib/google/maps';
import { fetchLandingPage } from '@/_lib/strapi/landing-page';
import { cn } from '@/_lib/styling';
import Footer from '../Footer';
import Navigation from '../Navigation';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm_sans',
});

export async function RootLayout({
  children,
  modal,
  locale,
}: React.PropsWithChildren<{
  locale: Locale;
  modal: React.ReactNode;
}>) {
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
      <body
        className={cn(
          'flex min-h-screen flex-col antialiased overflow-x-hidden',
          inter.className,
          dm_sans.className,
        )}
      >
        <AuthPlaceholderProvider>
          <Navigation data={landingPageData.data.attributes.Header} />
          <div className="grow mt-[83px]">{children}</div>
          <Footer data={landingPageData.data.attributes.Footer} />
          {/* Remove Before Submitting Project */}
          <SpeedInsights />
          {/* Remove Before Submitting Project */}
          <Analytics />
          {modal}
        </AuthPlaceholderProvider>
      </body>
    </html>
  );
}
