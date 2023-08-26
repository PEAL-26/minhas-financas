import {
  AveragePurchaseEachProduct,
  TotalMonthlyExpenses,
} from "@/components/dashboard";
import { Despesas } from "@/components/dashboard/despesas";
import { Necessidades } from "@/components/dashboard/necessidades";

export default function Dashboard() {
  return (
    <main className="flex flex-col items-center justify-center p-10">
      <h2 className="mb-10 text-center text-lg font-bold">Dashboard</h2>
      {/* Total de despesas Mensal*/}
      <TotalMonthlyExpenses />

      {/* Media de compra de cada produto */}
      <AveragePurchaseEachProduct />

      {/* Necessidades */}
      <Necessidades />

      {/* Despesas */}
      <Despesas />
    </main>
  );
}
