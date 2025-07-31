import { Income } from '@repo/types';
import { IRepository } from '../../types';

export type IncomeCreateData = Pick<
  Income,
  | 'title'
  | 'wallet'
  | 'description'
  | 'amount'
  | 'type'
  | 'recurrence'
  | 'duration'
  | 'startDate'
  | 'endDate'
  | 'currency'
  | 'estimatedDateReceipt'
  | 'status'
>;

export type IncomeUpdateData = Partial<IncomeCreateData>;

export abstract class IIncomeRepository extends IRepository<
  Income,
  IncomeCreateData,
  IncomeUpdateData
> {}
