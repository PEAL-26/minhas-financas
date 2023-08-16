import {
  AveragePurchaseEachProduct,
  TotalMonthlyExpenses,
} from "@/components/dashboard";

export default function Dashboard() {
  return (
    <main className="flex flex-col items-center justify-center p-10">
      <h2 className="mb-10 text-center text-lg font-bold">Dashboard</h2>
      {/* Total de gastos Mensal*/}
      <TotalMonthlyExpenses />
      {/* Media de compra de cada produto */}
      <AveragePurchaseEachProduct />
    </main>
  );
}
