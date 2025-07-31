import { OperationTypes, Status } from '@/types';
import { db } from '@repo/database/connection';

export type NeedDataResponse = {
  id: number;
  category?: {
    id?: number;
    name?: string;
  } | null;
  title: string;
  description?: string;
  priority: number;
  type: OperationTypes;
  recurrence?: number | null;
  customRecurrence?: number | null;
  amount: number;
  status: Status;
  needPrices?: {
    local: {
      id: number;
      name: string;
    };
    amount: number;
  }[];
};

export async function getNeedById(id: number) {
  const need = await db.getFirst<NeedDataResponse>('needs', {
    include: {
      needs_prices: {
        as: 'needPrices',
        select: {
          amount: true,
        },
        include: {
          locals: {
            singular: 'local',
            select: {
              id: true,
              name: true,
            },
          },
        },
        singular: 'needPrice',
      },
    },
    where: { id },
  });

  if (!need) throw new Error('Necessidade não existe!');

  return need;
}
