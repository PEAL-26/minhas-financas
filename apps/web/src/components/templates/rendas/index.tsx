'use client';
import { ButtonDefault } from '@/components/ui/button-default';
import { Container } from '@/components/ui/container';
import { Table } from '@/components/ui/table';
import { useModalContext } from '@/contexts/modal-context';
import { formatCurrencyKz } from '@/helpers/format-number';
import { useLogicTable } from '@/hooks/use-table';
import { listarTodasRendas } from '@/services/rendas';
import { useQuery } from '@tanstack/react-query';
import { AiOutlinePlus } from 'react-icons/ai';

import { FormularioRegistoRenda } from './formulario-registo';
import { MenuActions } from './menu-actions';

export function Rendas() {
  const { showModalRegisto } = useModalContext();
  // const { setBreadcrumbs } = useBreadcrumbsContext();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['rendas'],
    queryFn: () => listarTodasRendas(),
  });

  const { currentPage, paginatedData, total, totalPages, handleFilter, handlePageChange } =
    useLogicTable({ data: data || [], itemsPerPage: 10 });

  const handleAddRenda = () => showModalRegisto('Adicionar renda', <FormularioRegistoRenda />);

  // useEffect(() => {
  //   setBreadcrumbs([{ title: "Dashboard", url: "/" }, { title: "Rendas" }]);
  // }, [setBreadcrumbs]);

  if (isError) return null;

  return (
    <Container.Root>
      <Container.Header title="Rendas">
        <ButtonDefault icon={AiOutlinePlus} onClick={handleAddRenda} className="p-2.5" />
      </Container.Header>
      <Container.Body>
        <Table.Root>
          <Table.Header cols={['Descrição', 'Tipo', 'Moeda', 'Valor', '']} />
          <Table.Body>
            {isLoading && <Table.Loading cols={7} rows={10} />}
            {paginatedData.map((renda, index) => (
              <Table.Row key={index}>
                <Table.Data data={renda.descricao} />
                <Table.Data data={renda.tipo} />
                <Table.Data data={renda.moeda} />
                <Table.Data data={formatCurrencyKz(renda.valor)} />
                <Table.Data className="w-fit">
                  <MenuActions id={renda.id || ''} />
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
