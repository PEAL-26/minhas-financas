import { ReactNode } from "react";

interface TableContainerProps {
  children: ReactNode;
}

export function TableContainer(props: TableContainerProps) {
  const { children } = props;
  return <>{children}</>;
}
