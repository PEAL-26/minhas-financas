import { HomeExcellent, HomeHeader, HomeHero } from '@/components/templates/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: '',
};

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <HomeHeader />
      <HomeHero />
      <HomeExcellent />
    </div>
  );
}
