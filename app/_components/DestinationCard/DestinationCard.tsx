import Placeholder from '../ui/Placeholder';

export default function DestinationCard() {
  return (
    <div className="w-[278px] shadow-sm shadow-[#A6AFC366]">
      <div className="relative">
        <Placeholder width={278} height={292} />
        <div className="absolute top-0 left-0 px-2.5 py-1 bg-[#F24949] rounded-br-md">
          <span className="font-semibold text-white">Editor Selected</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <div className="px-2.5 py-1 bg-[#2A3075] rounded-[4px]">
            <span className="text-sm text-white">Hannisa Travelers</span>
          </div>
          <Placeholder width={24} height={24} />
        </div>
        <div className="mt-3">
          <p className="font-semibold text-lg leading-[24px] text-[#0B0B0B]">
            Trail visit for the mysterious Prince of Peace
          </p>
          <p className="mt-2 text-[#637381] text-xs leading-[18px] line-clamp-2">
            Witness the sacred monkey guardians keep the world’s biggest cave
            temple alive and make your wishes come true.
          </p>
        </div>
        <div className="flex justify-between mt-3 items-center">
          <span className="text-sm opacity-70">4.5/5 Ratings</span>
          <div className="flex gap-1.5">
            <Placeholder width={22} height={22} />
            <Placeholder width={22} height={22} />
            <Placeholder width={22} height={22} />
            <Placeholder width={22} height={22} />
            <Placeholder width={22} height={22} />
          </div>
        </div>
      </div>
    </div>
  );
}
