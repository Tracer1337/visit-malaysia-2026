'use client';

import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { ComponentProps, useId } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FieldError } from 'react-hook-form';
import { OverwriteProps } from 'tsdef';
import { cn } from '@/_lib/styling';
import Typography from '../Typography';

export function DateField({
  value,
  label,
  placeholder,
  error,
  className,
  ...props
}: OverwriteProps<
  ComponentProps<typeof DatePicker>,
  {
    value: Date | null;
    label?: string;
    placeholder?: string;
    error?: FieldError;
    className?: string;
  }
>) {
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
        <DatePicker
          selected={value}
          placeholderText={placeholder}
          id={id}
          wrapperClassName="w-full"
          className={cn(
            'p-4 bg-[#F4F5F6] rounded-xl w-full',
            error && 'outline-red-600 outline outline-1',
          )}
          {...(props as ComponentProps<typeof DatePicker>)}
        />
        <ChevronDownIcon className="absolute top-1/2 right-4 -translate-y-1/2 w-[20px] opacity-35 pointer-events-none" />
      </div>
    </div>
  );
}
