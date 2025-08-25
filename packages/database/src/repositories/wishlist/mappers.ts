import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import { Price } from '@repo/types/location';
import { Wishlist } from '@repo/types/wishlist';
import { toDatabasePropertiesCommonMap, toEntityPropertiesCommonMap } from '../..//helpers/map';
import * as categoryMapper from '../categories';
import * as locationMapper from '../locations';

export function pricesToEntityMap(prices: any) {
  if (!prices) return [];

  return prices.map((price: any) => {
    return {
      location: checkNullUndefinedValue(price.location, {
        convert: 'emptyToNull',
        fn: (value) => {
          return locationMapper.toEntityMap(value);
        },
      }),
      amount: Number(price.amount),
    };
  });
}

export function toEntityMap(raw: any): Wishlist {
  return {
    name: raw.name,
    type: raw.type,
    recurrence: raw.recurrence,
    category: checkNullUndefinedValue(raw.category, {
      fn: (data) => categoryMapper.toEntityMap(data),
    }),
    targetDate: checkNullUndefinedValue(raw.targetDate, { fn: (value) => new Date(value) }),
    priority: raw.priority,
    expectedLocation: checkNullUndefinedValue(raw.expectedLocation, {
      fn: (data) => locationMapper.toEntityMap(data),
    }),
    estimatedCost: checkNullUndefinedValue(raw.estimatedCost, { fn: (value) => Number(value) }),
    quantity: checkNullUndefinedValue(raw.quantity, { fn: (value) => Number(value) }),
    total: checkNullUndefinedValue(raw.total, { fn: (value) => Number(value) }),
    status: raw.status,
    prices: pricesToEntityMap(raw.prices),
    ...toEntityPropertiesCommonMap(raw),
  };
}

export function toDatabaseMap(entity: Partial<Wishlist>) {
  return {
    name: checkNullUndefinedValue(entity.name, { convert: 'emptyToUndefined' }),
    type: checkNullUndefinedValue(entity.type, { convert: 'emptyToUndefined' }),
    recurrence: checkNullUndefinedValue(entity.recurrence, { convert: 'emptyToNull' }),
    categoryId: checkNullUndefinedValue(entity.category, {
      convert: 'emptyToNull',
      fn: (data) => data?.id,
    }),
    targetDate: checkNullUndefinedValue(entity.targetDate, {
      convert: 'emptyToNull',
      fn: (value) => new Date(value).getTime(),
    }),
    priority: checkNullUndefinedValue(entity.priority, { convert: 'emptyToUndefined' }),
    expectedLocationId: checkNullUndefinedValue(entity.expectedLocation, {
      convert: 'emptyToNull',
      fn: (data) => data?.id,
    }),
    estimatedCost: entity.estimatedCost,
    quantity: checkNullUndefinedValue(entity.quantity, { convert: 'emptyToNull' }),
    total: checkNullUndefinedValue(entity.total, { convert: 'emptyToNull' }),
    status: checkNullUndefinedValue(entity.status, { convert: 'emptyToNull' }),
    prices: checkNullUndefinedValue(entity.prices, {
      convert: 'emptyToNull',
      fn: (prices) => {
        return prices.map((price: Price) => ({
          locationId: price?.location?.id,
          amount: price.amount,
        }));
      },
    }),
    ...toDatabasePropertiesCommonMap(entity),
  };
}
