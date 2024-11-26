'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/_components/ui/Button';
import Checkbox from '@/_components/ui/Checkbox';
import PasswordField from '@/_components/ui/PasswordField';
import TextField from '@/_components/ui/TextField';
import Typography from '@/_components/ui/Typography';
import { Link } from '@/_lib/i18n/routing';

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  rememberMe: z.boolean().optional(),
});

type LoginInputs = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
    control,
  } = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data);
    alert('Login');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <TextField
        label="Email"
        type="email"
        placeholder="jhonedward@gmail.com"
        error={errors.email}
        {...register('email')}
      />
      <PasswordField
        label="Password"
        placeholder="Please input"
        error={errors.password}
        {...register('password')}
      />
      <div className="flex justify-between items-center">
        <Controller
          control={control}
          name="rememberMe"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              onCheckedChange={onChange}
              checked={value}
              label="Remember me"
            />
          )}
        />
        <Link href="/forgot-password">
          <Typography variant="body2" className="font-semibold text-[#00398D]">
            Forgot Password
          </Typography>
        </Link>
      </div>
      <Button
        className="rounded-xl font-bold"
        disabled={!isValid}
        type="submit"
      >
        Sign In
      </Button>
      <Typography variant="body2" element="p" className="text-center">
        Don’t have an account?{' '}
        <Link href="/signup" replace className="text-[#00398D] font-semibold">
          Sign Up
        </Link>
      </Typography>
    </form>
  );
}
