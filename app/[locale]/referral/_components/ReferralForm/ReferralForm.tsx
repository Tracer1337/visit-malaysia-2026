'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/_components/ui/Button';
import TextField from '@/_components/ui/TextField';
import { useRouter } from '@/_lib/i18n/routing';

const ReferralSchema = z.object({
  referral: z.string().optional(),
});

type ReferralInputs = z.infer<typeof ReferralSchema>;

export function ReferralForm() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ReferralInputs>({
    resolver: zodResolver(ReferralSchema),
  });

  const onSkip = () => {
    router.push('/');
  };

  const onSubmit: SubmitHandler<ReferralInputs> = (data) => {
    console.log(data);
    alert('Referral');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <TextField
        label="Referral"
        placeholder="optional"
        error={errors.referral}
        {...register('referral')}
      />
      <div className="flex gap-6">
        <Button
          variant="secondary"
          type="button"
          onClick={onSkip}
          className="w-full sm:w-1/2 rounded-xl font-bold"
        >
          Skip
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="w-full sm:w-1/2 rounded-xl font-bold"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
