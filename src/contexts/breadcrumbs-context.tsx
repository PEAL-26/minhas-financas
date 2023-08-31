"use client";
import { ReactNode, createContext, useContext, useState } from "react";

type Page = {
  title: string;
  url?: string;
};

interface BreadcrumbsContextProps {
  pages: Page[];
  setBreadcrumbs(pages: Page[]): void;
}

const BreadcrumbsContext = createContext<BreadcrumbsContextProps>(
  {} as BreadcrumbsContextProps
);

export function BreadcrumbsProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<Page[]>([]);

  const setBreadcrumbs = (pages: Page[]) => {
    setPages(pages);
  };

  return (
    <BreadcrumbsContext.Provider value={{ pages, setBreadcrumbs }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}

export const useBreadcrumbsContext = (...pages: Page[]) => {
  const context = useContext(BreadcrumbsContext);

  if (!context) {
    throw new Error(
      "useBreadcrumbsContext deve ser usado dentro do BreadcrumbsProvider."
    );
  }

   context.setBreadcrumbs(pages);

  return context;
};
