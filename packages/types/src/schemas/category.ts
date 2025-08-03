import { colorGenerate } from '@repo/helpers/color-generate';
import { z } from 'zod';

export const categorySchema = z
  .object({
    name: z.string().min(1),
    icon: z.string().nullish(),
    color: z.string().nullish(),
  })
  .transform(async (schema) => {
    if (!schema?.color) {
      const color = colorGenerate();
      return { ...schema, color: color.rgb };
    }

    return { ...schema };
  });

export type CategorySchemaType = z.infer<typeof categorySchema>;
