import { Expense } from '@repo/types/expense';
import { IRepository } from '../../types';

export type ExpenseCreateData = Pick<
  Expense,
  | 'wishlist'
  | 'income'
  | 'category'
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
