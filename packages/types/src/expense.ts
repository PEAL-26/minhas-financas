import { Income } from './income';
import { Price } from './location';
import { PRIORITY_ENUM } from './priority';
import { RECURRENCE_ENUM, RECURRENCE_TYPE_ENUM } from './recurrence';
import { EXPENSE_STATUS_ENUM } from './status';
import { Wishlist } from './wishlist';

export type Expense = {
  id: string;
  wishlist?: Wishlist | null;
  income?: Income | null;
  description: string | null;
  estimatedDate?: Date | null;
  priority: PRIORITY_ENUM;
  type: RECURRENCE_TYPE_ENUM;
  recurrence?: RECURRENCE_ENUM | number | null;
  startDate?: Date | null;
  endDate?: Date | null;
  estimatedAmount?: number | null;
  quantity?: number | null;
  total?: number | null;
  prices?: Price[];
  status: EXPENSE_STATUS_ENUM;
  createdAt: Date;
  updatedAt: Date;
};
