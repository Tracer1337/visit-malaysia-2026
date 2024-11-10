import Image from 'next/image';

export function Adverts() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 lg:flex lg:flex-row justify-center gap-8">
      <Image
        src="/img/advert-1.png"
        alt=""
        width={340}
        height={262}
        className="max-xl:w-full row-start-2"
      />
      <Image
        src="/img/advert-2.png"
        alt=""
        width={508}
        height={262}
        className="max-xl:w-full col-span-2"
      />
      <Image
        src="/img/advert-3.png"
        alt=""
        width={340}
        height={262}
        className="max-xl:w-full col-start-2 row-start-2"
      />
    </div>
  );
}
