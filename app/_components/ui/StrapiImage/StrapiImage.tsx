import { ImageData } from '@/_lib/strapi/media';
import Image from 'next/image';
import { ComponentProps } from 'react';
import { WithOptionalKeys } from 'tsdef';

export function StrapiImage({
  data,
  ...props
}: {
  data: ImageData;
} & WithOptionalKeys<
  Omit<ComponentProps<typeof Image>, 'src'>,
  'width' | 'height' | 'alt'
>) {
  props.alt = props.alt ?? data.attributes.alternativeText ?? '';
  props.width = props.width ?? data.attributes.width;
  props.height = props.height ?? data.attributes.height;

  if (props.fill) {
    delete props.width;
    delete props.height;
  }

  return (
    // @ts-expect-error ts(2322)
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image {...props} src={data.attributes.url} />
  );
}
