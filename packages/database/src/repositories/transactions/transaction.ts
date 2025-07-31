import { Transaction } from '@repo/types';
import { IDatabase, ListPaginateRepositoryOption, PaginatedResult } from '../../types';
import { ITransactionRepository, TransactionCreateData } from './interface';
import { transactionToEntityMap } from './mappers';

export class TransactionRepository implements ITransactionRepository {
  constructor(private database: IDatabase) {}

  async create(data: TransactionCreateData): Promise<void> {
    await this.database.insert('transactions', data);
  }

  async update(data: Partial<TransactionCreateData>, id: string): Promise<void> {
    await this.database.update('transactions', data, id);
  }

  async delete(id: string): Promise<void> {
    await this.database.delete('transactions', { id });
  }

  async getById(id: string): Promise<Transaction | null> {
    const result = await this.database.getFirst('transactions', { where: { id } });
    if (!result) return null;
    return transactionToEntityMap(result);
  }

  async listAll(): Promise<Transaction[]> {
    const rows = await this.database.listAll('transactions');
    return rows.map((row) => transactionToEntityMap(row));
  }

  async listPaginate(
    options?: ListPaginateRepositoryOption,
  ): Promise<PaginatedResult<Transaction>> {
    const { query, size, page } = options || {};

    const result = await this.database.listPaginate('transactions', {
      //where: { title: { value: query, op: 'like' } },
      size,
      page,
    });

    return {
      ...result,
      data: result.data.map((row) => transactionToEntityMap(row)),
    };
  }
}
