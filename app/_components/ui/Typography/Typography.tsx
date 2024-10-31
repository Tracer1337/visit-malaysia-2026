import { createElement, PropsWithChildren, ReactHTML } from 'react';
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
  h1: 'font-heading font-bold text-[64px] leading-[76px]',
  h2: 'font-heading font-bold text-[38px] leading-[46px]',
  h3: 'font-heading font-bold text-[30px] leading-[36px]',
  h4: 'font-heading font-bold text-[24px] leading-[28px]',
  h5: 'font-heading text-[20px] leading-[24px]',
  body1: 'text-[18px] leading-[24px]',
  body2: 'text-[16px] leading-[20px]',
  body3: 'text-[14px] leading-[18px]',
  body4: 'text-[12px] leading-[16px]',
};

export function Typography({
  variant,
  className,
  element,
  children,
}: PropsWithChildren<{
  variant: TypographyVariant;
  element?: keyof ReactHTML;
  className?: string;
}>) {
  return createElement(
    element ?? typographyElements[variant],
    {
      className: twMerge(typographyClasses[variant], className),
    },
    children,
  );
}
