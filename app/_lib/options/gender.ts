import { SelectOption } from '@/_components/ui/Select/Select';

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
