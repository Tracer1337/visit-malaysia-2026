import { ComponentProps, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'disabled';

const variants: Record<Variant, string> = {
  primary: 'bg-[#00398D] text-white',
  secondary: 'bg-[#F4F5F6]',
  disabled: 'bg-[#CACACA] text-[#6B6B6B]',
};

export function Button({
  onClick,
  variant = 'primary',
  className,
  children,
  disabled,
  ...props
}: PropsWithChildren<{
  variant?: Exclude<Variant, 'disabled'>;
}> &
  ComponentProps<'button'>) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'px-3 py-[10.5px] font-medium',
        variants[disabled ? 'disabled' : variant],
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
