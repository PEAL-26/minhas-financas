import { HomeExcellent, HomeHero } from '@/components/templates/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: '',
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeExcellent />
    </>
  );
}
