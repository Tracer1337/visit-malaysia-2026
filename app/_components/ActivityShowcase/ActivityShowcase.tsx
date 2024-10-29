import Placeholder from '../ui/Placeholder';

export default function ActivityShowcase() {
  return (
    <div className="grid grid-cols-2 grid-rows-1 items-center">
      <div className="max-w-[600px] justify-self-end">
        <p className="font-semibold text-lg leading-[18px] text-[#0A1B74] uppercase">
          ACTIVITIES : HIGHLIGHT OF THE MONTH
        </p>
        <h2 className="text-heading font-bold text-[38px] leading-[46px] mt-3 capitalize">
          Bread softer than cotton cloud
        </h2>
        <p className="mt-3 opacity-70">
          Fancy homemade fresh and halal TangZhong bread ? Join Rosli’s bakery
          class 24/5 and 28/5 and master the secret in creating these pillow
          soft bread roll
        </p>
        <div className="flex items-center mt-3">
          <Placeholder width={24} height={24} className="mr-2" />
          <span className="text-lg leading-[24px]">
            I’m interested. <span className="underline">Find out more</span>
          </span>
        </div>
        <div className="flex items-center mt-3">
          <Placeholder width={24} height={24} className="mr-2" />
          <span className="text-lg leading-[24px]">
            Show me other ideas around Kuala Lumpur
          </span>
        </div>
      </div>
      <Placeholder width={469} height={373} className="ml-14" />
    </div>
  );
}
