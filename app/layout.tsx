import './globals.css';

export default async function PassthroughLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
