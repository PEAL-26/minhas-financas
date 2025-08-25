import z from 'zod';
import { timestampsSchema } from './timestamps';

export const userSchemaBase = z.object({
  name: z.string(),
  email: z.email(),
  passwordHash: z.string().nullish(),
  providerId: z.string().nullish(),
  ...timestampsSchema.partial().shape,
});

export const userSchema = userSchemaBase.transform((schema) => {
  return {
    ...schema,
    name: schema?.name?.trim(),
    email: schema?.email?.trim(),
    updatedAt: new Date(),
  };
});

export type UserSchemaType = z.infer<typeof userSchema>;
