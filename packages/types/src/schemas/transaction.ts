import z from 'zod';
import { TRANSACTION_TYPE_ENUM, TRANSACTION_TYPE_MAP } from '../transaction';

import * as expense from './expense';
import * as income from './income';
import * as location from './location';

export const transactionIncomeSchema = z.object({
  income: z.object({
    ...income.base.shape,
    id: z.string({ error: 'Campo obrigatório.' }),
  }),
  amount: z.number(),
});

export const transactionExpenseSchema = z.object({
  expense: z.object({
    ...expense.base.shape,
    id: z.string({ error: 'Campo obrigatório.' }),
  }),
  amount: z.number(),
  quantity: z.number(),
  total: z.number(),
  location: z
    .object({
      ...location.base.shape,
      id: z.string({ error: 'Campo obrigatório.' }),
    })
    .nullish(),
  income: z
    .object({
      ...income.base.shape,
      id: z.string({ error: 'Campo obrigatório.' }),
    })
    .nullish(),
});

export const base = z.object({
  type: z.enum(TRANSACTION_TYPE_ENUM, {
    error: `Valor inválido (deve ser ${Object.values(TRANSACTION_TYPE_MAP)
      .map((v) => v.display)
      .join(', ')})`,
  }),
  date: z.date(),
  incomes: z.array(transactionIncomeSchema).default([]).optional(),
  expenses: z.array(transactionExpenseSchema).default([]).optional(),
  totalAmount: z.number(),
  note: z.string().nullish(),
});

export const transactionSchema = base.transform((schema) => schema);

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
export type TransactionIncomeSchemaType = z.infer<typeof transactionIncomeSchema>;
export type TransactionExpenseSchemaType = z.infer<typeof transactionExpenseSchema>;
