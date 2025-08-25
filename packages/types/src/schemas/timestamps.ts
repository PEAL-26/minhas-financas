import z from 'zod';

export const timestampsSchema = z.object({
  updatedAt: z.date().nullish(),
  createdAt: z.date().default(new Date()),
});
