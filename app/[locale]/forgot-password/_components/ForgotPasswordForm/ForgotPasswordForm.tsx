'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/_components/ui/Button';
import TextField from '@/_components/ui/TextField';
import { useRouter } from '@/_lib/i18n/routing';

const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordInputs = z.infer<typeof ForgotPasswordSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = (data) => {
    console.log(data);
    router.push('/reset-password');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <TextField
        label="Email"
        placeholder="jhonedward@gmail.com"
        error={errors.email}
        hint="To reset your password, please enter your email address — we’ll send you a link to reset it."
        {...register('email')}
      />
      <Button variant="primary" type="submit" className="rounded-xl font-bold">
        Send Link
      </Button>
    </form>
  );
}
