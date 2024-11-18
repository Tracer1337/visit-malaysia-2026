import { ComponentProps, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const variants = {
  primary: 'bg-[#00398D] text-white',
  secondary: 'bg-[#F4F5F6]',
};

export function Button({
  onClick,
  variant = 'primary',
  className,
  children,
}: PropsWithChildren<{
  variant?: 'primary' | 'secondary';
}> &
  ComponentProps<'button'>) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `font-medium px-3 py-[10.5px] ${variants[variant]}`,
        className,
      )}
    >
      {children}
    </button>
  );
}
