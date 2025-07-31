import { PageLayout } from '@/components/layouts/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transações',
  description: '',
};

export default function Page() {
  return (
    <PageLayout title={String(metadata.title)}>
      <></>
    </PageLayout>
  );
}

{
  /* Produto\Serviço | Descrição | Categoria | Prioridade | Tipo | Valor | Estado */
}
{
  /* 
    Produto\Serviço -> Contem o nome de todos produtos
    Descrição       -> os detalhes do produto
    Categoria       -> Alimentos | 
    Prioridade      -> Normal | Máxima | Mínima
    Tipo            -> Única | Diária | Mensal | Anual 
    Valor           -> 89898.99
*/
}
