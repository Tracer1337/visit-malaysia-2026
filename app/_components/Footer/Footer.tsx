import Link from 'next/link';
import Typography from '../ui/Typography';
import { LandingPageFooter } from '@/_lib/strapi/landing-page';
import Image from 'next/image';

export function Footer({ data }: { data: LandingPageFooter }) {
  return (
    <footer className="bg-black py-[60px]">
      <div className="container mx-auto">
        <div className="flex flex-col sm:items-center lg:flex-row lg:items-start">
          <div className="max-lg:mb-6 max-lg:flex max-lg:flex-col max-lg:items-center lg:mr-[100px]">
            <Image
              src="/img/logo-white.png"
              alt="Visit Malaysia 2026"
              width={153}
              height={51}
            />
            <div className="mt-8 flex gap-3">
              <Image
                src="/img/download-google-play.png"
                alt="Download Google Play"
                width={181}
                height={54}
              />
              <Image
                src="/img/download-app-store.png"
                alt="Download App Store"
                width={181}
                height={54}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="max-lg:mt-6 sm:mr-8 sm:w-[176px]">
              <Typography variant="h4" className="mb-6 text-[#EDE9FE]">
                Mobile App
              </Typography>
              <ul className="text-[16px] leading-[24px] text-[#E5E7EB] [&>li:last-child]:mb-0 [&>li]:mb-3">
                <li>
                  <Link href="/">Features</Link>
                </li>
                <li>
                  <Link href="/">Live Share</Link>
                </li>
                <li>
                  <Link href="/">Video Record</Link>
                </li>
              </ul>
            </div>
            <div className="max-lg:mt-6 sm:mr-8 sm:w-[176px]">
              <Typography variant="h4" className="mb-6 text-[#EDE9FE]">
                Community
              </Typography>
              <ul className="text-[16px] leading-[24px] text-[#E5E7EB] [&>li:last-child]:mb-0 [&>li]:mb-3">
                <li>
                  <Link href="/">Featured Experience</Link>
                </li>
                <li>
                  <Link href="/">Share With Friends</Link>
                </li>
                <li>
                  <Link href="/">Live Feeds</Link>
                </li>
              </ul>
            </div>
            <div className="max-lg:mt-6 sm:mr-8 sm:w-[176px]">
              <Typography variant="h4" className="mb-6 text-[#EDE9FE]">
                Company
              </Typography>
              <ul className="text-[16px] leading-[24px] text-[#E5E7EB] [&>li:last-child]:mb-0 [&>li]:mb-3">
                <li>
                  <Link href="/">About us</Link>
                </li>
                <li>
                  <Link href="/">Contact us</Link>
                </li>
                <li>
                  <Link href="/">History</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="mt-8" />
        <Typography
          variant="body3"
          className="mt-4 text-center text-[#D1D5DB]"
          element="p"
        >
          {data.CopyrightSubtitle}
        </Typography>
      </div>
    </footer>
  );
}
