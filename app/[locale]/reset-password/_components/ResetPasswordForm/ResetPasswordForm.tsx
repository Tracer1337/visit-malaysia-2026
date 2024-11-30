'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/_components/Button';
import PasswordField from '@/_components/PasswordField';
import { passwordSchema } from '@/_lib/schema/password';

const ResetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordInputs = z.infer<typeof ResetPasswordSchema>;

export function ResetPasswordForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordInputs> = (data) => {
    console.log(data);
    alert('Reset Password');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
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
      <Button variant="primary" type="submit" className="rounded-xl font-bold">
        Reset Password
      </Button>
    </form>
  );
}
