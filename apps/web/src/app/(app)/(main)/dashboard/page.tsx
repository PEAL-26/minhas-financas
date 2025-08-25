import { PageLayout } from '@/components/layouts/page';
import { DataTable } from '@/components/ui/table/data';
import { MAIN_MENUS } from '@repo/constants/menus';
import { Button } from '@repo/ui/button';
import { ChevronRightIcon, EllipsisIcon } from '@repo/ui/lib/lucide';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: MAIN_MENUS.DASHBOARD.title,
  description: MAIN_MENUS.DASHBOARD.description,
};

function Badge() {
  return (
    <div className="w-fit rounded-full bg-green-100 px-4 text-center">
      <span className="text-xs font-medium text-green-600">10 %</span>
    </div>
  );
}

export default function Page() {
  return (
    <PageLayout title={String(metadata.title)} description={String(metadata?.description || '')}>
      <div className="flex gap-3">
        {/* LEFT */}
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex w-full gap-3">
            <div className="w-full rounded-[16px] border p-4">
              <p className="mb-3 text-sm text-foreground">Renda Total</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-foreground">$ 1.0000 </p>
                <Badge />
              </div>
            </div>
            <div className="w-full rounded-[16px] border p-4">
              <p className="mb-3 text-sm text-foreground">Despesas Total</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-foreground">$ 1.0000 </p>
                <Badge />
              </div>
            </div>
            <div className="w-full rounded-[16px] border p-4">
              <p className="mb-3 text-sm text-foreground">Despesas Total</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-foreground">$ 1.0000 </p>
                <Badge />
              </div>
            </div>
          </div>

          <div className="flex min-h-[280px] w-full rounded-[16px] border p-4">
            <span className="mb-3 text-xs font-medium text-foreground">Meu Saldo</span>
            <div className="mt-4 flex">Graph</div>
          </div>

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
          <div className="flex w-full flex-col rounded-[16px] border p-4">
            <div className="flex items-center justify-between">
              <span className="mb-3 text-xs font-medium text-foreground">Transações Recentes</span>
              <Button variant="default" className="gap-1 px-2 py-1 text-xs">
                Todas
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
            <div className="flex">
              <DataTable
                //response={{} as any}
                fields={[
                  { name: 'transaction', title: 'Transação' },
                  { name: 'date', title: 'Data' },
                  { name: 'amount', title: "Montante" },
                  { name: 'status', title: "Estado" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[320px]">
          <div className="flex flex-col rounded-[16px] border p-4">
            <div className="flex items-center justify-between">
              <span className="mb-3 text-xs font-medium text-foreground">Meu Saldo</span>
              <Button variant="ghost">
                <EllipsisIcon className="size-4 text-black" />
              </Button>
            </div>
            <div className="flex items-center gap-10">
              <p className="text-2xl font-bold text-foreground">$ 1.0000 </p>
              <Badge />
            </div>
            <span className="text-[10px] text-foreground">
              You made an extra <span className="font-medium text-green-600">$ 1 000,00</span> this
              month
            </span>
            <div className="my-4 h-0 w-full border-b" />
            <span className="mb-3 text-xs font-medium text-foreground">Minhas Carteiras</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
