import { ComponentProps } from 'react';
import { getCountryCallingCode } from 'react-phone-number-input';
import type PhoneInput from 'react-phone-number-input';

export type CountryCode = Parameters<typeof getCountryCallingCode>[0];
export type E164Number = NonNullable<
  Parameters<ComponentProps<typeof PhoneInput>['onChange']>[0]
>;
