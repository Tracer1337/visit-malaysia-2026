'use client';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { ComponentProps, forwardRef, useState } from 'react';
import TextField from '../TextField';

export const PasswordField = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof TextField>
>(function PasswordField(props, ref) {
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  return (
    <TextField
      inputSlot={
        <button
          onClick={() => setIsShowingPassword(!isShowingPassword)}
          className="size-5 absolute right-4 top-[50%] -translate-y-1/2 opacity-40"
          type="button"
        >
          {isShowingPassword ? <EyeSlashIcon /> : <EyeIcon />}
        </button>
      }
      type={isShowingPassword ? 'text' : 'password'}
      ref={ref}
      {...props}
    />
  );
});
