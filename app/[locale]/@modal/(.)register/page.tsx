import { RegisterPageContent } from '@/[locale]/register/_components/RegisterPageContent';
import Dialog from '@/_components/ui/Dialog';

export default function RegisterModalPage() {
  return (
    <Dialog title={<RegisterPageContent.Title />}>
      <RegisterPageContent.Socials />
      <RegisterPageContent.Divider />
      <RegisterPageContent.Form />
    </Dialog>
  );
}
