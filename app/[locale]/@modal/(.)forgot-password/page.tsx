import { ForgotPasswordPageContent } from '@/[locale]/forgot-password/_components/ForgotPasswordPageContent';
import Dialog from '@/_components/Dialog';

export default function ForgotPasswordModalPage() {
  return (
    <Dialog
      title={<ForgotPasswordPageContent.Title />}
      closeButtonVariant="back"
    >
      <ForgotPasswordPageContent.Form />
    </Dialog>
  );
}
