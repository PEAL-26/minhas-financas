interface TableEmptyProps {
  colSpan?: number;
}

export function TableEmpty(props: TableEmptyProps) {
  const { colSpan } = props;

  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="flex h-20 w-full flex-1 items-center justify-center">
          <span className="text-center">Não possui nenhum registo!</span>
        </div>
      </td>
    </tr>
  );
}
