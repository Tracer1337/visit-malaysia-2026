import Typography from '@/_components/Typography';
import { Link } from '@/_lib/i18n/routing';

export function NotFoundPage() {
  return (
    <div className="container mx-auto my-20">
      <Typography variant="h3">Not Found</Typography>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
