'use client';

import Typography from '@/_components/Typography';
import { cn } from '@/_lib/styling';
import AppleIcon from '@/_lib/svg/AppleIcon';

export function LoginWithAppleButton({ className }: { className?: string }) {
  return (
    <button
      className={cn(
        'bg-black text-white flex justify-center p-4 rounded-lg',
        className,
      )}
      onClick={() => alert('Login with Apple')}
    >
      <AppleIcon width={24} height={24} className="mr-4" />
      <Typography variant="body1" className="font-medium">
        Sign In with Apple
      </Typography>
    </button>
  );
}
