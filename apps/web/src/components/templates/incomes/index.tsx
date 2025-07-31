'use client';
//import { useModalContext } from '@/contexts/modal-context';
import { useLogicTable } from '@/hooks/use-table';
import { listarTodasRendas } from '@/services/rendas';
import { useQuery } from '@tanstack/react-query';

export function Rendas() {
  //const { showModalRegisto } = useModalContext();
  // const { setBreadcrumbs } = useBreadcrumbsContext();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['rendas'],
    queryFn: () => listarTodasRendas(),
  });

  const { currentPage, paginatedData, total, totalPages, handleFilter, handlePageChange } =
    useLogicTable({ data: data || [], itemsPerPage: 10 });

  const handleAddRenda = () => {
    //showModalRegisto('Adicionar renda', <FormularioRegistoRenda />);
  };

  // useEffect(() => {
  //   setBreadcrumbs([{ title: "Dashboard", url: "/" }, { title: "Rendas" }]);
  // }, [setBreadcrumbs]);

  if (isError) return null;

  return <></>;
}
