import LocationIcon from '@/_lib/svg/LocationIcon';
import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography';
import TrustpilotStarIconFilled from '@/_lib/svg/TrustpilotStarIconFilled';
import TrustpilotStarIconOutlined from '@/_lib/svg/TrustpilotStarIconOutlined';

export function ReviewCard() {
  return (
    <div className="px-6 py-4 rounded-xl bg-white max-w-[277px] xl:max-w-[320px]">
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
      <Typography variant="body1" className="opacity-75 mt-4" element="p">
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
