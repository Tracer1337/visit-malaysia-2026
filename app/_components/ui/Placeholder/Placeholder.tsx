import Image from 'next/image';
import { ComponentProps } from 'react';

export function Placeholder({
  width,
  height,
  className,
}: {
  width: number;
  height: number;
  className?: ComponentProps<typeof Image>['className'];
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
