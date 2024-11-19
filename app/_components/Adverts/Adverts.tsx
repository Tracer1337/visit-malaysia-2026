import Image from 'next/image';

export function Adverts() {
  return (
    <div className="flex flex-col justify-center gap-8 md:grid md:grid-cols-2 md:grid-rows-2 lg:flex lg:flex-row">
      <Image
        src="/img/advert-1.png"
        alt=""
        width={340}
        height={262}
        className="row-start-2 max-xl:w-full"
      />
      <Image
        src="/img/advert-2.png"
        alt=""
        width={508}
        height={262}
        className="col-span-2 max-xl:w-full"
      />
      <Image
        src="/img/advert-3.png"
        alt=""
        width={340}
        height={262}
        className="col-start-2 row-start-2 max-xl:w-full"
      />
    </div>
  );
}
