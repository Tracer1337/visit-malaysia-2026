import { CheckIcon } from '@heroicons/react/16/solid';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { ComponentProps, forwardRef, useId } from 'react';
import Typography from '../Typography';

export const Checkbox = forwardRef<
  HTMLButtonElement,
  { label: string } & ComponentProps<(typeof RadixCheckbox)['Root']>
>(function Checkbox({ label, ...props }, ref) {
  const id = useId();

  return (
    <div className="flex items-center">
      <RadixCheckbox.Root
        className="flex appearance-none items-center justify-center rounded bg-white size-[22px] border border-[#7B8794]"
        id={id}
        ref={ref}
        {...props}
      >
        <RadixCheckbox.Indicator asChild>
          <CheckIcon />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <Typography variant="body2" element="label" htmlFor={id} className="ml-2">
        {label}
      </Typography>
    </div>
  );
});
