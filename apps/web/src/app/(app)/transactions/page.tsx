import { PageLayout } from '@/components/layouts/page';
import { ListTransactionsActions } from '@/components/templates/transactions/actions';
import { ListTransactionsTemplate } from '@/components/templates/transactions/list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transações',
  description: '',
};

export default function Page() {
  return (
    <PageLayout
      title={String(metadata.title)}
      description={String(metadata?.description || '')}
      actions={<ListTransactionsActions />}
    >
      <ListTransactionsTemplate />
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
