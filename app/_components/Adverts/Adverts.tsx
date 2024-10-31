import Placeholder from '../ui/Placeholder';

export function Adverts() {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-8">
      <Placeholder width={340} height={262} className="max-xl:w-full" />
      <Placeholder width={508} height={262} className="max-xl:w-full" />
      <Placeholder width={340} height={262} className="max-xl:w-full" />
    </div>
  );
}
