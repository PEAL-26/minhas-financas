import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import z from 'zod';
import { LOCATION_TYPE_ENUM, LOCATION_TYPE_MAP } from '../location';

export const locationSchema = z
  .object({
    name: z.string({ error: 'Campo obrigatório.' }),
    type: z.enum(LOCATION_TYPE_ENUM, {
      error: `Valor inválido (deve ser ${Object.values(LOCATION_TYPE_MAP)
        .map((v) => v.display)
        .join(', ')})`,
    }),
    country: z.string().nullish(),
    province: z.string().nullish(),
    city: z.string().nullish(),
    address: z.string().nullish(),
    coordinate: z
      .object({
        latitude: z.number({ error: 'Valor inválido' }),
        longitude: z.number({ error: 'Valor inválido' }),
      })
      .nullish(),
    contacts: z.array(z.string()).optional(),
  })
  .transform((schema) => {
    return {
      ...schema,
      name: schema?.name?.trim(),
      country: checkNullUndefinedValue(schema?.country, {
        fn: (value) => String(value).trim(),
        convert: 'emptyToNull',
      }),
      province: checkNullUndefinedValue(schema?.province, {
        fn: (value) => String(value).trim(),
        convert: 'emptyToNull',
      }),
      city: checkNullUndefinedValue(schema?.city, {
        fn: (value) => String(value).trim(),
        convert: 'emptyToNull',
      }),
      address: checkNullUndefinedValue(schema?.address, {
        fn: (value) => String(value).trim(),
        convert: 'emptyToNull',
      }),
      coordinate: checkNullUndefinedValue(schema?.coordinate),
      contacts: checkNullUndefinedValue(schema?.contacts),
    };
  });

export type LocationSchemaType = z.infer<typeof locationSchema>;
