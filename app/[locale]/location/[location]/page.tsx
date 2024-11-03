import LocationDetails from '@/_components/LocationDetails';

export default async function LocationDetailsPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;

  return (
    <main>
      <LocationDetails location={location} />
    </main>
  );
}
