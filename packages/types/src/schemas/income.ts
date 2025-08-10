import z from 'zod';
import { RECURRENCE_TYPE_ENUM, RECURRENCE_TYPE_MAP } from '../recurrence';
import { INCOME_STATUS_ENUM } from '../status';

import * as wallet from './wallet';

export const base = z.object({
  title: z.string(),
  wallet: z
    .object({
      ...wallet.base.shape,
      id: z.string({ error: 'Campo obrigatório.' }),
    })
    .nullish(),
  description: z.string().nullish(),
  amount: z.number(),
  type: z.enum(RECURRENCE_TYPE_ENUM, {
    error: `Valor inválido (deve ser ${Object.values(RECURRENCE_TYPE_MAP)
      .map((v) => v.display)
      .join(', ')})`,
  }),
  recurrence: z.int().nullish(),
  duration: z.int().nullish(),
  startDate: z.date().nullish(),
  endDate: z.date().nullish(),
  currency: z.string({ error: 'Campo obrigatório' }).length(3, { error: 'Deve ter 3 carateres.' }),
  estimatedDateReceipt: z.date().nullish(),
  status: z.enum(INCOME_STATUS_ENUM).default(INCOME_STATUS_ENUM.PENDING).optional(),
});

export const incomeSchema = base.transform((schema) => {
  return { ...schema, name: schema?.title?.trim() };
});

export type IncomeSchemaType = z.infer<typeof incomeSchema>;
