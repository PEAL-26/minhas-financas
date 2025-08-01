import z from 'zod';

export const walletSchema = z.object({
  title: z.string(),
  accountId: z.string(),
  reference: z.string(),
  iban: z.string().nullish(),
  details: z.string().nullish(),
  currencies: z.array(z.string().length(3)).optional(),
  active: z.boolean().default(true).optional(),
});

export type WalletSchemaType = z.infer<typeof walletSchema>;
