import z from 'zod';

export const categorySchema = z.object({
  name: z.string(),
  icon: z.string().nullish(),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
