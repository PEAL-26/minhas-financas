import { PageLayout } from '@/components/layouts/page';
import { MAIN_MENUS } from '@repo/constants/menus';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: MAIN_MENUS.DASHBOARD.title,
  description: MAIN_MENUS.DASHBOARD.description,
};

export default function Page() {
  return (
    <PageLayout title={String(metadata.title)} description={String(metadata?.description || '')}>
      <div className="flex gap-3">
        {/* LEFT */}
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

          <div className="flex gap-2">
            <button className="rounded-full border bg-primary px-2 py-1 text-sm font-medium text-white transition-all duration-300 hover:bg-primary hover:text-white">
              Transações
            </button>
            <button className="rounded-full border px-2 py-1 text-sm font-medium transition-all duration-300 hover:bg-primary hover:text-white">
              Rendas
            </button>
            <button className="rounded-full border px-2 py-1 text-sm font-medium transition-all duration-300 hover:bg-primary hover:text-white">
              Despesas
            </button>
          </div>
          <div className="flex w-full rounded-[16px] border p-3">Transações recentes</div>
        </div>

        {/* RIGHT */}
        <div className="w-60">
          <div className="flex flex-col rounded-[16px] border p-3">
            <p>Meu Saldo</p>
            <span>9959999</span>
            <div className="h-0 w-full border-b" />
            <span>Minha Carteira</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
