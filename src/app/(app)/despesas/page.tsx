import { MainContent } from "@/components/despesas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Despesas",
  description: "",
};

export default function DespesasPage() {
  return (
    <>
      <MainContent />
    </>
  );
}
