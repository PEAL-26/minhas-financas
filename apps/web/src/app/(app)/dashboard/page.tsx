import { DashboardContainer } from '@/components/templates/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: '',
};

export default function Dashboard() {
  return (
    <DashboardContainer>
      {/* <DashboardStatisticsCards /> */}

      {/* <DashboardStatisticsChart /> */}

      {/* TODO Calendário */}

      {/* Total de despesas Mensal*/}
      {/* <TotalMonthlyExpenses /> */}

      {/* Media de compra de cada produto */}
      {/* <AveragePurchaseEachProduct /> */}

      {/* Necessidades */}
      {/* <Necessidades /> */}

      {/* Despesas */}
      {/* <Despesas /> */}
    </DashboardContainer>
  );
}
