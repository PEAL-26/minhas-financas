import { Transaction } from '@repo/types/transaction';
import { IRepository } from '../../types';

export type TransactionCreateData = Pick<
  Transaction,
  'type' | 'date' | 'incomes' | 'expenses' | 'totalAmount' | 'note'
>;

export type TransactionUpdateData = Partial<TransactionCreateData>;

export abstract class ITransactionRepository extends IRepository<
  Transaction,
  TransactionCreateData,
  TransactionUpdateData
> {}
