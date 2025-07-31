import { Metadata } from 'next';

import { MainContent } from '@/components/templates/despesas';

export const metadata: Metadata = {
  title: 'Despesas',
  description: '',
};

export default function DespesasPage() {
  return (
    <>
      <MainContent />
    </>
  );
}
