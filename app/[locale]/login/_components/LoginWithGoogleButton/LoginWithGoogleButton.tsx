'use client';

import Typography from '@/_components/Typography';
import { useAuthPlaceholder } from '@/_lib/auth/context';
import { cn } from '@/_lib/styling';
import GoogleIcon from '@/_lib/svg/GoogleIcon';

export function LoginWithGoogleButton({ className }: { className?: string }) {
  const authPlaceholder = useAuthPlaceholder();

  return (
    <button
      className={cn(
        'shadow-md border border-gray-100 flex justify-center p-4 rounded-lg',
        className,
      )}
      onClick={authPlaceholder.login}
    >
      <GoogleIcon width={24} height={24} className="mr-4" />
      <Typography variant="body1" className="font-medium opacity-50">
        Sign In with Google
      </Typography>
    </button>
  );
}
