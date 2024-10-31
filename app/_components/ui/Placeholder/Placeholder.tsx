import Image from 'next/image';

export function Placeholder({
  width,
  height,
  className,
}: {
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <Image
      src={`https://placehold.co/${width}x${height}`}
      width={width}
      height={height}
      alt=""
      className={className}
    />
  );
}
