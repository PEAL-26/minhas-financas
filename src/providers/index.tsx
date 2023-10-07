"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "@/libs/material-tailwind";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertProvider } from "@/contexts/alert-context";
import { ModalProvider } from "@/contexts/modal-context";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AlertProvider>
          <ModalProvider>{children}</ModalProvider>
        </AlertProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
