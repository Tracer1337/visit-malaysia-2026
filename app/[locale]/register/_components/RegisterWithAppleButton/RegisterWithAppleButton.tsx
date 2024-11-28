'use client';

import Typography from '@/_components/ui/Typography';
import { useRouter } from '@/_lib/i18n/routing';
import { cn } from '@/_lib/styling';
import AppleIcon from '@/_lib/svg/AppleIcon';

export function RegisterWithAppleButton({ className }: { className?: string }) {
  const router = useRouter();

  const handleAppleRegister = () => {
    router.push('/referral');
  };

  return (
    <button
      className={cn(
        'bg-black text-white flex justify-center p-4 rounded-lg',
        className,
      )}
      onClick={handleAppleRegister}
    >
      <AppleIcon width={24} height={24} className="mr-4" />
      <Typography variant="body1" className="font-medium">
        Sign Up with Apple
      </Typography>
    </button>
  );
}
