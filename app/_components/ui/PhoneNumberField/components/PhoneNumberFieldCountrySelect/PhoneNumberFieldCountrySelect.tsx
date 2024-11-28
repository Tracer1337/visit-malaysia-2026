'use client';

import { CheckIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import * as Select from '@radix-ui/react-select';
import Image from 'next/image';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input';
import countryLabels from 'react-phone-number-input/locale/en';
import Typography from '@/_components/ui/Typography';
import { cn } from '@/_lib/styling';
import { CountryCode } from '../../types';

const flagUrl =
  'https://purecatamphetamine.github.io/country-flag-icons/3x2/{XX}.svg';

export function PhoneNumberFieldCountrySelect({
  value,
  onChange,
  className,
}: {
  value: CountryCode;
  onChange: (value: CountryCode) => void;
  className?: string;
}) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className={cn(
          'flex items-center bg-[#F4F5F6] p-4 min-w-fit',
          className,
        )}
      >
        <Select.Value asChild>
          <div className="mr-2 flex items-center min-w-fit">
            <Image
              src={flagUrl.replace('{XX}', value)}
              alt={value}
              width={24}
              height={16}
              className="mr-2"
            />
            <Typography variant="body1" className="!text-[16px]">
              +{getCountryCallingCode(value)}
            </Typography>
          </div>
        </Select.Value>
        <Select.Icon>
          <ChevronDownIcon className="w-[20px]" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-gray-600 rounded-md shadow-md text-white z-50">
          <Select.ScrollUpButton className="flex items-center justify-center h-6">
            <ChevronUpIcon className="size-6 " />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1">
            {getCountries().map((country) => (
              <Select.Item
                key={country}
                value={country}
                className="relative flex items-center h-6 pl-6 pr-8 leading-none data-[highlighted]:bg-gray-200 data-[highlighted]:text-black cursor-default"
              >
                <Select.ItemText>
                  {countryLabels[country]} +{getCountryCallingCode(country)}
                </Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 w-4 ml-1 flex justify-center items-center">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
