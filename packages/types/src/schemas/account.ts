import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import { z } from 'zod';
import { ACCOUNT_TYPE_ENUM } from '../account';

export const accountSchema = z
  .object({
    name: z.string({ error: 'Campo obrigatório.' }),
    type: z.enum(ACCOUNT_TYPE_ENUM, { error: 'Campo obrigatório.' }),
    currencies: z
      .array(
        z
          .string({ error: 'Campo obrigatório' })
          .min(3, { error: 'Deve ter no mínimo 3 caracteres' }),
      )
      .optional(),
    siteUrl: z.string({ error: 'Valor inválido.' }).url({ error: 'Url inválida.' }).nullish(),
    swiftCode: z.string({ error: 'Valor inválido.' }).nullish(),
  })
  .transform((schema) => {
    return {
      ...schema,
      name: schema?.name?.trim(),
      siteUrl: checkNullUndefinedValue(schema.siteUrl, {
        convert: 'emptyToNull',
        fn: (value) => String(value).trim(),
      }),
      swiftCode: checkNullUndefinedValue(schema.swiftCode, {
        convert: 'emptyToNull',
        fn: (value) => String(value).trim(),
      }),
    };
  });

export type AccountSchemaType = z.infer<typeof accountSchema>;
