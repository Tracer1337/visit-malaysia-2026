import { ResetPasswordPageContent } from '@/[locale]/reset-password/_components/ResetPasswordPageContent';
import Dialog from '@/_components/Dialog';

export default function ResetPasswordModalPage() {
  return (
    <Dialog
      title={<ResetPasswordPageContent.Title />}
      closeButtonVariant="back"
    >
      <ResetPasswordPageContent.Form />
    </Dialog>
  );
}
