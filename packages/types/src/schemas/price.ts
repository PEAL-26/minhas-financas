import z from 'zod';
import * as location from './location';
import { numericString } from '@repo/helpers/zod';

export const priceSchemaBase = z.object({
  location: z.object({
    ...location.locationSchemaBase.partial().shape,
    id: z.string({ error: 'Campo obrigatório.' }),
  }),
  amount: numericString(z.number({ error: 'Campo obrigatório.' })),
});

export const priceSchema = priceSchemaBase.transform((schema) => schema);

export type PriceSchemaType = z.infer<typeof priceSchema>;
