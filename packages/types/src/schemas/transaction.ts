import z from 'zod';
import { TRANSACTION_TYPE_ENUM } from '../transaction';

export const transactionIncomeSchema = z.object({
  incomeId: z.string(),
  amount: z.number(),
});

export const transactionExpenseSchema = z.object({
  expenseId: z.string(),
  amount: z.number(),
  quantity: z.number(),
  total: z.number(),
  locationId: z.string().nullish(),
  incomeId: z.string().nullish(),
});

export const transactionSchema = z.object({
  type: z.enum(TRANSACTION_TYPE_ENUM),
  date: z.date(),
  incomes: z.array(transactionIncomeSchema).optional(),
  expenses: z.array(transactionExpenseSchema).optional(),
  totalAmount: z.number(),
  note: z.string().nullish(),
});

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
export type TransactionIncomeSchemaType = z.infer<typeof transactionIncomeSchema>;
export type TransactionExpenseSchemaType = z.infer<typeof transactionExpenseSchema>;
