import { ComponentProps, ReactNode, forwardRef, useId } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/_lib/styling';
import Typography from '../Typography';

export const TextField = forwardRef<
  HTMLInputElement,
  {
    label?: string;
    inputSlot?: ReactNode;
    error?: FieldError;
    hint?: ReactNode;
  } & ComponentProps<'input'>
>(function TextField(
  { label, className, inputSlot, error, hint, ...props },
  ref,
) {
  const id = useId();

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        <Typography variant="body2" element="label" htmlFor={id}>
          {label}
        </Typography>
        <Typography variant="body2" className="text-red-600">
          {error?.message}
        </Typography>
      </div>
      <div className="relative">
        <input
          type="text"
          className={cn(
            'p-4 bg-[#F4F5F6] rounded-xl w-full placeholder-gray-400',
            error && 'outline-red-600 outline outline-1',
          )}
          id={id}
          ref={ref}
          {...props}
        />
        {inputSlot}
      </div>
      {hint && (
        <Typography variant="body3" className="mt-1 opacity-50" element="p">
          {hint}
        </Typography>
      )}
    </div>
  );
});
