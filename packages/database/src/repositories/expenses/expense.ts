import { Expense } from '@repo/types';
import {
  DatabaseConfig,
  IDatabase,
  ListPaginateRepositoryOption,
  PaginatedResult,
} from '../../types';
import { ExpenseCreateData, IExpenseRepository } from './interface';
import { expenseToEntityMap } from './mappers';

export class ExpenseRepository implements IExpenseRepository {
  constructor(private database: IDatabase) {}

  async create(data: ExpenseCreateData): Promise<void> {
    await this.database.insert('expenses', data);
  }

  async update(data: Partial<ExpenseCreateData>, id: string): Promise<void> {
    await this.database.update('expenses', data, id);
  }

  async delete(id: string): Promise<void> {
    await this.database.delete('expenses', { id });
  }

  async getById(id: string): Promise<Expense | null> {
    const result = await this.database.getFirst('expenses', { where: { id } });
    if (!result) return null;
    return expenseToEntityMap(result);
  }

  async listAll(configs?: DatabaseConfig): Promise<Expense[]> {
    const rows = await this.database.listAll('expenses', configs);
    return rows.map((row) => expenseToEntityMap(row));
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
      data: result.data.map((row) => expenseToEntityMap(row)),
    };
  }
}
