import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography';

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
            <Placeholder width={20} height={20} className="mr-1" />
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
        <Placeholder width={30} height={30} className="mr-4" />
        <Placeholder width={30} height={30} className="mr-2" />
        <Placeholder width={30} height={30} className="mr-2" />
        <Placeholder width={30} height={30} className="mr-2" />
        <Placeholder width={30} height={30} className="mr-2" />
        <Placeholder width={30} height={30} />
      </div>
    </div>
  );
}
