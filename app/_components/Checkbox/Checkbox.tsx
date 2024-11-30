import { CheckIcon } from '@heroicons/react/16/solid';
// eslint-disable-next-line no-restricted-imports
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { ComponentProps, ReactNode, useId } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/_lib/styling';
import Typography from '../Typography';

export function Checkbox({
  label,
  error,
  ...props
}: { label: ReactNode; error?: FieldError } & ComponentProps<
  (typeof RadixCheckbox)['Root']
>) {
  const id = useId();

  return (
    <div>
      <div className="flex items-center">
        <RadixCheckbox.Root
          className={cn(
            'flex appearance-none items-center justify-center rounded bg-white size-[22px] border border-[#7B8794]',
            error && 'border-red-600',
          )}
          id={id}
          {...props}
        >
          <RadixCheckbox.Indicator asChild>
            <CheckIcon />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        <Typography
          variant="body2"
          element="label"
          htmlFor={id}
          className="ml-2"
        >
          {label}
        </Typography>
      </div>
      <Typography variant="body2" className="text-red-600">
        {error?.message}
      </Typography>
    </div>
  );
}
