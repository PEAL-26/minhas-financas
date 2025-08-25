import { colorGenerate } from '@repo/helpers/color-generate';
import { z } from 'zod';
import { timestampsSchema } from './timestamps';

export const categorySchemaBase = z.object({
  name: z
    .string({ error: 'Campo Obrigatório.' })
    .min(1, { error: 'Deve ter no mínimo 1 caractere' }),
  icon: z.string({ error: 'Valor inválido.' }).default('tag').nullish(),
  color: z.string({ error: 'Valor inválido.' }).nullish(),
  ...timestampsSchema.partial().shape,
});

export const categorySchema = categorySchemaBase.transform((schema) => {
  const color = schema.color ? schema.color : colorGenerate().rgb;
  const icon = schema.icon ? schema.icon : 'tag';
  return { ...schema, name: schema?.name?.trim(), color, icon, updatedAt: new Date() };
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
