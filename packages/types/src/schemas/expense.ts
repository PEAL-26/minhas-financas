import z from 'zod';

import { checkNullUndefinedValue } from '@repo/helpers/checkers';

import { PRIORITY_ENUM, PRIORITY_MAP } from '../priority';
import { RECURRENCE_TYPE_ENUM } from '../recurrence';
import { EXPENSE_STATUS_ENUM } from '../status';

import * as category from './category';
import * as income from './income';
import * as price from './price';
import * as wishlist from './wishlist';

const idSchema = z.string({ error: 'Campo obrigatório.' });

export const base = z.object({
  wishlist: z
    .object({
      ...wishlist.base.shape,
      id: idSchema,
    })
    .nullish(),
  income: z
    .object({
      ...income.base.shape,
      id: idSchema,
    })
    .nullish(),
  category: z
    .object({
      ...category.base.shape,
      id: idSchema,
    })
    .nullish(),
  title: z.string({ error: 'Campo obrigatório.' }),
  description: z.string().nullish(),
  estimatedDate: z.date().nullish(),
  priority: z
    .enum(PRIORITY_ENUM, {
      error: `Valor inválido (deve ser ${Object.values(PRIORITY_MAP)
        .map((v) => v.display)
        .join(', ')})`,
    })
    .default(PRIORITY_ENUM.NORMAL)
    .optional(),
  type: z.enum(RECURRENCE_TYPE_ENUM),
  recurrence: z.int().nullish(),
  startDate: z.date().nullish(),
  endDate: z.date().nullish(),
  estimatedAmount: z.number().nullish(),
  quantity: z.number().nullish(),
  total: z.number().nullish(),
  prices: z
    .array(
      z.object({
        ...price.base.shape,
        id: idSchema,
      }),
    )
    .optional(),
  status: z.enum(EXPENSE_STATUS_ENUM).default(EXPENSE_STATUS_ENUM.PENDING).optional(),
});

export const expenseSchema = base.transform((schema) => {
  return {
    ...schema,
    name: schema?.title?.trim(),
    description: checkNullUndefinedValue(schema.description, {
      convert: 'emptyToNull',
      fn: (value) => String(value).trim(),
    }),
    estimatedDate: checkNullUndefinedValue(schema.estimatedDate, {
      convert: 'emptyToNull',
      fn: (value) => String(value).trim(),
    }),
  };
});

export type ExpenseSchemaType = z.infer<typeof expenseSchema>;
