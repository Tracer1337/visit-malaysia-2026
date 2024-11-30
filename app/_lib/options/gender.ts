import { SelectOption } from '@/_components/Select/Select';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export const genderOptions: SelectOption<Gender>[] = [
  {
    label: 'Male',
    value: Gender.Male,
  },
  {
    label: 'Female',
    value: Gender.Female,
  },
];
