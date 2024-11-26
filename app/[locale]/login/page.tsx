import { LoginPageContent } from './_components/LoginPageContent';

export default function LoginPage() {
  return (
    <div className="mx-auto my-20 max-w-[642px] rounded-xl border border-gray-300 py-6 px-[50px]">
      <LoginPageContent.Title />
      <LoginPageContent.Socials />
      <LoginPageContent.Divider />
      <LoginPageContent.Form />
    </div>
  );
}
