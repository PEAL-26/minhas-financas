import { Necessidades } from '@/components/templates/necessidades';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Necessidades',
  description: '',
};

export default function NecessidadesPage() {
  return (
    <>
      <Necessidades />
    </>
  );
}
