import { Expense } from '@repo/types/expense';
import {
  DatabaseConfig,
  IDatabase,
  ListPaginateRepositoryOption,
  PaginatedResult,
} from '../../types';
import { ExpenseCreateData, IExpenseRepository } from './interface';
import * as mappers from './mappers';

export class ExpenseRepository implements IExpenseRepository {
  constructor(private database: IDatabase) {}

  async create(input: ExpenseCreateData): Promise<void> {
    const data = mappers.toDatabaseMap(input);
    await this.database.insert('expenses', data);
  }

  async update(input: Partial<ExpenseCreateData>, id: string): Promise<void> {
    const data = mappers.toDatabaseMap(input);
    await this.database.update('expenses', data, id);
  }

  async delete(id: string): Promise<void> {
    await this.database.delete('expenses', { id });
  }

  async getById(id: string): Promise<Expense | null> {
    const result = await this.database.getFirst('expenses', { where: { id } });
    if (!result) return null;
    return mappers.toEntityMap(result);
  }

  async listAll(configs?: DatabaseConfig): Promise<Expense[]> {
    const rows = await this.database.listAll('expenses', configs);
    return rows.map((row) => mappers.toEntityMap(row));
  }

  async listPaginate(options?: ListPaginateRepositoryOption): Promise<PaginatedResult<Expense>> {
    const { query, size, page } = options || {};

    const result = await this.database.listPaginate('expenses', {
      where: { title: { value: query, op: 'like' } },
      size,
      page,
    });

    return {
      ...result,
      data: result.data.map((row) => mappers.toEntityMap(row)),
    };
  }
}
