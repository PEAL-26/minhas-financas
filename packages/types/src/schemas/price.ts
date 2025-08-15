import z from 'zod';
import * as location from './location';

export const priceSchemaBase = z.object({
  location: z.object({
    ...location.locationSchemaBase.partial().shape,
    id: z.string({ error: 'Campo obrigatório.' }),
  }),
  amount: z.number({ error: 'Campo obrigatório.' }),
});

export const priceSchema = priceSchemaBase.transform((schema) => schema);

export type PriceSchemaType = z.infer<typeof priceSchema>;
