import { ComponentProps } from 'react';
import Typography from '@/_components/ui/Typography';
import ReferralForm from '../ReferralForm';

function Title(props: ComponentProps<'div'>) {
  return (
    <div className="mb-6" {...props}>
      <Typography variant="h3" className="text-center">
        Referral
      </Typography>
      <Typography
        variant="body2"
        className="mt-3 text-center opacity-75"
        element="p"
      >
        Have a code? Enter it below!
      </Typography>
    </div>
  );
}

export const ReferralPageContent = {
  Title,
  Form: ReferralForm,
};
