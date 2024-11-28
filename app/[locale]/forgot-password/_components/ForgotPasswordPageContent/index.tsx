import { ComponentProps } from 'react';
import Typography from '@/_components/ui/Typography';
import ForgotPasswordForm from '../ForgotPasswordForm';

function Title(props: ComponentProps<'div'>) {
  return (
    <div className="mb-6" {...props}>
      <Typography variant="h3" className="text-center">
        Forgot Password?
      </Typography>
      <Typography
        variant="body2"
        className="mt-3 text-center opacity-75"
        element="p"
      >
        Enter your email to forgot password
      </Typography>
    </div>
  );
}

export const ForgotPasswordPageContent = {
  Title,
  Form: ForgotPasswordForm,
};
