import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import z from 'zod';

import { ACCOUNT_TYPE_ENUM } from '../account';
import * as account from './account';

export const base = z.object({
  title: z.string({ error: 'Campo obrigatório.' }),
  account: z.object(
    {
      ...account.base.shape,
      id: z.string({ error: 'Campo obrigatório.' }),
    },
    { error: 'Campo obrigatório.' },
  ),
  reference: z.string({ error: 'Campo obrigatório.' }),
  iban: z.string().nullish(),
  details: z.string().nullish(),
  currencies: z.array(z.string().length(3, { error: 'Deve ter 3 carateres.' })).optional(),
  active: z.boolean().default(true).optional(),
});

export const walletSchema = base.transform((schema) => {
  let iban = schema?.iban;
  if (schema?.account?.type !== ACCOUNT_TYPE_ENUM.BANK) {
    iban = null;
  }

  return {
    ...schema,
    title: schema?.title?.trim(),
    reference: schema?.reference?.trim(),
    iban: checkNullUndefinedValue(iban, {
      convert: 'emptyToNull',
      fn: (value) => String(value).trim(),
    }),
    details: checkNullUndefinedValue(schema?.details, {
      convert: 'emptyToNull',
      fn: (value) => String(value).trim(),
    }),
  };
});

export type WalletSchemaType = z.infer<typeof walletSchema>;
