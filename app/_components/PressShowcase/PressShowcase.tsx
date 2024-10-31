import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography';

export function PressShowcase() {
  return (
    <>
      <Typography variant="h3" className="text-center">
        From The Press
      </Typography>
      <div className="flex justify-center items-start gap-3 mt-6">
        <Placeholder width={110} height={112} />
        <Placeholder width={141} height={105} />
        <Placeholder width={92} height={123} />
        <Placeholder width={112} height={90} />
        <Placeholder width={128} height={85} />
        <Placeholder width={160} height={92} />
      </div>
    </>
  );
}
