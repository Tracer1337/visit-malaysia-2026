'use client';

import { ComponentProps, useEffect, useId, useState } from 'react';
import { FieldError } from 'react-hook-form';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import { cn } from '@/_lib/styling';
import Typography from '../Typography';
import PhoneNumberFieldCountrySelect from './components/PhoneNumberFieldCountrySelect';
import { CountryCode, E164Number } from './types';

export function PhoneNumberField({
  label,
  error,
  className,
  defaultCountry = 'MY',
  value,
  onChange,
  ...props
}: {
  label?: string;
  error?: FieldError;
} & ComponentProps<typeof PhoneInput>) {
  const id = useId();

  const [country, setCountry] = useState<CountryCode>(defaultCountry);

  useEffect(() => {
    onChange(undefined);
  }, [country, onChange]);

  const getValue = (): E164Number =>
    value?.startsWith('+')
      ? (value as E164Number)
      : (`+${getCountryCallingCode(country)}` as E164Number);

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
      <div className="flex">
        <PhoneNumberFieldCountrySelect
          value={country}
          onChange={setCountry}
          className="rounded-l-xl border-r border-[rgba(0,0,0,.25)]"
        />
        <PhoneInput
          className={cn(
            'bg-[#F4F5F6] rounded-r-xl w-full',
            '[&_.PhoneInputInput]:placeholder-gray-400',
            '[&_.PhoneInputCountry]:hidden',
            error && 'outline-red-600 outline outline-1',
          )}
          id={id}
          country={country}
          numberInputProps={{ className: 'p-4 bg-transparent w-full' }}
          value={getValue()}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
}
