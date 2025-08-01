export function paginateData<T>(
  data: T[],
  { totalItems, page, limit }: { totalItems: number; page: number; limit: number },
) {
  // Calcular o total de itens e o total de páginas
  const totalPages = Math.ceil(totalItems / limit);

  // Garantir que a página solicitada esteja dentro dos limites
  const currentPage = Math.max(1, Math.min(page, totalPages));

  // Calcular o índice inicial e final para a página atual
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  // Obter os dados da página atual
  const pageData = data.slice(startIndex, endIndex);

  // Definir páginas anterior e próxima
  const prev = currentPage > 1 ? currentPage - 1 : null;
  const next = currentPage < totalPages ? currentPage + 1 : null;

  // Retornar o resultado no formato especificado
  return {
    data: pageData,
    totalItems,
    totalPages,
    currentPage,
    prev,
    next,
  };
}
