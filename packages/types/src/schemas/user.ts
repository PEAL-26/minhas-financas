import z from 'zod';

export const userSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    passwordHash: z.string().nullish(),
    providerId: z.string().nullish(),
  })
  .transform((schema) => {
    return { ...schema, name: schema?.name?.trim(), email: schema?.email?.trim() };
  });

export type UserSchemaType = z.infer<typeof userSchema>;
