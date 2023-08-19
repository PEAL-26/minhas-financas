import { MainContent } from "@/components/main-content";
import Link from "next/link";

export default function DespesasPage() {
  return (
    <main className="flex flex-col items-center justify-center p-10">
      <h2 className="mb-10 text-center text-lg font-bold">Despesas</h2>
      <MainContent />
    </main>
  );
}
