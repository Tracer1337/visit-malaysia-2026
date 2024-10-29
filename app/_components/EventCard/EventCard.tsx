import Placeholder from '../ui/Placeholder';

export default function EventCard() {
  return (
    <div className="shadow-lg p-4 max-w-[336px] bg-white rounded-xl">
      <div className="grid grid-cols-[116px_minmax(0,_1fr)] grid-rows-1">
        <Placeholder width={116} height={116} />
        <div className="pl-6">
          <div className="flex items-center">
            <Placeholder width={18} height={18} className="mr-1" />
            <span className="font-semibold opacity-75">Kuala Lumpur</span>
          </div>
          <p className="text-sm leading-[18px] opacity-75 mt-1">
            29 October 2024
          </p>
          <p className="font-semibold text-lg leading-[24px] mt-1">
            Buka Puasa
          </p>
          <p className="opacity-75 leading-[20px]">
            Breakfast Together in KLCC Club
          </p>
        </div>
      </div>
      <p className="text-sm leading-[18px] oapcity-75 mt-3">
        More than 2000 communities join in a huge break-fast at the Royal Palace
        .....
      </p>
    </div>
  );
}
