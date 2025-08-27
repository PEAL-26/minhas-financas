import { Transaction } from '@repo/types/transaction';
import { toDatabasePropertiesCommonMap, toEntityPropertiesCommonMap } from '../../helpers/map';

export function toEntityMap(raw: any): Transaction {
  // TODO Melhorar esse mapeamento
  return {
    type: raw.type,
    date: raw.date,
    incomes: raw.incomes,
    expenses: raw.expenses,
    totalAmount: raw.totalAmount,
    note: raw.note,
    ...toEntityPropertiesCommonMap(raw),
  };
}

export function toDatabaseMap(entity: Partial<Transaction>) {
  // TODO Melhorar esse mapeamento
  return {
    type: entity.type,
    date: entity.date,
    incomes: entity.incomes,
    expenses: entity.expenses,
    totalAmount: entity.totalAmount,
    note: entity.note,
    ...toDatabasePropertiesCommonMap(entity),
  };
}
