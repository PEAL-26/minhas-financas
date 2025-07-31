'use client';
import { ButtonDefault } from '@/components/ui/button-default';
import { Container } from '@/components/ui/container';
import { Table } from '@/components/ui/table';
import { useBreadcrumbsContext } from '@/contexts/breadcrumbs-context';
import { useModalContext } from '@/contexts/modal-context';
import { formatCurrencyKz } from '@/helpers/format-number';
import { useLogicTable } from '@/hooks/use-table';
import {
  getTipoNecessidadeValue,
  listarTodasNecessidades,
  prioridadeToString,
} from '@/services/necessidades';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FormularioRegistoNecessidade } from './formulario-registo';
import { MenuActions } from './menu-actions';

export function Necessidades() {
  const { showModalRegisto } = useModalContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['necessidades'],
    queryFn: () =>
      listarTodasNecessidades({
        orderBy: [['prioridade', 'desc']],
      }),
  });

  const { currentPage, paginatedData, total, totalPages, handleFilter, handlePageChange } =
    useLogicTable({ data: data || [], itemsPerPage: 10 });

  const handleAddNecessidade = () =>
    showModalRegisto('Adicionar necessidade', <FormularioRegistoNecessidade />);

  useEffect(() => {
    setBreadcrumbs([{ title: 'Dashboard', url: '/' }, { title: 'Necessidades' }]);
  }, [setBreadcrumbs]);

  if (isError) return null;

  return (
    <Container.Root>
      <Container.Header title="Necessidades">
        <ButtonDefault icon={AiOutlinePlus} onClick={handleAddNecessidade} className="p-2.5" />
      </Container.Header>
      <Container.Body>
        <Table.Root>
          <Table.Header
            cols={['Item', 'Descrição', 'Categoria', 'Prioridade', 'Tipo', 'Valor', '']}
          />
          <Table.Body>
            {isLoading && <Table.Loading cols={7} rows={10} />}
            {paginatedData.map((necessidade, index) => (
              <Table.Row key={index}>
                <Table.Data data={necessidade.item} />
                <Table.Data data={necessidade.descricao} />
                <Table.Data data={necessidade.categoria} />
                <Table.Data>
                  <span
                    data-prioridade={necessidade.prioridade.toString()}
                    className="w-20 rounded p-2 text-white data-[prioridade='0']:bg-orange-500 data-[prioridade='1']:bg-green-500 data-[prioridade='2']:bg-red-500"
                  >
                    {prioridadeToString(necessidade.prioridade)}
                  </span>
                </Table.Data>
                <Table.Data>{getTipoNecessidadeValue(necessidade.tipo, 'display')}</Table.Data>
                <Table.Data data={formatCurrencyKz(necessidade.valor)} />
                <Table.Data>
                  <MenuActions id={necessidade.id || ''} />
                </Table.Data>
              </Table.Row>
            ))}
          </Table.Body>
          {!isLoading && (
            <Table.Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              colSpan={7}
            />
          )}
        </Table.Root>
      </Container.Body>
    </Container.Root>
  );
}
