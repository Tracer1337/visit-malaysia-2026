import LocationDetails from '@/_components/LocationDetails';

export default async function HeroSectionLocationPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  return (
    <LocationDetails
      query={{
        location: 'Mersing',
        state: 'Johor',
        country: 'Malaysia',
      }}
    />
  );
}
