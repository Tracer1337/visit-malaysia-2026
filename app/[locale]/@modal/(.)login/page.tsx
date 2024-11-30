import { LoginPageContent } from '@/[locale]/login/_components/LoginPageContent';
import Dialog from '@/_components/Dialog';

export default function LoginModalPage() {
  return (
    <Dialog title={<LoginPageContent.Title />}>
      <LoginPageContent.Socials />
      <LoginPageContent.Divider />
      <LoginPageContent.Form />
    </Dialog>
  );
}
