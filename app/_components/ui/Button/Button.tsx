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
        `px-3 py-[10.5px] font-medium ${variants[variant]}`,
        className,
      )}
    >
      {children}
    </button>
  );
}
