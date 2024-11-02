'use client';

import Carousel from '@/_components/ui/Carousel';
import { tailwindConfig } from '@/_lib/tailwind';
import React, { PropsWithChildren, useRef } from 'react';
import { useUpdateHeroSection } from './hooks/useUpdateHeroSection';

export function HeroSectionCarousel({ children }: PropsWithChildren) {
  const carouselRef = useRef<Carousel>(null);
  const updateHeroSection = useUpdateHeroSection({ carouselRef });

  const carouselMobileClasses =
    '[&_.slick-slide]:pr-[16px] w-[calc(145px*3+16px*3)]';

  const carouselItemMobileClasses = 'max-w-[145px] h-[264px]';

  const carouselDesktopClasses =
    'xl:[&_.slick-slide]:pr-[40px] xl:w-[calc(316px*2+40px*2)]';

  const carouselItemDesktopClasses = 'xl:max-w-[316px] xl:h-[573px]';

  return (
    <div
      className={`xl:ml-[112px] mt-9 xl:mt-0 ${carouselMobileClasses} ${carouselDesktopClasses}`}
    >
      <Carousel
        ref={carouselRef}
        arrows={false}
        slidesToShow={2}
        responsive={[
          {
            breakpoint: parseInt(tailwindConfig.theme.screens.xl),
            settings: {
              slidesToShow: 3,
            },
          },
        ]}
      >
        {React.Children.map(children, (child, i) => (
          <div
            className={`rounded-2xl relative ${carouselItemMobileClasses} ${carouselItemDesktopClasses} overflow-hidden cursor-pointer`}
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
