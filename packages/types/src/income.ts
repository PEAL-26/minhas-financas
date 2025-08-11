import { RECURRENCE_ENUM, RECURRENCE_TYPE_ENUM } from './recurrence';
import { INCOME_STATUS_ENUM } from './status';
import { Wallet } from './wallet';

export type Income = {
  id: string;
  wallet?: Wallet | null;
  description?: string | null;
  amount: number;
  type: RECURRENCE_TYPE_ENUM;
  recurrence?: RECURRENCE_ENUM | number | null;
  duration?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
  currency?: string;
  estimatedDateReceipt?: Date | null;
  status: INCOME_STATUS_ENUM;
  createdAt: Date;
  updatedAt: Date;
};
