import Placeholder from '../ui/Placeholder';

export default function TravelPlan() {
  return (
    <div className="grid grid-cols-2 grid-rows-1 items-center">
      <div className="max-w-[600px] justify-self-end mr-12">
        <p className="font-semibold text-lg leading-[18px] text-white uppercase">
          EDITORS’ CHOICE : TRAVEL PLAN
        </p>
        <h2 className="text-heading font-bold text-[38px] leading-[46px] text-white mt-3 capitalize">
          Sipadan : Beauty beyond words
        </h2>
        <p className="mt-3 opacity-70 text-white">
          Farah has been dreaming to go to Sipadan. So when Ahmed surprised her
          with this birthday trip, she didn’t think
        </p>
        <div className="flex gap-2 mt-3">
          <Placeholder width={181} height={130} />
          <Placeholder width={181} height={130} />
          <Placeholder width={181} height={130} />
        </div>
        <div className="flex gap-2 mt-3">
          <Placeholder width={181} height={130} />
          <Placeholder width={181} height={130} />
          <Placeholder width={181} height={130} />
        </div>
      </div>
      <div>
        <div className="w-[552px] bg-white ml-6">
          <div className="relative">
            <Placeholder width={552} height={322} />
            <div className="absolute top-0 left-0 px-2.5 py-1 bg-[#F24949] rounded-br-md">
              <span className="font-semibold text-white">Tried & Tested</span>
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-heading font-bold text-2xl leading-[28px]">
              Sed ut perspiciatis unde omnis
            </h4>
            <p className="mt-4 opacity-75 text-lg leading-[24px]">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
