import { Transaction } from '@repo/types/transaction';
import {
  DatabaseConfig,
  IDatabase,
  ListPaginateRepositoryOption,
  PaginatedResult,
} from '../../types';
import { ITransactionRepository, TransactionCreateData } from './interface';
import * as mappers from './mappers';

export class TransactionRepository implements ITransactionRepository {
  constructor(private database: IDatabase) {}

  async create(input: TransactionCreateData): Promise<void> {
    const data = mappers.toDatabaseMap(input);
    await this.database.insert('transactions', data);
  }

  async update(input: Partial<TransactionCreateData>, id: string): Promise<void> {
    const data = mappers.toDatabaseMap(input);
    await this.database.update('transactions', data, id);
  }

  async delete(id: string): Promise<void> {
    await this.database.delete('transactions', { id });
  }

  async getById(id: string): Promise<Transaction | null> {
    const result = await this.database.getFirst('transactions', { where: { id } });
    if (!result) return null;
    return mappers.toEntityMap(result);
  }

  async listAll(configs?: DatabaseConfig): Promise<Transaction[]> {
    const rows = await this.database.listAll('transactions', configs);
    return rows.map((row) => mappers.toEntityMap(row));
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
      data: result.data.map((row) => mappers.toEntityMap(row)),
    };
  }
}
