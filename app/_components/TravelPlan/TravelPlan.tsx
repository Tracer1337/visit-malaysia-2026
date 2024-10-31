import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography/Typography';

export default function TravelPlan() {
  return (
    <div className="grid grid-cols-2 grid-rows-1 items-center">
      <div className="max-w-[600px] justify-self-end mr-12">
        <Typography
          variant="body1"
          className="font-semibold text-white uppercase"
          element="p"
        >
          EDITORS’ CHOICE : TRAVEL PLAN
        </Typography>
        <Typography variant="h2" className="mt-3 capitalize text-white">
          Sipadan : Beauty beyond words
        </Typography>
        <Typography
          variant="body2"
          className="opacity-75 mt-3 text-white"
          element="p"
        >
          Farah has been dreaming to go to Sipadan. So when Ahmed surprised her
          with this birthday trip, she didn’t think
        </Typography>

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
              <Typography variant="body2" className="font-semibold text-shite">
                Tried & Tested
              </Typography>
            </div>
          </div>
          <div className="p-4">
            <Typography variant="h4">Sed ut perspiciatis unde omnis</Typography>
            <Typography variant="body1" className="mt-4 opacity-75" element="p">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
