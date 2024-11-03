import LocationDetails from '@/_components/LocationDetails';

export default async function HeroSectionLocationPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  return <LocationDetails location={name} />;
}
