import {
  ComponentProps,
  createElement,
  PropsWithChildren,
  ReactHTML,
} from 'react';
import { twMerge } from 'tailwind-merge';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4';

const typographyElements: Record<TypographyVariant, keyof ReactHTML> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  body1: 'span',
  body2: 'span',
  body3: 'span',
  body4: 'span',
};

const typographyClasses: Record<TypographyVariant, string> = {
  h1: 'font-heading font-bold xl:text-[64px] xl:leading-[76px] md:text-[54px] md:leading-[64px] text-[32px] leading-[38px]',
  h2: 'font-heading font-bold xl:text-[38px] xl:leading-[46px] md:text-[32px] md:leading-[38px] text-[28px] leading-[32px]',
  h3: 'font-heading font-bold xl:text-[30px] xl:leading-[36px] md:text-[30px] md:leading-[36px] text-[24px] leading-[28px]',
  h4: 'font-heading font-bold xl:text-[24px] xl:leading-[28px] md:text-[24px] md:leading-[28px] text-[18px] leading-[21px]',
  h5: 'font-heading xl:text-[20px] xl:leading-[24px] md:text-[20px] md:leading-[24px] text-[16px] leading-[19px]',
  body1:
    'xl:text-[18px] xl:leading-[24px] md:text-[16px] md:leading-[20px] text-[16px] leading-[20px]',
  body2:
    'xl:text-[16px] xl:leading-[20px] md:text-[16px] md:leading-[20px] text-[16px] leading-[20px]',
  body3:
    'xl:text-[14px] xl:leading-[18px] md:text-[14px] md:leading-[18px] text-[12px] leading-[15px]',
  body4:
    'xl:text-[12px] xl:leading-[16px] md:text-[12px] md:leading-[16px] text-[10px] leading-[13px]',
};

export function Typography({
  variant,
  element,
  children,
  className,
  ...props
}: PropsWithChildren<
  {
    variant: TypographyVariant;
    element?: keyof ReactHTML;
  } & ComponentProps<'div'>
>) {
  return createElement(
    element ?? typographyElements[variant],
    {
      className: twMerge(typographyClasses[variant], className),
      ...props,
    },
    children,
  );
}
