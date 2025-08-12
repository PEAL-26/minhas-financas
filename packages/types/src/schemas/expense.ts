import z from 'zod';

import { checkNullUndefinedValue } from '@repo/helpers/checkers';

import { PRIORITY_ENUM, PRIORITY_MAP } from '../priority';
import { RECURRENCE_TYPE_ENUM, RECURRENCE_TYPE_MAP } from '../recurrence';
import { EXPENSE_STATUS_ENUM, EXPENSE_STATUS_MAP } from '../status';

import { enumValidate } from '../helpers/zod';
import * as category from './category';
import * as income from './income';
import * as price from './price';
import * as wishlist from './wishlist';

const idSchema = z.string({ error: 'Campo obrigatório.' });

export const base = z.object({
  wishlist: z
    .object({
      ...wishlist.base.partial().shape,
      id: idSchema,
    })
    .nullish(),
  income: z
    .object({
      ...income.base.partial().shape,
      id: idSchema,
    })
    .nullish(),
  category: z
    .object({
      ...category.base.partial().shape,
      id: idSchema,
    })
    .nullish(),
  description: z.string().nullish(),
  estimatedDate: z.date().nullish(),
  priority: z
    .enum(PRIORITY_ENUM, enumValidate(PRIORITY_MAP))
    .default(PRIORITY_ENUM.NORMAL)
    .optional(),
  type: z
    .enum(RECURRENCE_TYPE_ENUM, enumValidate(RECURRENCE_TYPE_MAP))
    .default(RECURRENCE_TYPE_ENUM.UNIQUE),
  recurrence: z.int({ error: 'Valor inválido' }).nullish(),
  startDate: z.date({ error: 'Data inválida' }).nullish(),
  endDate: z.date({ error: 'Data inválida' }).nullish(),
  estimatedAmount: z.number({ error: 'Valor inválido' }),
  quantity: z.number().default(1).nullish(),
  total: z.number().nullish(),
  prices: z
    .array(
      z.object({
        ...price.base.partial().shape,
        id: idSchema,
      }),
    )
    .optional(),
  status: z
    .enum(EXPENSE_STATUS_ENUM, enumValidate(EXPENSE_STATUS_MAP))
    .default(EXPENSE_STATUS_ENUM.PENDING)
    .optional(),
});

export const expenseSchema = base.transform((schema) => {
  return {
    ...schema,
    quantity: checkNullUndefinedValue(schema.quantity, {
      convert: 'emptyToNull',
      fn: (value) => Number(value),
    }),
    total: checkNullUndefinedValue(schema.total, {
      convert: 'emptyToNull',
      fn: (value) => Number(value),
    }),
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
