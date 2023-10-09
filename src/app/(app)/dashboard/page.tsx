import {
  AveragePurchaseEachProduct,
  DashboardContainer,
  DashboardStatisticsCards,
  TotalMonthlyExpenses,
  Despesas,
  Necessidades,
  DashboardStatisticsChart,
} from "@/components/templates/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default function Dashboard() {
  return (
    <DashboardContainer>

      <DashboardStatisticsCards />

      {/* <DashboardStatisticsChart /> */}

      {/* Total de despesas Mensal*/}
      {/* <TotalMonthlyExpenses /> */}

      {/* Media de compra de cada produto */}
      {/* <AveragePurchaseEachProduct /> */}

      {/* Necessidades */}
      {/* <Necessidades /> */}

      {/* Despesas */}
      <Despesas />
    </DashboardContainer>
  );
}
