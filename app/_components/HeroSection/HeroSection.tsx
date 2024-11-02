import React from 'react';
import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography';
import HeroSectionCarousel from './components/HeroSectionCarousel';

const items = Array(3).fill(0);

export type HeroSectionItem = {
  index: number;
  title: string;
};

export function HeroSection() {
  return (
    <div className="mt-4 xl:-mt-[67px] xl:h-[812px] bg-slate-500 overflow-x-hidden">
      <div className="container pt-[60px] pb-[85px] xl:mx-auto xl:pb-0 xl:pt-[155px] xl:grid xl:grid-cols-[minmax(0,_1.1fr),_minmax(0,_0.9fr)] xl:grid-rows-1">
        <div className="xl:mt-[75px]">
          <div className="px-4 py-1.5 bg-[#2A3075] rounded-lg w-fit">
            <Typography
              variant="h2"
              className="text-white"
              id="hero-section-index"
            >
              01
            </Typography>
          </div>
          <Typography
            variant="h1"
            className="text-white mt-4"
            id="hero-section-title"
          >
            Come wake up among these precious wonders of Malaysia, truly Asia.
          </Typography>
        </div>
        <HeroSectionCarousel>
          {items.map((_, i) => (
            <React.Fragment key={i}>
              <div
                className="data-container"
                data-item={JSON.stringify({
                  index: i,
                  title:
                    'Sarawak Charm Heartbeat of our 130 billion year-old rainforest',
                } as HeroSectionItem)}
              />
              <Placeholder
                width={316}
                height={573}
                className="absolute inset-0"
              />
              <div className="absolute inset-0 px-2 py-2.5 xl:px-5 xl:py-6 flex flex-col justify-between">
                <div className="px-2 py-[2px] xl:px-4 xl:py-1.5 bg-[#2A3075] rounded-lg w-fit">
                  <Typography
                    variant="body1"
                    className="font-semibold text-white"
                  >
                    0{i + 1}
                  </Typography>
                </div>
                <Typography variant="h4" className="text-white line-clamp-3">
                  Sarawak Charm Heartbeat of our 130 billion year-old rainforest
                </Typography>
              </div>
            </React.Fragment>
          ))}
        </HeroSectionCarousel>
      </div>
    </div>
  );
}
