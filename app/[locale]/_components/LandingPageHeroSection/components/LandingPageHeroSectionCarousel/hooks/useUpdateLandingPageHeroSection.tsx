import { RefObject } from 'react';
import Carousel from '@/_components/ui/Carousel';
import { LandingPageHeroSectionItem } from '../../../LandingPageHeroSection';

export function useUpdateLandingPageHeroSection({
  carouselRef,
}: {
  carouselRef: RefObject<Carousel>;
}) {
  const updateHeroSection = (element: HTMLElement) => {
    const item = JSON.parse(
      element.dataset.item!,
    ) as unknown as LandingPageHeroSectionItem;

    if (!item) {
      console.log('Hero-Section data could not be found');
      return;
    }

    const indexElement = document.querySelector('#hero-section-index');

    if (!indexElement) {
      console.log('Hero-Element could not be found');
      return;
    }

    const carousel = carouselRef.current;

    if (!carousel) {
      console.log('Carousel could not be found');
      return;
    }

    indexElement.innerHTML = item.item.ImgNum;

    carousel.slickGoTo(item.index);
  };

  return updateHeroSection;
}
