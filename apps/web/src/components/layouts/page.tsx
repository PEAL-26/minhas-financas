import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export function PageLayout(props: Props) {
  const { title, children } = props;
  return (
    <>
      <h1>{title}</h1>

      <div>{children}</div>
    </>
  );
}
