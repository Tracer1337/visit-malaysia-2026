import { ComponentProps } from 'react';

export default function RatingStarIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="#fff"
      {...props}
    >
      <path d="m10.293.75 2.78 6.923 7.444.505-5.726 4.784 1.82 7.235-6.318-3.967-6.319 3.967 1.82-7.235L.07 8.178l7.444-.505L10.293.75Z" />
    </svg>
  );
}
