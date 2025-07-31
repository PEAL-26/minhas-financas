'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

interface SidebarContextProps {
  isOpen: boolean;
  open(): void;
  close(): void;
}

const SidebarContext = createContext<SidebarContextProps>({} as SidebarContextProps);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, open, close }}>{children}</SidebarContext.Provider>
  );
}

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebarContext deve ser usado dentro do SidebarProvider.');
  }

  return context;
};
