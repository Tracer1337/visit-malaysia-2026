import { ComponentProps } from 'react';
import Typography from '@/_components/ui/Typography';
import ResetPasswordForm from '../ResetPasswordForm';

function Title(props: ComponentProps<'div'>) {
  return (
    <div className="mb-6" {...props}>
      <Typography variant="h3" className="text-center">
        New Password
      </Typography>
      <Typography
        variant="body2"
        className="mt-3 text-center opacity-75"
        element="p"
      >
        Plase update your new password
      </Typography>
    </div>
  );
}

export const ResetPasswordPageContent = {
  Title,
  Form: ResetPasswordForm,
};
