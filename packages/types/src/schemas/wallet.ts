import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import { ACCOUNT_TYPE_ENUM, ACCOUNT_TYPE_MAP } from '../account';
import z from 'zod';

export const walletSchema = z
  .object({
    title: z.string({ error: 'Campo obrigatório.' }),
    account: z.object(
      {
        id: z.string({ error: 'Campo obrigatório.' }),
        name: z.string(),
        type: z.enum(ACCOUNT_TYPE_ENUM, {
          error: `Valor inválido (deve ser ${Object.values(ACCOUNT_TYPE_MAP)
            .map((v) => v.display)
            .join(', ')})`,
        }),
      },
      { error: 'Campo obrigatório.' },
    ),
    reference: z.string({ error: 'Campo obrigatório.' }),
    iban: z.string().nullish(),
    details: z.string().nullish(),
    currencies: z.array(z.string().length(3, { error: 'Deve ter 3 carateres.' })).optional(),
    active: z.boolean().default(true).optional(),
  })
  .transform((schema) => {
    return {
      ...schema,
      title: schema?.title?.trim(),
      reference: schema?.reference?.trim(),
      iban: checkNullUndefinedValue(schema?.iban, {
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
