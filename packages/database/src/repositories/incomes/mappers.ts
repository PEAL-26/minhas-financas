import { Income } from '@repo/types';
import { walletToEntityMap } from '../wallet';

export function incomeToEntityMap(raw: any): Income {
  // TODO Melhorar esse mapeamento
  return {
    id: raw.id,
    title: raw.title,
    wallet: walletToEntityMap(raw.wallet),
    description: raw.description,
    amount: raw.amount,
    type: raw.type,
    recurrence: raw.recurrence,
    duration: raw.duration,
    startDate: raw.startDate,
    endDate: raw.endDate,
    currency: raw.currency,
    estimatedDateReceipt: raw.estimatedDateReceipt,
    status: raw.status,
    createdAt: raw?.createdAt ? new Date(raw?.createdAt) : raw?.createdAt,
    updatedAt: raw?.updatedAt ? new Date(raw?.updatedAt) : raw?.updatedAt,
  };
}

export function incomeToDatabaseMap(raw: Income) {
  // TODO Melhorar esse mapeamento
  return {
    title: raw.title,
    walletId: raw.wallet?.id,
    description: raw.description,
    amount: raw.amount,
    type: raw.type,
    recurrence: raw.recurrence,
    duration: raw.duration,
    startDate: raw.startDate,
    endDate: raw.endDate,
    currency: raw.currency,
    estimatedDateReceipt: raw.estimatedDateReceipt,
    status: raw.status,
  };
}
