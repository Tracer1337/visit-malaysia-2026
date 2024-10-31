import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography/Typography';

export default function ActivityShowcase() {
  return (
    <div className="grid grid-cols-2 grid-rows-1 items-center">
      <div className="max-w-[600px] justify-self-end">
        <Typography
          variant="body1"
          className="font-semibold text-[#0A1B74] uppercase"
          element="p"
        >
          ACTIVITIES : HIGHLIGHT OF THE MONTH
        </Typography>
        <Typography variant="h2" className="mt-3 capitalize">
          Bread softer than cotton cloud
        </Typography>
        <Typography variant="body2" className="opacity-75 mt-3" element="p">
          Fancy homemade fresh and halal TangZhong bread ? Join Rosli’s bakery
          class 24/5 and 28/5 and master the secret in creating these pillow
          soft bread roll
        </Typography>
        <div className="flex items-center mt-3">
          <Placeholder width={24} height={24} className="mr-2" />
          <Typography variant="body1">
            I’m interested. <span className="underline">Find out more</span>
          </Typography>
        </div>
        <div className="flex items-center mt-3">
          <Placeholder width={24} height={24} className="mr-2" />
          <Typography variant="body1">
            Show me other ideas around Kuala Lumpur
          </Typography>
        </div>
      </div>
      <Placeholder width={469} height={373} className="ml-14" />
    </div>
  );
}
