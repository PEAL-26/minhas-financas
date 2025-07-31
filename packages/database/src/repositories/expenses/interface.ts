import { Expense } from '@repo/types';
import { IRepository } from '../../types';

export type ExpenseCreateData = Pick<
  Expense,
  | 'wishlist'
  | 'income'
  | 'category'
  | 'title'
  | 'description'
  | 'estimatedDate'
  | 'priority'
  | 'type'
  | 'recurrence'
  | 'startDate'
  | 'endDate'
  | 'estimatedAmount'
  | 'quantity'
  | 'total'
  | 'prices'
  | 'status'
>;

export type ExpenseUpdateData = Partial<ExpenseCreateData>;

export abstract class IExpenseRepository extends IRepository<
  Expense,
  ExpenseCreateData,
  ExpenseUpdateData
> {}
