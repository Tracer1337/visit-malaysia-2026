import { ReferralPageContent } from '@/[locale]/referral/_components/ReferralPageContent';
import Dialog from '@/_components/Dialog';

export default function ReferralModalPage() {
  return (
    <Dialog title={<ReferralPageContent.Title />} closeButtonVariant="none">
      <ReferralPageContent.Form />
    </Dialog>
  );
}
