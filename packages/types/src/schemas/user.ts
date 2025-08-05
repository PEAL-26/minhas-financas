import z from 'zod';

export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  passwordHash: z.string().nullish(),
  providerId: z.string().nullish(),
});

export type UserSchemaType = z.infer<typeof userSchema>;
