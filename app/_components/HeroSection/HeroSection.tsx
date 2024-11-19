import React from 'react';
import Typography from '../ui/Typography';
import HeroSectionCarousel from './components/HeroSectionCarousel';
import { LandingPageCarouselItem } from '@/_lib/strapi/landing-page';
import StrapiImage from '../ui/StrapiImage';
import Image from 'next/image';
import { tailwindConfig } from '@/_lib/tailwind';

export type HeroSectionItem = {
  index: number;
  item: LandingPageCarouselItem;
};

export async function HeroSection({
  data,
}: {
  data: {
    title: string;
    items: LandingPageCarouselItem[];
  };
}) {
  return (
    <div className="relative mt-4 overflow-x-hidden xl:-mt-[67px] xl:h-[812px]">
      <Image
        src="/img/hero-background.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none -z-10 object-cover object-center"
        priority
      />
      <div className="container relative pb-[85px] pt-[60px] xl:mx-auto xl:grid xl:grid-cols-[minmax(0,_1.1fr),_minmax(0,_0.9fr)] xl:grid-rows-1 xl:pb-0 xl:pt-[155px]">
        <div className="xl:mt-[75px]">
          <div className="w-fit rounded-lg bg-[#2A3075] px-4 py-1.5">
            <Typography
              variant="h2"
              className="text-white"
              id="hero-section-index"
            >
              {data.items[0].ImgNum}
            </Typography>
          </div>
          <Typography variant="h1" className="mt-4 line-clamp-4 text-white">
            {data.title}
          </Typography>
        </div>
        <HeroSectionCarousel>
          {data.items.map((item, i) => (
            <React.Fragment key={i}>
              <div
                className="data-container"
                data-item={JSON.stringify({
                  index: i,
                  item,
                } as HeroSectionItem)}
              />
              <StrapiImage
                data={item.ImgState.data}
                alt=""
                fill
                sizes={`(max-width: ${tailwindConfig.theme.screens.xl}) 145px, 316px`}
                className="absolute inset-0 object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-between px-2 py-2.5 xl:px-5 xl:py-6">
                <div className="w-fit rounded-lg bg-[#2A3075] px-2 py-[2px] xl:px-4 xl:py-1.5">
                  <Typography
                    variant="body1"
                    className="font-semibold text-white"
                  >
                    {item.ImgNum}
                  </Typography>
                </div>
                <Typography variant="h4" className="line-clamp-3 text-white">
                  {item.ImgDesc}
                </Typography>
              </div>
            </React.Fragment>
          ))}
        </HeroSectionCarousel>
      </div>
    </div>
  );
}
