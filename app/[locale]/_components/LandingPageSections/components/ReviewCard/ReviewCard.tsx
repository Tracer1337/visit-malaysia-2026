import Placeholder from '@/_components/Placeholder';
import Typography from '@/_components/Typography';
import LocationIcon from '@/_lib/svg/LocationIcon';
import TrustpilotStarIconFilled from '@/_lib/svg/TrustpilotStarIconFilled';
import TrustpilotStarIconOutlined from '@/_lib/svg/TrustpilotStarIconOutlined';

export function ReviewCard() {
  return (
    <div className="max-w-[277px] rounded-xl bg-white px-6 py-4 xl:max-w-[320px]">
      <div className="flex items-center">
        <Placeholder width={62} height={62} className="mr-4" />
        <div>
          <Typography variant="body1" className="font-semibold">
            Ousman T
          </Typography>
          <div className="mt-1 flex">
            <LocationIcon className="mr-1 opacity-60" />
            <Typography variant="body1" className="font-semibold opacity-75">
              Medan
            </Typography>
          </div>
        </div>
      </div>
      <Typography variant="body1" className="mt-4 opacity-75" element="p">
        Great tool. Epic made it simple and managed to tie a full 5 day itinery.
        Everything is great. Back for a day and I’m planning now our next
      </Typography>
      <div className="mt-4 flex">
        <TrustpilotStarIconOutlined className="mr-4" />
        <TrustpilotStarIconFilled className="mr-2" />
        <TrustpilotStarIconFilled className="mr-2" />
        <TrustpilotStarIconFilled className="mr-2" />
        <TrustpilotStarIconFilled className="mr-2" />
        <TrustpilotStarIconFilled />
      </div>
    </div>
  );
}
