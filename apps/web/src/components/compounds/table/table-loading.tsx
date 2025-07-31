interface TableLoadingProps {
  rows?: number;
  cols?: number;
}

export function TableLoading(props: TableLoadingProps) {
  const { rows = 5, cols = 8 } = props;

  return Array.from({ length: rows }).map((_, index) => (
    <tr key={index} className="">
      {Array.from({ length: cols }).map((_, index) => (
        <td key={index} className="animate-pulse px-4 pt-4">
          <div key={index} className="h-2.5 w-full rounded-full bg-gray-300" />
          <span className="sr-only">Loading...</span>
        </td>
      ))}
    </tr>
  ));
}
