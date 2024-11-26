import { LoginPageContent } from './_components/LoginPageContent';

export default function LoginPage() {
  return (
    <div className="mx-auto sm:my-20 w-full max-w-screen-sm rounded-xl sm:border border-gray-300 pt-6 pb-9 px-4 sm:py-6 sm:px-[50px]">
      <LoginPageContent.Title />
      <LoginPageContent.Socials />
      <LoginPageContent.Divider />
      <LoginPageContent.Form />
    </div>
  );
}
