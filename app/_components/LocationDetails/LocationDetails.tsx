import { fetchLocationDetails } from '@/_lib/halaltravel/location/details';
import { fetchLocationBlog } from '@/_lib/halaltravel/location/blog';
import LocationCard from '../LocationCard';
import Typography from '../ui/Typography';

export async function LocationDetails({
  query,
}: {
  query: {
    location: string;
    state: string;
    country: string;
  };
}) {
  const [details, blog] = await Promise.all([
    fetchLocationDetails(query),
    fetchLocationBlog(query),
  ]);

  return (
    <>
      <div className="mt-4 xl:-mt-[67px] h-[396px] xl:h-[661px] bg-slate-500">
        <div className="container mx-auto pt-[60px] xl:pt-[230px]">
          <Typography variant="h1" className="text-white xl:max-w-[60%]">
            {details.title}
          </Typography>
        </div>
      </div>
      <div className="container mx-auto mt-4 xl:flex xl:gap-[42px] xl:mt-[46px]">
        <div>
          <Typography variant="body1" element="p" className="mb-8">
            {details.summary}
          </Typography>
          <Typography variant="body1" element="p">
            {details.blog}
          </Typography>
        </div>
        <div className="max-xl:mt-[42px] min-w-[278px]">
          <Typography variant="h3">Top Recommend Itineraries</Typography>
          <div className="mt-6 flex xl:flex-col gap-6 max-xl:overflow-x-hidden">
            {blog.content.map((content) => (
              <LocationCard
                key={content.id}
                data={{
                  title: content.title,
                  description: content.description,
                  coverImg: null,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
