import { z, ZodType } from 'zod';

export const numericString = (schema: ZodType<number | undefined | null, number>) =>
  z.preprocess((a) => {
    if (typeof a === 'string') {
      return Number(a || '0');
    } else if (typeof a === 'number') {
      return a;
    }

    if (a === null) return null;
    if (a === undefined) return undefined;
  }, schema);
