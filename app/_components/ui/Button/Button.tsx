import { PropsWithChildren } from 'react';

const variants = {
  primary: 'bg-[#00398D] text-white',
  secondary: 'bg-[#F4F5F6]',
};

export function Button({
  onClick,
  variant = 'primary',
  children,
}: PropsWithChildren<{
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}>) {
  return (
    <button
      onClick={onClick}
      className={`font-medium px-3 py-[10.5px] ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
