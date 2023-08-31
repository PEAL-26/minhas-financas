import {
  AveragePurchaseEachProduct,
  TotalMonthlyExpenses,
} from "@/components/templates/dashboard";
import { Despesas } from "@/components/templates/dashboard/despesas";
import { Necessidades } from "@/components/templates/dashboard/necessidades";
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
