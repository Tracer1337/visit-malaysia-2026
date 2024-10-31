import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography/Typography';

export default function DocumentationCarousel() {
  return (
    <>
      <Typography variant="h3" className="text-center">
        Our Fun Documentation
      </Typography>
      <div className="flex mt-6 gap-6">
        <Placeholder width={210} height={210} className="rounded-xl" />
        <Placeholder width={210} height={210} className="rounded-xl" />
        <Placeholder width={210} height={210} className="rounded-xl" />
      </div>
    </>
  );
}
