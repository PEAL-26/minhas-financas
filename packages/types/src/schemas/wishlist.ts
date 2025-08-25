import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import z from 'zod';

import { PRIORITY_ENUM, PRIORITY_MAP } from '../priority';
import { RECURRENCE_TYPE_ENUM, RECURRENCE_TYPE_MAP } from '../recurrence';
import { WISHLIST_STATUS_ENUM, WISHLIST_STATUS_MAP } from '../status';
import * as category from './category';
import * as price from './price';

export const wishlistSchemaBase = z.object({
  name: z.string({ error: 'Campo obrigatório.' }),
  type: z.enum(RECURRENCE_TYPE_ENUM, {
    error: `Valor inválido (deve ser ${Object.values(RECURRENCE_TYPE_MAP)
      .map((v) => v.display)
      .join(', ')})`,
  }),
  recurrence: z
    .int({ error: 'Valor inválido.' })
    .gt(0, { error: 'Deve ser maior que zero (0)' })
    .nullish(),
  category: z
    .object({
      ...category.categorySchemaBase.partial().shape,
      id: z.string({ error: 'Campo obrigatório.' }),
    })
    .nullish(),
  targetDate: z.date({ error: 'Data inválida' }).nullish(),
  priority: z
    .enum(PRIORITY_ENUM, {
      error: `Valor inválido (deve ser ${Object.values(PRIORITY_MAP)
        .map((v) => v.display)
        .join(', ')})`,
    })
    .default(PRIORITY_ENUM.NORMAL)
    .optional(),
  expectedLocation: z.object().nullish(),
  estimatedCost: z.number().nullish(),
  quantity: z.number().nullish(),
  total: z.number().nullish(),
  status: z
    .enum(WISHLIST_STATUS_ENUM, {
      error: `Valor inválido (deve ser ${Object.values(WISHLIST_STATUS_MAP)
        .map((v) => v.display)
        .join(', ')})`,
    })
    .default(WISHLIST_STATUS_ENUM.PENDING)
    .optional(),
  prices: z
    .array(
      z.object({
        ...price.priceSchemaBase.partial().shape,
      }),
    )
    .optional(),
});

export const wishlistSchema = wishlistSchemaBase.transform((schema) => {
  return {
    ...schema,
    name: schema?.name?.trim(),
    recurrence: checkNullUndefinedValue(schema?.recurrence, {
      fn: (value) => Number(value),
    }),
  };
});

export type WishlistSchemaType = z.infer<typeof wishlistSchema>;
