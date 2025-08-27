import { Expense } from '@repo/types/expense';
import { toDatabasePropertiesCommonMap, toEntityPropertiesCommonMap } from '../../helpers/map';

export function toEntityMap(raw: any): Expense {
  // TODO Melhorar esse mapeamento
  return {
    wishlist: raw.wishlist,
    income: raw.income,
    category: raw.category,
    description: raw.description,
    estimatedDate: raw.estimatedDate,
    priority: raw.priority,
    type: raw.type,
    recurrence: raw.recurrence,
    startDate: raw.startDate,
    endDate: raw.endDate,
    estimatedAmount: raw.estimatedAmount,
    quantity: raw.quantity,
    total: raw.total,
    prices: raw.prices,
    status: raw.status,
    ...toEntityPropertiesCommonMap(raw),
  };
}

export function toDatabaseMap(entity: Partial<Expense>) {
  // TODO Melhorar esse mapeamento
  return {
    wishlistId: entity.wishlist?.id,
    incomeId: entity.income?.id,
    categoryId: entity.category?.id,
    description: entity.description,
    estimatedDate: entity.estimatedDate,
    priority: entity.priority,
    type: entity.type,
    recurrence: entity.recurrence,
    startDate: entity.startDate,
    endDate: entity.endDate,
    estimatedAmount: entity.estimatedAmount,
    quantity: entity.quantity,
    total: entity.total,
    prices: entity.prices,
    status: entity.status,
    ...toDatabasePropertiesCommonMap(entity),
  };
}
