import Placeholder from '../ui/Placeholder';
import Typography from '../ui/Typography';

export function EventCard() {
  return (
    <div className="shadow-lg p-4 max-w-[336px] bg-white rounded-xl">
      <div className="grid grid-cols-[116px_minmax(0,_1fr)] grid-rows-1">
        <Placeholder width={116} height={116} />
        <div className="pl-6">
          <div className="flex items-center">
            <Placeholder width={18} height={18} className="mr-1" />
            <Typography variant="body2" className="font-semibold opacity-75">
              Kuala Lumpur
            </Typography>
          </div>
          <Typography variant="body3" className="opacity-75 mt-1" element="p">
            29 October 2024
          </Typography>
          <Typography variant="body1" className="font-semibold mt-" element="p">
            Buka Pusa
          </Typography>
          <Typography variant="body2" className="opacity-75" element="p">
            Breakfast Together in KLCC Club
          </Typography>
        </div>
      </div>
      <Typography variant="body3" className="mt-3 opacity-75" element="p">
        More than 2000 communities join in a huge break-fast at the Royal Palace
        .....
      </Typography>
    </div>
  );
}
