import ReviewCard from '../ReviewCard';
import Typography from '../ui/Typography';

export function ReviewCarousel() {
  return (
    <>
      <Typography variant="h3" className="text-center">
        Our Review
      </Typography>
      <Typography variant="h5" className="mt-2 text-center opacity-70">
        We’ve 4.7/5 Positive Reviews From Several Credential Reviewers Platform
      </Typography>
      <div className="flex gap-6 mt-6">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </>
  );
}
