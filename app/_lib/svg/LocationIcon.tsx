import { ComponentProps } from 'react';

export default function LocationIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="#000"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M8.447 16.6S3 12.014 3 7.5a6 6 0 1 1 12 0c0 4.514-5.447 9.1-5.447 9.1a.84.84 0 0 1-1.107 0ZM9 10.126a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
