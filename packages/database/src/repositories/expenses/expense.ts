import { Expense } from '@repo/types/expense';
import {
  DatabaseConfig,
  IDatabase,
  ListPaginateRepositoryOption,
  PaginatedResult,
} from '../../types';
import { categoryInclude, expensesPricesInclude, incomeInclude, wishlistInclude } from './includes';
import { ExpenseCreateData, IExpenseRepository } from './interface';
import * as mappers from './mappers';

export class ExpenseRepository implements IExpenseRepository {
  constructor(private database: IDatabase) {}

  async create(input: ExpenseCreateData): Promise<void> {
    const { prices, ...data } = mappers.toDatabaseMap(input);
    await this.database.insert('expenses', data, {
      include: {
        prices: {
          tableName: 'expenses_prices',
          foreignKey: 'expenseId',
          data: prices,
        },
      },
    });
  }

  async update(input: Partial<ExpenseCreateData>, id: string): Promise<void> {
    const { prices, ...data } = mappers.toDatabaseMap(input);
    await this.database.update('expenses', data, id, {
      include: {
        prices: {
          tableName: 'expenses_prices',
          foreignKey: 'expenseId',
          data: prices,
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.database.delete('expenses', { id });
  }

  async getById(id: string): Promise<Expense | null> {
    const result = await this.database.getFirst('expenses', {
      where: { 'expenses.id': id },
      include: {
        wishlist: wishlistInclude,
        categories: categoryInclude,
        incomes: incomeInclude,
        expenses_prices: expensesPricesInclude,
      },
    });
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
      where: { description: { value: query, op: 'like' } },
      size,
      page,
      include: {
        wishlist: { ...wishlistInclude, select: { name: true }, include: undefined },
        categories: categoryInclude,
      },
    });

    return {
      ...result,
      data: result.data.map((row) => mappers.toEntityMap(row)),
    };
  }
}
