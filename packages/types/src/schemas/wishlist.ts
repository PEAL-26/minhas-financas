import z from 'zod';
import { PRIORITY_ENUM } from '../priority';
import { RECURRENCE_TYPE_ENUM } from '../recurrence';
import { WISHLIST_STATUS_ENUM } from '../status';

export const wishlistSchema = z.object({
  name: z.string(),
  type: z.enum(RECURRENCE_TYPE_ENUM),
  recurrence: z.int().nullish(),
  categoryId: z.string().nullish(),
  targetDate: z.date().nullish(),
  priority: z.enum(PRIORITY_ENUM).default(PRIORITY_ENUM.NORMAL).optional(),
  expectedLocationId: z.string().nullish(),
  estimatedCost: z.number().nullish(),
  quantity: z.number().nullish(),
  total: z.number().nullish(),
  status: z.enum(WISHLIST_STATUS_ENUM).default(WISHLIST_STATUS_ENUM.PENDING).optional(),
  prices: z
    .array(
      z.object({
        locationId: z.string(),
        amount: z.number(),
      }),
    )
    .optional(),
});

export type WishlistSchemaType = z.infer<typeof wishlistSchema>;
