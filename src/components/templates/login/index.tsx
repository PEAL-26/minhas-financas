"use client";
import { ReactNode } from "react";

export function LoginForm({ children }: { children: ReactNode }) {
  return <form>{children}</form>;
}
