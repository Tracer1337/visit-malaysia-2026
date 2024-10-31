import Link from 'next/link';
import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography';

export function Footer() {
  return (
    <footer className="bg-black py-[60px]">
      <div className="container mx-auto">
        <div className="flex">
          <div className="mr-[100px]">
            <Placeholder width={153} height={51} />
            <div className="flex gap-3 mt-8">
              <Placeholder width={181} height={54} />
              <Placeholder width={181} height={54} />
            </div>
          </div>
          <div className="w-[176px] mr-8">
            <h6 className="font-bold text-[24px] leading-[32px] text-[#EDE9FE] mb-6">
              Mobile App
            </h6>
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
          <div className="w-[176px] mr-8">
            <h6 className="font-bold text-[24px] leading-[32px] text-[#EDE9FE] mb-6">
              Community
            </h6>
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
          <div className="w-[176px] mr-8">
            <h6 className="font-bold text-[24px] leading-[32px] text-[#EDE9FE] mb-6">
              Company
            </h6>
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
          © 2024 EpicHolidays. All rights reserved
        </Typography>
      </div>
    </footer>
  );
}
