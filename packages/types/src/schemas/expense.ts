import z from 'zod';

import { checkNullUndefinedValue } from '@repo/helpers/checkers';

import { PRIORITY_ENUM, PRIORITY_MAP } from '../priority';
import { RECURRENCE_TYPE_ENUM } from '../recurrence';
import { EXPENSE_STATUS_ENUM } from '../status';

export const expenseSchema = z
  .object({
    wishlistId: z.string().nullish(),
    incomeId: z.string().nullish(),
    categoryId: z.string().nullish(),
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
          locationId: z.string(),
          amount: z.number(),
        }),
      )
      .optional(),
    status: z.enum(EXPENSE_STATUS_ENUM).default(EXPENSE_STATUS_ENUM.PENDING).optional(),
  })
  .transform((schema) => {
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
