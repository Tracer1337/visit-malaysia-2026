import Link from 'next/link';
import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography';
import { LandingPageFooter } from '@/_lib/strapi/landing-page';

export function Footer({ data }: { data: LandingPageFooter }) {
  return (
    <footer className="bg-black py-[60px]">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row">
          <div className="xl:mr-[100px] max-xl:flex max-xl:justify-center max-xl:flex-wrap max-xl:mb-6">
            <Placeholder width={153} height={51} />

            <div className="flex gap-3 mt-8">
              <Placeholder width={181} height={54} />
              <Placeholder width={181} height={54} />
            </div>
          </div>
          <div className="max-xl:mt-6 xl:w-[176px] xl:mr-8">
            <Typography variant="h4" className="text-[#EDE9FE] mb-6">
              Mobile App
            </Typography>
            <ul className="text-[16px] leading-[24px] text-[#E5E7EB] [&>li]:mb-3 [&>li:last-child]:mb-0">
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
          <div className="max-xl:mt-6 xl:w-[176px] xl:mr-8">
            <Typography variant="h4" className="text-[#EDE9FE] mb-6">
              Community
            </Typography>
            <ul className="text-[16px] leading-[24px] text-[#E5E7EB] [&>li]:mb-3 [&>li:last-child]:mb-0">
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
          <div className="max-xl:mt-6 xl:w-[176px] xl:mr-8">
            <Typography variant="h4" className="text-[#EDE9FE] mb-6">
              Company
            </Typography>
            <ul className="text-[16px] leading-[24px] text-[#E5E7EB] [&>li]:mb-3 [&>li:last-child]:mb-0">
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
        <hr className="mt-8" />
        <Typography
          variant="body3"
          className="text-[#D1D5DB] text-center mt-4"
          element="p"
        >
          {data.CopyrightSubtitle}
        </Typography>
      </div>
    </footer>
  );
}
