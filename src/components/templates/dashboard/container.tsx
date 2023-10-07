"use client";
import { useBreadcrumbsContext } from "@/contexts/breadcrumbs-context";
import { ReactNode, useEffect } from "react";

export function DashboardContainer({ children }: { children: ReactNode }) {
  const { setBreadcrumbs } = useBreadcrumbsContext();

  useEffect(() => {
    setBreadcrumbs([{ title: "Dashboard" }]);
  }, [setBreadcrumbs]);
    
  return <>{children}</>;
}
