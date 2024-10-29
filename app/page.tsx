import Adverts from './_components/Adverts';
import AIGuide from './_components/AIGuide';

export default function LandingPage() {
  return (
    <main>
      <div className="bg-[#F7F9FA] flex justify-center rounded-t-3xl -mt-6">
        <div className="my-20 max-w-[715px] w-full">
          <AIGuide />
        </div>
      </div>
      <div className="container mt-20">
        <Adverts />
      </div>
    </main>
  );
}
