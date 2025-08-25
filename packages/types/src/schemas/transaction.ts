import z from 'zod';
import { TRANSACTION_TYPE_ENUM, TRANSACTION_TYPE_MAP } from '../transaction';

import * as expense from './expense';
import * as income from './income';
import * as location from './location';
import { timestampsSchema } from './timestamps';

export const transactionIncomeSchema = z.object({
  income: z.object({
    ...income.incomeSchemaBase.partial().shape,
    id: z.string({ error: 'Campo obrigatório.' }),
  }),
  amount: z.number(),
});

export const transactionExpenseSchema = z.object({
  expense: z.object({
    ...expense.expenseSchemaBase.partial().shape,
    id: z.string({ error: 'Campo obrigatório.' }),
  }),
  amount: z.number(),
  quantity: z.number(),
  total: z.number(),
  location: z
    .object({
      ...location.locationSchemaBase.partial().shape,
      id: z.string({ error: 'Campo obrigatório.' }),
    })
    .nullish(),
  income: z
    .object({
      ...income.incomeSchemaBase.partial().shape,
      id: z.string({ error: 'Campo obrigatório.' }),
    })
    .nullish(),
});

export const transactionSchemaBase = z.object({
  type: z.enum(TRANSACTION_TYPE_ENUM, {
    error: `Valor inválido (deve ser ${Object.values(TRANSACTION_TYPE_MAP)
      .map((v) => v.display)
      .join(', ')})`,
  }),
  date: z.date({ error: 'Data inválida' }),
  incomes: z.array(transactionIncomeSchema).default([]).optional(),
  expenses: z.array(transactionExpenseSchema).default([]).optional(),
  totalAmount: z.number().default(0),
  note: z.string().nullish(),
  ...timestampsSchema.partial().shape,
});

export const transactionSchema = transactionSchemaBase.transform((schema) => ({
  ...schema,
  updatedAt: new Date(),
}));

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
export type TransactionIncomeSchemaType = z.infer<typeof transactionIncomeSchema>;
export type TransactionExpenseSchemaType = z.infer<typeof transactionExpenseSchema>;
