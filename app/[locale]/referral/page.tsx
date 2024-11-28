import { ReferralPageContent } from './_components/ReferralPageContent';

export default function RegisterReferralPage() {
  return (
    <div className="mx-auto sm:my-20 w-full max-w-screen-sm rounded-xl sm:border border-gray-300 pt-6 pb-9 px-4 sm:py-6 sm:px-[50px]">
      <ReferralPageContent.Title />
      <ReferralPageContent.Form />
    </div>
  );
}
