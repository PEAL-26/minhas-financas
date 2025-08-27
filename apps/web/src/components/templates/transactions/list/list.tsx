'use client';

import { useQueryStateParams } from '@/hooks/use-search-params';
import { MAIN_MENUS } from '@repo/constants/menus';
import { useDelete, useListPaginate } from '@repo/database/hooks/crud';
import { formatCurrency } from '@repo/helpers/currency';
import { formatDate } from '@repo/helpers/date';
import { dayjs } from '@repo/helpers/dayjs';
import { TRANSACTION_TYPE_MAP, Transaction } from '@repo/types/transaction';
import { AlertDialogCustom } from '@repo/ui/alert-dialog-custom';
import { IconComponent } from '@repo/ui/icon-component';
import { CalendarIcon } from '@repo/ui/lib/lucide';
import { cn } from '@repo/ui/lib/utils';
import { Metadata } from 'next';
import { useState } from 'react';
import { TransactionFormSheet } from '../form';

export const metadata: Metadata = {
  title: MAIN_MENUS.DASHBOARD.title,
  description: MAIN_MENUS.DASHBOARD.description,
};

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

export function ListTransactionsTemplate() {
  const [page, setPage] = useQueryStateParams<number>('page', 'int');
  const [size, setSize] = useQueryStateParams<number>('size', 'int');
  const [query] = useQueryStateParams('q');

  const [form, setForm] = useState<{ id?: string; open: boolean }>({ open: false });
  const [alertDelete, setAlertDelete] = useState<{ id?: string; open: boolean }>({ open: false });

  const remove = useDelete({ repositoryName: 'transaction', queryKey: ['transactions'] });

  const listPaginate = useListPaginate<Transaction>({
    repositoryName: 'transaction',
    queryKey: ['transactions'],
    query,
    size,
    page,
    setPage,
    setSize,
  });

  const dates = new Map();
  return (
    <>
      <div className="flex flex-col p-4">
        <div className="mt-3 flex w-full">
          <div className="flex w-full flex-col">
            {listPaginate.data.map((item, index) => {
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
                        <span className="text-sm font-bold text-foreground">{type.display}</span>
                        <span className="text-xs font-light text-foreground"></span>
                      </div>
                    </div>
                    <span style={{ color: type.color }} className={cn('text-sm')}>
                      {operation}
                      {formatCurrency(item.totalAmount)}
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
        {/* <DataTable
          response={listPaginate}
          fields={[
            {
              name: 'type',
              title: 'Tipo',
            },
            {
              name: 'date',
              title: 'Data',
              render: (item) => (item.date ? formatDate(item.date) : 'S/N'),
            },
          ]}
          onEdit={(item) => setForm({ id: item.id, open: true })}
          onDelete={(id) => setAlertDelete({ open: true, id })}
        /> */}
      </div>

      <TransactionFormSheet
        onClose={() => setForm({ open: false })}
        open={form.open}
        id={form.id}
      />
      <AlertDialogCustom
        description="Esta ação não pode ser desfeita. Isso excluirá permanentemente a despesa."
        id={alertDelete?.id}
        fn={remove.handle}
        onClose={() => setAlertDelete({ open: false })}
        open={alertDelete.open}
      />
    </>
  );
}
