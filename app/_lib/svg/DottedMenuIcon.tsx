import { ComponentProps } from 'react';

export default function DottedMenuIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={52}
      height={52}
      viewBox="0 0 52 52"
      fill="#686868"
      {...props}
    >
      <path d="M29.792 13.812a4.333 4.333 0 1 1-8.667 0 4.333 4.333 0 0 1 8.667 0ZM29.792 26.812a4.333 4.333 0 1 1-8.667 0 4.333 4.333 0 0 1 8.667 0ZM29.792 39.812a4.333 4.333 0 1 1-8.667 0 4.333 4.333 0 0 1 8.667 0Z" />
    </svg>
  );
}
