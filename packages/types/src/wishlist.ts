import { Category } from './category';
import { Location, Price } from './location';
import { PRIORITY_ENUM } from './priority';
import { RECURRENCE_ENUM, RECURRENCE_TYPE_ENUM } from './recurrence';
import { WISHLIST_STATUS_ENUM } from './status';

export type Wishlist = {
  id: string;
  name: string;
  type: RECURRENCE_TYPE_ENUM;
  recurrence?: RECURRENCE_ENUM | number | null;
  category?: Category | null;
  targetDate?: Date | null;
  priority: PRIORITY_ENUM;
  expectedLocation?: Location | null;
  estimatedCost?: number | null;
  quantity?: number | null;
  total?: number | null;
  status: WISHLIST_STATUS_ENUM;
  prices?: Price[];
  createdAt: Date;
  updatedAt: Date;
};
