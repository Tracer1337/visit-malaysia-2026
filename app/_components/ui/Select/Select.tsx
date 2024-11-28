import { CheckIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import * as RadixSelect from '@radix-ui/react-select';
import { useId } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/_lib/styling';
import Typography from '../Typography';

export type SelectOption<T = string> = { value: T; label: string };

export function Select({
  options,
  value,
  onChange,
  label,
  placeholder,
  error,
  className,
}: {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  className?: string;
}) {
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
      <RadixSelect.Root value={value} onValueChange={onChange}>
        <RadixSelect.Trigger
          className={cn(
            'flex items-center bg-[#F4F5F6] p-4 rounded-xl w-full relative data-[placeholder]:text-gray-400',
            error && 'outline-red-600 outline outline-1',
          )}
        >
          <RadixSelect.Value placeholder={placeholder}></RadixSelect.Value>
          <RadixSelect.Icon>
            <ChevronDownIcon className="absolute top-1/2 right-4 -translate-y-1/2 w-[20px] opacity-35 pointer-events-none text-black" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className="overflow-hidden bg-gray-600 rounded-md shadow-md text-white z-50">
            <RadixSelect.ScrollUpButton className="flex items-center justify-center h-6">
              <ChevronUpIcon className="size-6 " />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport className="p-1">
              {options.map((option) => (
                <RadixSelect.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex items-center h-6 pl-6 pr-8 leading-none data-[highlighted]:bg-gray-200 data-[highlighted]:text-black cursor-default"
                >
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className="absolute left-0 w-4 ml-1 flex justify-center items-center">
                    <CheckIcon />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
}
