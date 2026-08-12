import BookScene from '@components/BookScene';
import MobileBanner from '@components/MobileBanner';
import SquiggleFilters from '@components/SquiggleFilters';

export default function Page() {
  return (
    <>
      <BookScene />
      <SquiggleFilters />
      <MobileBanner />
    </>
  );
}
