import Image from 'next/image';

export function Adverts() {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-8">
      <Image
        src="/img/advert-1.png"
        alt=""
        width={340}
        height={262}
        className="max-xl:w-full"
      />
      <Image
        src="/img/advert-2.png"
        alt=""
        width={508}
        height={262}
        className="max-xl:w-full"
      />
      <Image
        src="/img/advert-3.png"
        alt=""
        width={340}
        height={262}
        className="max-xl:w-full"
      />
    </div>
  );
}
