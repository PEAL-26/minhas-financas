import { PageLayout } from '@/components/layouts/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: '',
};

export default function Page() {
  return (
    <PageLayout title="Dashboard">
      <>
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
      </>
    </PageLayout>
  );
}
