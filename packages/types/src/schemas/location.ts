import z from 'zod';
import { LOCATION_TYPE_ENUM } from '../location';

export const locationSchema = z
  .object({
    name: z.string(),
    type: z.enum(LOCATION_TYPE_ENUM),
    province: z.string().nullish(),
    city: z.string().nullish(),
    address: z.string().nullish(),
    coordinate: z
      .object({
        latitude: z.number(),
        longitude: z.number(),
      })
      .nullish(),
    contacts: z.array(z.string()).optional(),
  })
  .transform(async (schema) => {
    return { ...schema, name: schema?.name?.trim() };
  });

export type LocationSchemaType = z.infer<typeof locationSchema>;
