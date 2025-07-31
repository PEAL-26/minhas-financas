'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { ButtonDefault } from '@/components/ui/button-default';
import { Container } from '@/components/ui/container';
import { Table } from '@/components/ui/table';
import { useBreadcrumbsContext } from '@/contexts/breadcrumbs-context';
import { useModalContext } from '@/contexts/modal';
import { formatCurrencyKz } from '@/helpers/currency';
import { useLogicTable } from '@/hooks/use-table';
import { listarTodosDespesas } from '@/services/despesas';

import { FormularioRegistoDespesa } from './formulario-registo';
import { MenuActions } from './menu-actions';

export function MainContent() {
  const { setBreadcrumbs } = useBreadcrumbsContext();

  const { showModalRegisto } = useModalContext();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['despesas'],
    queryFn: () =>
      listarTodosDespesas({
        orderBy: [['data', 'desc']],
      }),
  });

  const { currentPage, paginatedData, total, totalPages, handleFilter, handlePageChange } =
    useLogicTable({ data: data || [], itemsPerPage: 10 });

  const handleAddDespesa = () =>
    showModalRegisto('Adicionar despesa', <FormularioRegistoDespesa />);

  useEffect(() => {
    setBreadcrumbs([{ title: 'Dashboard', url: '/' }, { title: 'Despesas' }]);
  }, [setBreadcrumbs]);

  if (isError) return null;

  return (
    <Container.Root>
      <Container.Header title="Despesas">
        <ButtonDefault icon={AiOutlinePlus} onClick={handleAddDespesa} className="p-2.5" />
      </Container.Header>
      <Container.Body>
        <Table.Root>
          <Table.Header
            cols={['Descrição', 'Local', 'Data', 'Data de Término', 'Preço', 'Qtd', 'Total', '']}
          />
          <Table.Body>
            {isLoading && <Table.Loading cols={8} rows={10} />}
            {paginatedData.map((despesa, index) => (
              <Table.Row key={index}>
                <Table.Data data={despesa.descricao} />
                <Table.Data data={despesa.local} />
                <Table.Data data={despesa.data.toDateString()} />
                <Table.Data data={despesa.data_termino?.toDateString()} />
                <Table.Data data={formatCurrencyKz(despesa.preco)} />
                <Table.Data data={despesa.quantidade.toString()} />
                <Table.Data data={formatCurrencyKz(despesa.total)} />
                <Table.Data>
                  <MenuActions id={despesa.id} />
                </Table.Data>
              </Table.Row>
            ))}
          </Table.Body>
          {!isLoading && (
            <Table.Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              colSpan={8}
            />
          )}
        </Table.Root>
      </Container.Body>
    </Container.Root>
  );
}
