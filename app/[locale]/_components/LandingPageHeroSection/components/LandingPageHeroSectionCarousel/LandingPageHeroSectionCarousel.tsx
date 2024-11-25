'use client';

import React, { PropsWithChildren, useRef } from 'react';
import Carousel from '@/_components/ui/Carousel';
import { tailwindConfig } from '@/_lib/tailwind';
import { useUpdateLandingPageHeroSection } from './hooks/useUpdateLandingPageHeroSection';

export function LandingPageHeroSectionCarousel({
  children,
}: PropsWithChildren) {
  const carouselRef = useRef<Carousel>(null);
  const updateHeroSection = useUpdateLandingPageHeroSection({ carouselRef });

  const carouselMobileClasses =
    '[&_.slick-slide]:pr-[16px] w-[calc(145px*3+16px*3)]';

  const carouselItemMobileClasses = 'max-w-[145px] h-[264px]';

  const carouselTabletClasses =
    'md:[&_.slick-slide]:pr-[16px] md:w-[calc(145px*5+16px*5)]';

  const carouselItemTabletClasses = 'md:max-w-[145px] md:h-[264px]';

  const carouselLaptopClasses =
    'lg:[&_.slick-slide]:pr-[16px] lg:w-[calc(145px*7+16px*7)]';

  const carouselItemLaptopClasses = 'lg:max-w-[145px] lg:h-[264px]';

  const carouselDesktopClasses =
    'xl:[&_.slick-slide]:pr-[40px] xl:w-[calc(316px*2+40px*2)]';

  const carouselItemDesktopClasses = 'xl:max-w-[316px] xl:h-[573px]';

  return (
    <div
      className={`mt-9 xl:ml-[112px] xl:mt-0 ${carouselMobileClasses} ${carouselTabletClasses} ${carouselLaptopClasses} ${carouselDesktopClasses}`}
    >
      <Carousel
        ref={carouselRef}
        arrows={false}
        slidesToShow={2}
        responsive={[
          {
            breakpoint: parseInt(tailwindConfig.theme.screens.xl),
            settings: {
              slidesToShow: 7,
            },
          },
          {
            breakpoint: parseInt(tailwindConfig.theme.screens.lg),
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: parseInt(tailwindConfig.theme.screens.md),
            settings: {
              slidesToShow: 3,
            },
          },
        ]}
      >
        {React.Children.map(children, (child, i) => (
          <div
            className={`relative cursor-pointer overflow-hidden rounded-2xl ${carouselItemMobileClasses} ${carouselItemTabletClasses} ${carouselItemLaptopClasses} ${carouselItemDesktopClasses}`}
            key={i}
            onClick={(event) =>
              updateHeroSection(
                event.currentTarget.querySelector('.data-container')!,
              )
            }
          >
            {child}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
