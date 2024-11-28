import { ForgotPasswordPageContent } from './_components/ForgotPasswordPageContent';

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto sm:my-20 w-full max-w-screen-sm rounded-xl sm:border border-gray-300 pt-6 pb-9 px-4 sm:py-6 sm:px-[50px]">
      <ForgotPasswordPageContent.Title />
      <ForgotPasswordPageContent.Form />
    </div>
  );
}
