import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import { Wishlist } from '@repo/types';
import { categoryToEntityMap } from '../categories';
import { locationToEntityMap } from '../locations';

export function wishlistToEntityMap(raw: any): Wishlist {
  // TODO Melhorar o mapeamento
  return {
    id: raw.id,
    name: raw.name,
    type: raw.type,
    recurrence: raw.recurrence,
    category: checkNullUndefinedValue(raw.category, {
      fn: (data) => categoryToEntityMap(data),
    }),
    targetDate: raw.targetDate,
    priority: raw.priority,
    expectedLocation: checkNullUndefinedValue(raw.expectedLocation, {
      fn: (data) => locationToEntityMap(data),
    }),
    estimatedCost: raw.estimatedCost,
    quantity: raw.quantity,
    total: raw.total,
    status: raw.status,
    prices: raw.prices,
    createdAt: raw?.createdAt ? new Date(raw?.createdAt) : raw?.createdAt,
    updatedAt: raw?.updatedAt ? new Date(raw?.updatedAt) : raw?.updatedAt,
  };
}

export function wishlistToDatabaseMap(entity: Wishlist) {
  return {
    name: entity.name,
    type: entity.type,
    recurrence: entity.recurrence,
    categoryId: entity.category?.id,
    targetDate: entity.targetDate,
    priority: entity.priority,
    expectedLocationId: entity.expectedLocation?.id,
    estimatedCost: entity.estimatedCost,
    quantity: entity.quantity,
    total: entity.total,
    status: entity.status,
    prices: entity.prices,
  };
}
