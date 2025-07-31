'use client';
import { ReactNode } from 'react';

export function DashboardContainer({ children }: { children: ReactNode }) {
  // const { setBreadcrumbs } = useBreadcrumbsContext();

  // useEffect(() => {
  //   setBreadcrumbs([{ title: "Dashboard" }]);
  // }, [setBreadcrumbs]);

  return <div className="mt-12">{children}</div>;
}
