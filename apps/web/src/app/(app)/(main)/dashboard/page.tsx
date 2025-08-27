import { PageLayout } from '@/components/layouts/page';
import { MAIN_MENUS } from '@repo/constants/menus';
import { formatCurrency } from '@repo/helpers/currency';
import { formatDate } from '@repo/helpers/date';
import { dayjs } from '@repo/helpers/dayjs';
import { TRANSACTION_TYPE_MAP } from '@repo/types/transaction';
import { Badge } from '@repo/ui/badge';
import { Button, buttonVariants } from '@repo/ui/button';
import { ChartTooltipDefault } from '@repo/ui/chart-test';
import { IconComponent } from '@repo/ui/icon-component';
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EllipsisIcon,
  PiggyBankIcon,
} from '@repo/ui/lib/lucide';
import { cn } from '@repo/ui/lib/utils';
import { Separator } from '@repo/ui/separator';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: MAIN_MENUS.DASHBOARD.title,
  description: MAIN_MENUS.DASHBOARD.description,
};

function PercentageBadge() {
  return <Badge className="ml-2 bg-green-100 text-[10px] text-green-600">10%</Badge>;
}

const data = [
  {
    date: new Date(),
    amount: 10000,
    type: 'income' as const,
    description: 'Teste',
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    amount: 10000,
    type: 'income' as const,
    description: 'Teste',
  },
  {
    date: new Date('2024-01-26'),
    amount: 10000,
    type: 'income' as const,
    description: 'Teste',
  },
  {
    date: new Date('2024-01-01'),
    amount: 10000,
    type: 'income' as const,
    description: 'Teste',
  },
  {
    date: new Date('2024-01-02'),
    amount: 10000,
    type: 'expense' as const,
    description: 'Teste',
  },
  {
    date: new Date('2024-01-03'),
    amount: 10000,
    type: 'income' as const,
    description: 'Teste',
  },
  {
    date: new Date('2024-01-04'),
    amount: 10000,
    type: 'expense' as const,
    description: 'Teste',
  },
  {
    date: new Date('2024-01-05'),
    amount: 10000,
    type: 'income' as const,
    description: 'Teste',
  },
  {
    date: new Date('2024-02-03'),
    amount: 10000,
    type: 'income' as const,
    description: 'Teste',
  },
  {
    date: new Date('2024-02-04'),
    amount: 10000,
    type: 'expense' as const,
    description: 'Teste',
  },
  {
    date: new Date('2024-02-05'),
    amount: 10000,
    type: 'income' as const,
    description: 'Teste',
  },
];

export default function Page() {
  const dates = new Map();

  return (
    <PageLayout title={String(metadata.title)} description={String(metadata?.description || '')}>
      <div className="flex flex-col-reverse gap-3 lg:flex-row">
        {/* LEFT */}
        <div className="flex flex-1 flex-col gap-3">
          {/* SUMMARY */}
          <div className="flex w-full flex-col gap-3 md:flex-row">
            <div className="w-full rounded-[16px] border p-4">
              <p className="mb-3 text-[9px] text-foreground lg:text-xs">Renda Total</p>
              <div className="flex items-center justify-between">
                <p className="whitespace-nowrap text-xs font-bold text-foreground lg:text-sm">
                  $ 1.0000{' '}
                </p>
                <PercentageBadge />
              </div>
            </div>
            <div className="w-full rounded-[16px] border p-4">
              <p className="mb-3 text-[9px] text-foreground lg:text-xs">Despesas Total</p>
              <div className="flex items-center justify-between">
                <p className="whitespace-nowrap text-xs font-bold text-foreground lg:text-sm">
                  $ 1.0000{' '}
                </p>
                <PercentageBadge />
              </div>
            </div>
            <div className="w-full rounded-[16px] border p-4">
              <p className="mb-3 text-[9px] text-foreground lg:text-xs">Despesas Total</p>
              <div className="flex items-center justify-between">
                <p className="whitespace-nowrap text-xs font-bold text-foreground lg:text-sm">
                  $ 1.0000{' '}
                </p>
                <PercentageBadge />
              </div>
            </div>
          </div>

          {/* PERFORMANCE - CHART */}
          <div className="flex min-h-[280px] w-full flex-col rounded-[16px] border p-4">
            <div className="flex items-center justify-between">
              <span className="mb-3 text-sm font-medium text-foreground">Performance</span>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                  <span className="text-xs text-foreground">Renda</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-200"></div>
                  <span className="text-xs text-foreground">Despesas</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex h-full w-full">
              <ChartTooltipDefault />
            </div>
          </div>

          {/* TRANSACTIONS */}
          <div className="flex w-full flex-col rounded-[16px] border p-4">
            <div className="flex items-center justify-between">
              <span className="mb-3 text-xs font-medium text-foreground">Transações Recentes</span>
              <Link
                href="/transactions"
                className={cn(buttonVariants({ variant: 'default' }), 'gap-1 px-2 py-1 text-xs')}
              >
                Todas
                <ChevronRightIcon className="size-4" />
              </Link>
            </div>
            <div className="mt-3 flex w-full">
              <div className="flex w-full flex-col">
                {data.map((item, index) => {
                  const getDate = (date: Date | string) => {
                    const [year, month, day] = formatDate(date, 'YYYY-MM-DD').split('-');
                    return new Date(Number(year), Number(month) - 1, Number(day), 0, 0, 0, 0);
                  };

                  const isEqualData = (date: Date, compare: Date) => {
                    return getDate(date).getTime() === getDate(compare).getTime();
                  };

                  const now = new Date();
                  const date = new Date(item.date);
                  const isCurrentYear = now.getFullYear() === date.getFullYear();
                  const isToday = isEqualData(date, now);
                  const isOntem = dayjs(now).diff(date, 'day') === 1;

                  let weekDayFormat = 'dddd';
                  let dayKey = '';
                  if (isToday) {
                    weekDayFormat = '[hoje]';
                    dayKey = date.getDate().toString();
                  }
                  if (isOntem) {
                    dayKey = date.getDate().toString();
                    weekDayFormat = '[ontem]';
                  }

                  const format = `${weekDayFormat}, D [de] MMMM ${isCurrentYear ? '' : '[de] YYYY'}`;
                  const type = TRANSACTION_TYPE_MAP[item.type];
                  const operation = item.type === 'income' ? '+' : '-';

                  const key = `${dayjs(date).format('YYYYMM')}${dayKey}`;
                  let render = true;
                  if (dates.has(key)) {
                    render = false;
                  }
                  dates.set(key, '');

                  return (
                    <div key={index} className="w-full">
                      {render && (
                        <span className="my-4 flex items-center gap-1 text-sm text-foreground">
                          <CalendarIcon size={16} className="mr-1 text-foreground" />
                          {formatDate(item.date, format).replaceAll('-feira', '')}
                        </span>
                      )}

                      <div className="mb-2 flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent name="a-arrow-down" />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground">
                              {type.display}
                            </span>
                            <span className="text-xs font-light text-foreground">
                              {item.description}
                            </span>
                          </div>
                        </div>
                        <span style={{ color: type.color }} className={cn('text-sm')}>
                          {operation}
                          {formatCurrency(item.amount)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <DataTable
                className="w-full"
                //response={{} as any}
                fields={[
                  { name: 'transaction', title: 'Transação' },
                  { name: 'date', title: 'Data' },
                  { name: 'amount', title: 'Montante' },
                  { name: 'status', title: 'Estado' },
                ]}
              /> */}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[320px]">
          <div className="flex flex-col rounded-[16px] border p-4">
            {/* BALANCE */}
            <div className="flex items-center justify-between">
              <span className="mb-3 text-xs font-medium text-foreground">Meu Saldo</span>
              <Button variant="ghost">
                <EllipsisIcon className="size-4 text-black" />
              </Button>
            </div>
            <div className="flex items-center gap-10">
              <p className="text-2xl font-bold text-foreground">$ 1.0000 </p>
              <PercentageBadge />
            </div>
            <span className="mb-3 text-[10px] text-foreground">
              You made an extra <span className="font-medium text-green-600">$ 1 000,00</span> this
              month
            </span>

            <div className="flex gap-1 rounded-lg border p-2">
              <div className="flex items-center justify-between gap-2 rounded-lg p-1 hover:cursor-pointer hover:bg-accent/50">
                <div className="flex items-center gap-1">
                  <div>
                    <PiggyBankIcon />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="line-clamp-1 text-[9px] font-light text-foreground">
                      Titulo da Carteira
                    </span>
                    <span className="line-clamp-1 text-xs font-bold text-foreground">
                      Referencia da Conta
                    </span>
                    <span className="line-clamp-1 text-[9px] font-light text-foreground">
                      Nome da conta | Tipo
                    </span>
                  </div>
                </div>

                <ChevronDownIcon />
              </div>
              <Separator orientation="vertical" className="" />
              <div className="flex flex-col justify-center">
                <span className="whitespace-nowrap text-[9px] font-light text-foreground">
                  Saldo
                </span>
                <span className="text-xs font-bold text-foreground">$ 10000</span>
              </div>
            </div>
            <div className="my-4 h-0 w-full border-b" />
            {/* WALLETS */}
            <span className="mb-3 text-xs font-medium text-foreground">Minhas Carteiras</span>
            <div>
              <div className="rounded-lg border border-border p-2">
                Tipo de Carteira Titulo da conta Referencia Iban se tiver
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
