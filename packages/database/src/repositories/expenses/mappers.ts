import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import { Expense } from '@repo/types/expense';
import { RECURRENCE_TYPE_ENUM } from '@repo/types/recurrence';
import { EXPENSE_STATUS_ENUM } from '@repo/types/status';
import { toDatabasePropertiesCommonMap, toEntityPropertiesCommonMap } from '../../helpers/map';
import * as categoryMapper from '../categories';
import * as incomeMapper from '../incomes';
import { pricesToEntityMap } from '../shared';
import * as wishlistMapper from '../wishlist';

export function toEntityMap(raw: any): Expense {
  return {
    wishlist: checkNullUndefinedValue(raw.wishlist, {
      fn: (value) => wishlistMapper.toEntityMap(value),
    }),
    income: checkNullUndefinedValue(raw.income, {
      fn: (value) => incomeMapper.toEntityMap(value),
    }),
    category: checkNullUndefinedValue(raw.category, {
      fn: (value) => categoryMapper.toEntityMap(value),
    }),
    description: raw.description,
    estimatedDate: checkNullUndefinedValue(raw.estimatedDate, {
      fn: (value) => new Date(value),
    }),
    priority: raw.priority,
    type: raw.type,
    recurrence: raw.recurrence,
    startDate: checkNullUndefinedValue(raw.startDate, {
      fn: (value) => new Date(value),
    }),
    endDate: checkNullUndefinedValue(raw.endDate, {
      fn: (value) => new Date(value),
    }),
    estimatedAmount: checkNullUndefinedValue(raw.estimatedAmount, { fn: (value) => Number(value) }),
    quantity: checkNullUndefinedValue(raw.quantity, { fn: (value) => Number(value) }),
    total: checkNullUndefinedValue(raw.total, { fn: (value) => Number(value) }),
    status: raw.status || undefined,
    note: raw.note,
    prices: pricesToEntityMap(raw.prices),
    ...toEntityPropertiesCommonMap(raw),
  };
}

export function toDatabaseMap(entity: Partial<Expense>) {
  return {
    wishlistId: checkNullUndefinedValue(entity.wishlist, { fn: (value) => value.id }),
    incomeId: checkNullUndefinedValue(entity.income, { fn: (value) => value.id }),
    categoryId: checkNullUndefinedValue(entity.category, { fn: (value) => value.id }),
    description: entity.description,
    estimatedDate: checkNullUndefinedValue(entity.estimatedDate, {
      convert: 'emptyToNull',
      fn: (value) => new Date(value).getTime(),
    }),
    priority: checkNullUndefinedValue(entity.priority, { convert: 'emptyToUndefined' }),
    type: entity?.type ?? RECURRENCE_TYPE_ENUM.UNIQUE,
    recurrence: entity?.recurrence ?? null,
    startDate: checkNullUndefinedValue(entity.startDate, {
      convert: 'emptyToNull',
      fn: (value) => new Date(value).getTime(),
    }),
    endDate: checkNullUndefinedValue(entity.endDate, {
      convert: 'emptyToNull',
      fn: (value) => new Date(value).getTime(),
    }),
    estimatedAmount: entity.estimatedAmount,
    quantity: entity.quantity,
    total: entity.total,
    prices: entity.prices
      ? entity.prices.map((price) => ({
          locationId: checkNullUndefinedValue(price?.location, {
            convert: 'emptyToNull',
            fn: (value) => value.id,
          }),
          amount: price.amount,
        }))
      : [],
    status: entity?.status ?? EXPENSE_STATUS_ENUM.PENDING,
    note: entity?.note,
    ...toDatabasePropertiesCommonMap(entity),
  };
}
