import {
  AveragePurchaseEachProduct,
  TotalMonthlyExpenses,
} from "@/components/dashboard";
import { Despesas } from "@/components/dashboard/despesas";
import { Necessidades } from "@/components/dashboard/necessidades";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default function Dashboard() {
  return (
    <>
      {/* Total de despesas Mensal*/}
      <TotalMonthlyExpenses />

      {/* Media de compra de cada produto */}
      <AveragePurchaseEachProduct />

      {/* Necessidades */}
      <Necessidades />

      {/* Despesas */}
      <Despesas />
    </>
  );
}
