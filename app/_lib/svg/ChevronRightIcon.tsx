import { ComponentProps } from 'react';

export default function ChevronRightIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="#000"
      {...props}
    >
      <path d="m7.01 18.066 6.777-5.768L7.01 6.531c-.681-.58-.681-1.516 0-2.096.68-.58 1.781-.58 2.462 0l8.016 6.823c.681.58.681 1.516 0 2.096l-8.016 6.822c-.68.58-1.781.58-2.462 0-.664-.58-.681-1.53 0-2.11Z" />
    </svg>
  );
}
