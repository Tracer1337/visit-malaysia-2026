import { ImageDataAttributes } from '@/_lib/strapi/media';
import Image from 'next/image';
import { ComponentProps } from 'react';
import { WithOptionalKeys } from 'tsdef';

export function StrapiImage({
  data,
  ...props
}: {
  data: ImageDataAttributes;
} & WithOptionalKeys<
  Omit<ComponentProps<typeof Image>, 'src'>,
  'width' | 'height' | 'alt'
>) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      src={data.url}
      alt={props.alt ?? data.alternativeText ?? ''}
      width={props.width ?? data.width}
      height={props.height ?? data.height}
    />
  );
}
