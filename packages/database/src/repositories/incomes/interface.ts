import { Income } from '@repo/types/income';
import { IRepository } from '../../types';

export type IncomeCreateData = Pick<
  Income,
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
