import z from 'zod';

export const base = z.object({
  name: z.string(),
  email: z.email(),
  passwordHash: z.string().nullish(),
  providerId: z.string().nullish(),
});

export const userSchema = base.transform((schema) => {
  return { ...schema, name: schema?.name?.trim(), email: schema?.email?.trim() };
});

export type UserSchemaType = z.infer<typeof userSchema>;
