import z from 'zod';

export const priceSchema = z.object({
  location: z.object({}),
  amount: z.number({ error: 'Campo obrigatório.' }),
});

export type PriceSchemaType = z.infer<typeof priceSchema>;
