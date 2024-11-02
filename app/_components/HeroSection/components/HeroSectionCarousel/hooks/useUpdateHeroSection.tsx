import type { HeroSectionItem } from '@/_components/HeroSection/HeroSection';
import Carousel from '@/_components/ui/Carousel';
import { RefObject } from 'react';

export function useUpdateHeroSection({
  carouselRef,
}: {
  carouselRef: RefObject<Carousel>;
}) {
  const updateHeroSection = (element: HTMLElement) => {
    const item = JSON.parse(
      element.dataset.item!,
    ) as unknown as HeroSectionItem;

    if (!item) {
      console.log('Hero-Section data could not be found');
      return;
    }

    const indexElement = document.querySelector('#hero-section-index');
    const titleElement = document.querySelector('#hero-section-title');

    if (!indexElement || !titleElement) {
      console.log('Hero-Element could not be found');
      return;
    }

    const carousel = carouselRef.current;

    if (!carousel) {
      console.log('Carousel could not be found');
      return;
    }

    indexElement.innerHTML = (item.index + 1).toString().padStart(2, '0');
    titleElement.innerHTML = item.title;

    carousel.slickGoTo(item.index);
  };

  return updateHeroSection;
}
