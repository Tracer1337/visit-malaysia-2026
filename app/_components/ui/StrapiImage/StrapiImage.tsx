import { ImageDataAttributes } from '@/_lib/strapi/media';
import Image from 'next/image';
import { ComponentProps } from 'react';

export function StrapiImage({
  data,
  ...props
}: {
  data: ImageDataAttributes;
} & Omit<ComponentProps<typeof Image>, 'src' | 'width' | 'height' | 'alt'>) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      src={data.url}
      alt={data.alternativeText ?? ''}
      width={data.width}
      height={data.height}
    />
  );
}
