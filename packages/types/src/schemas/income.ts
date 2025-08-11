import z from 'zod';
import { RECURRENCE_TYPE_ENUM, RECURRENCE_TYPE_MAP } from '../recurrence';
import { INCOME_STATUS_ENUM, INCOME_STATUS_MAP } from '../status';

import { enumValidate } from '../helpers/zod';
import * as wallet from './wallet';

export const base = z.object({
  wallet: z
    .object({
      ...wallet.base.shape,
      id: z.string({ error: 'Campo obrigatório.' }),
    })
    .nullish(),
  description: z.string().nullish(),
  amount: z
    .number({
      error: (e) => (e.input === undefined ? 'Campo obrigatório' : 'Valor inválido'),
    })
    ,
  type: z.enum(RECURRENCE_TYPE_ENUM, enumValidate(RECURRENCE_TYPE_MAP)),
  recurrence: z.int({ error: 'Valor inválido' }).nullish(),
  duration: z.int({ error: 'Valor inválido' }).nullish(),
  startDate: z.date({ error: 'Data inválida' }).nullish(),
  endDate: z.date({ error: 'Data inválida' }).nullish(),
  currency: z
    .string({ error: 'Campo obrigatório' })
    .length(3, { error: 'Deve ter 3 carateres.' })
    .nullish(),
  estimatedDateReceipt: z.date({ error: 'Data inválida' }).nullish(),
  status: z
    .enum(INCOME_STATUS_ENUM, enumValidate(INCOME_STATUS_MAP))
    .default(INCOME_STATUS_ENUM.PENDING)
    .optional(),
});

export const incomeSchema = base.transform((schema) => {
  return { ...schema };
});

export type IncomeSchemaType = z.infer<typeof incomeSchema>;
