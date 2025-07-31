import { Transaction } from '@repo/types';

export function transactionToEntityMap(raw: any): Transaction {
  // TODO Melhorar esse mapeamento
  return {
    id: raw.id,
    type: raw.type,
    date: raw.date,
    incomes: raw.incomes,
    expenses: raw.expenses,
    totalAmount: raw.totalAmount,
    note: raw.note,
    createdAt: raw?.createdAt ? new Date(raw?.createdAt) : raw?.createdAt,
    updatedAt: raw?.updatedAt ? new Date(raw?.updatedAt) : raw?.updatedAt,
  };
}

export function transactionToDatabaseMap(entity: Transaction) {
  // TODO Melhorar esse mapeamento
  return {
    type: entity.type,
    date: entity.date,
    incomes: entity.incomes,
    expenses: entity.expenses,
    totalAmount: entity.totalAmount,
    note: entity.note,
  };
}
