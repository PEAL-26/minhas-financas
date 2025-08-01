import { z } from 'zod';
import { ACCOUNT_TYPE_ENUM } from '../account';

export const accountSchema = z.object({
  name: z.string(),
  type: z.enum(ACCOUNT_TYPE_ENUM),
  currencies: z.array(z.string()).optional(),
  siteUrl: z.string().url().nullish(),
  swiftCode: z.string().url().nullish(),
});

export type AccountSchemaType = z.infer<typeof accountSchema>;
