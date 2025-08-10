import z from 'zod';
import * as location from './location';

export const base = z.object({
  location: z.object({
    ...location.base.shape,
    id: z.string({ error: 'Campo obrigatório.' }),
  }),
  amount: z.number({ error: 'Campo obrigatório.' }),
});

export const priceSchema = base.transform((schema) => schema);

export type PriceSchemaType = z.infer<typeof priceSchema>;
