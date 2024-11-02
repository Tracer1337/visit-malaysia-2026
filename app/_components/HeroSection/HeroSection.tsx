import { tailwindConfig } from '@/_lib/tailwind';
import Carousel from '../ui/Carousel';
import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography';

const items = Array(3).fill(0);

export function HeroSection() {
  const carouselMobileClasses =
    '[&_.slick-slide]:pr-[16px] w-[calc(145px*3+16px*3)]';

  const carouselItemMobileClasses = 'max-w-[145px] h-[264px]';

  const carouselDesktopClasses =
    'xl:[&_.slick-slide]:pr-[40px] xl:w-[calc(316px*2+40px*2)]';

  const carouselItemDesktopClasses = 'xl:max-w-[316px] xl:h-[573px]';

  return (
    <div className="mt-4 xl:-mt-[67px] xl:h-[812px] bg-slate-500 overflow-x-hidden">
      <div className="container pt-[60px] pb-[85px] xl:mx-auto xl:pb-0 xl:pt-[155px] xl:grid xl:grid-cols-[minmax(0,_1.1fr),_minmax(0,_0.9fr)] xl:grid-rows-1">
        <div className="xl:mt-[75px]">
          <div className="px-4 py-1.5 bg-[#2A3075] rounded-lg w-fit">
            <Typography variant="h2" className="text-white">
              01
            </Typography>
          </div>
          <Typography variant="h1" className="text-white mt-4">
            Come wake up among these precious wonders of Malaysia, truly Asia.
          </Typography>
        </div>
        <div
          className={`xl:ml-[112px] mt-9 xl:mt-0 ${carouselMobileClasses} ${carouselDesktopClasses}`}
        >
          <Carousel
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
            {items.map((_, i) => (
              <div
                className={`rounded-2xl relative ${carouselItemMobileClasses} ${carouselItemDesktopClasses} overflow-hidden`}
                key={i}
              >
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
                    Sarawak Charm Heartbeat of our 130 billion year-old
                    rainforest
                  </Typography>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
