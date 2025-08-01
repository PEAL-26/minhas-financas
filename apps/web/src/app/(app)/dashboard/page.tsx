import { PageLayout } from '@/components/layouts/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: '',
};

export default function Page() {
  return (
    <PageLayout title="Dashboard">
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex w-full gap-3">
            <div className="w-full rounded-[16px] border p-3">
              <p>Renda Total</p>
              <p>$ 1.0000 </p>
            </div>
            <div className="w-full rounded-[16px] border p-3">
              <p>Despesas Total</p>
              <p>$ 1.0000 </p>
            </div>
            <div className="w-full rounded-[16px] border p-3">
              <p>Despesas Total</p>
              <p>$ 1.0000 </p>
            </div>
          </div>

          <div className="flex w-full rounded-[16px] border p-3">Performance</div>
          <div className="flex w-full rounded-[16px] border p-3">Transações recentes</div>
        </div>
        <div className="w-60">
          <div className="flex rounded-[16px] border p-3">
            <p>Meu Saldo</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
