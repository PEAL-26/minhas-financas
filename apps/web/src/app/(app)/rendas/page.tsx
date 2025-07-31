import { Rendas } from '@/components/templates/rendas';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rendas',
  description: '',
};

export default function RendasPage() {
  return (
    <>
      <Rendas />
    </>
  );
}
