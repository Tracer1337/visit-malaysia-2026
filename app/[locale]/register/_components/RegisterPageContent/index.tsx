import { ComponentProps } from 'react';
import Typography from '@/_components/ui/Typography';
import RegisterForm from '../RegisterForm';
import { RegisterWithAppleButton } from '../RegisterWithAppleButton/RegisterWithAppleButton';
import RegisterWithGoogleButton from '../RegisterWithGoogleButton';

function Title(props: ComponentProps<'div'>) {
  return (
    <div className="mb-6" {...props}>
      <Typography variant="h3" className="text-center">
        Sign Up
      </Typography>
      <Typography
        variant="body2"
        className="mt-3 text-center opacity-75"
        element="p"
      >
        Enter your valid information to sign up
      </Typography>
    </div>
  );
}

function Socials() {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <RegisterWithGoogleButton className="w-full" />
      <RegisterWithAppleButton className="w-full" />
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

export const RegisterPageContent = {
  Title,
  Socials,
  Divider,
  Form: RegisterForm,
};
