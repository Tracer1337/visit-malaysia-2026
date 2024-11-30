import { ComponentProps } from 'react';
import Typography from '@/_components/Typography';
import LoginForm from '../LoginForm';
import { LoginWithAppleButton } from '../LoginWithAppleButton/LoginWithAppleButton';
import { LoginWithGoogleButton } from '../LoginWithGoogleButton/LoginWithGoogleButton';

function Title(props: ComponentProps<'div'>) {
  return (
    <div className="mb-6" {...props}>
      <Typography variant="h3" className="text-center">
        Welcome Back
      </Typography>
      <Typography
        variant="body2"
        className="mt-3 text-center opacity-75"
        element="p"
      >
        Enter your email and password to login
      </Typography>
    </div>
  );
}

function Socials() {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <LoginWithGoogleButton className="w-full" />
      <LoginWithAppleButton className="w-full" />
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center mb-6">
      <hr className="mx-4 grow" />
      <Typography variant="body2">OR</Typography>
      <hr className="mx-4 grow" />
    </div>
  );
}

export const LoginPageContent = { Title, Socials, Divider, Form: LoginForm };
