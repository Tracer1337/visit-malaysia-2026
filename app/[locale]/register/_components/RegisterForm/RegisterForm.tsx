'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';
import Button from '@/_components/Button';
import Checkbox from '@/_components/Checkbox';
import DateField from '@/_components/DateField';
import PasswordField from '@/_components/PasswordField';
import PhoneNumberField from '@/_components/PhoneNumberField';
import Select from '@/_components/Select';
import TextField from '@/_components/TextField';
import Typography from '@/_components/Typography';
import { Link } from '@/_lib/i18n/routing';
import { Gender, genderOptions } from '@/_lib/options/gender';
import { passwordSchema } from '@/_lib/schema/password';

const RegisterSchema = z
  .object({
    firstname: z
      .string()
      .min(1, 'First name is required')
      .max(50, 'First name must not exceed 50 characters'),
    lastname: z
      .string()
      .min(1, 'Last name is required')
      .max(50, 'Last name must not exceed 50 characters'),
    email: z
      .string()
      .email('Invalid email address')
      .min(1, 'Email is required'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm password is required'),
    phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .refine(isValidPhoneNumber, 'Invalid phone number')
      .default(''),
    dateOfBirth: z.date({
      errorMap: () => ({ message: 'Date of birth is required' }),
    }),
    gender: z.nativeEnum(Gender, {
      errorMap: () => ({ message: 'Gender is required' }),
    }),
    referral: z.string().optional(),
    acceptTerms: z
      .boolean()
      .default(false)
      .refine(
        (value) => value === true,
        'You must accept the terms and conditions',
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterInputs = z.infer<typeof RegisterSchema>;

export function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<RegisterInputs>({
    resolver: zodResolver(RegisterSchema),
  });

  const [showTerms, setShowTerms] = useState(false);

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    console.log(data);
    alert('Login');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <div className="flex gap-6 max-sm:flex-col">
        <TextField
          label="First Name"
          placeholder="Jhon"
          error={errors?.firstname}
          className="grow"
          {...register('firstname')}
        />
        <TextField
          label="Last Name"
          placeholder="Edward"
          error={errors?.lastname}
          className="grow"
          {...register('lastname')}
        />
      </div>
      <TextField
        label="Email"
        placeholder="jhonedward@gmail.com"
        error={errors?.email}
        {...register('email')}
      />
      <PasswordField
        label="Password"
        placeholder="Please input"
        error={errors?.password}
        hint="Password min 8 characters with uppercase, lowercase, number, and special character"
        {...register('password')}
      />
      <PasswordField
        label="Confirm Password"
        placeholder="Please input"
        error={errors?.confirmPassword}
        {...register('confirmPassword')}
      />
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { value, onChange } }) => (
          <PhoneNumberField
            value={value}
            onChange={onChange}
            label="Phone Number"
            placeholder="000-000-00-00"
            error={errors?.phoneNumber}
          />
        )}
      />
      <div className="flex gap-6 max-sm:flex-col">
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field: { value, onChange } }) => (
            <DateField
              value={value}
              onChange={onChange}
              label="Date of Birth"
              placeholder="dd/mm/years"
              error={errors?.dateOfBirth}
              dateFormat="dd/MM/yyyy"
              className="sm:w-1/2"
            />
          )}
        />
        <Controller
          control={control}
          name="gender"
          render={({ field: { value, onChange } }) => (
            <Select
              options={genderOptions}
              value={value}
              onChange={onChange}
              label="Gender"
              placeholder="Please select"
              error={errors?.gender}
              className="sm:w-1/2"
            />
          )}
        />
      </div>
      <TextField
        label="Referral"
        placeholder="optional"
        error={errors?.referral}
        {...register('referral')}
      />
      <div>
        <Controller
          control={control}
          name="acceptTerms"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              onCheckedChange={onChange}
              checked={value}
              error={errors?.acceptTerms}
              label={
                <span>
                  I accept the{' '}
                  <span
                    className="font-semibold text-[#00398D] cursor-pointer"
                    onClick={(event) => {
                      setShowTerms(true);
                      event.preventDefault();
                    }}
                  >
                    Terms and Condition
                  </span>
                </span>
              }
            />
          )}
        />
        {showTerms && (
          <Typography variant="body3" className="opacity-50 mt-3" element="p">
            Disclosure: Apps use and transfer to any other app of information
            received from Google APIs will adhere to Google API Services User
            Data Policy, including the Limited Use requirements. While using Our
            Service, We may ask you to provide Us with certain personally
            identifiable information that can be used to contact or identify
            You. Personally identifiable information may include:{' '}
            <Link href="/" className="font-semibold text-[#00398D]">
              Privacy Policy
            </Link>
          </Typography>
        )}
      </div>
      <Button className="rounded-xl font-bold" type="submit">
        Sign Up Now
      </Button>
      <Typography variant="body2" element="p" className="text-center">
        Already have an account?{' '}
        <Link href="/login" replace className="text-[#00398D] font-semibold">
          Sign In
        </Link>
      </Typography>
    </form>
  );
}
