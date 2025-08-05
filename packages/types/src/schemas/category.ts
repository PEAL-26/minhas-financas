import { colorGenerate } from '@repo/helpers/color-generate';
import { z } from 'zod';

export const categorySchema = z
  .object({
    name: z.string().min(1),
    icon: z.string().nullish().default('Tag'),
    color: z.string().nullish(),
  })
  .transform(async (schema) => {
    const color = schema.color ? schema.color : colorGenerate().rgb;
    const icon = schema.icon ? schema.icon : 'Tag';
    return { ...schema, color, icon };
  });

export type CategorySchemaType = z.infer<typeof categorySchema>;
