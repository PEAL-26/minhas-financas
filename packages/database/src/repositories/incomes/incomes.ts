import { Income } from '@repo/types/income';
import {
  DatabaseConfig,
  IDatabase,
  ListPaginateRepositoryOption,
  PaginatedResult,
} from '../../types';
import { IIncomeRepository, IncomeCreateData } from './interface';
import { incomeToEntityMap } from './mappers';

export class IncomeRepository implements IIncomeRepository {
  constructor(private database: IDatabase) {}

  async create(data: IncomeCreateData): Promise<void> {
    await this.database.insert('incomes', data);
  }

  async update(data: Partial<IncomeCreateData>, id: string): Promise<void> {
    await this.database.update('incomes', data, id);
  }

  async delete(id: string): Promise<void> {
    await this.database.delete('incomes', { id });
  }

  async getById(id: string): Promise<Income | null> {
    const result = await this.database.getFirst('incomes', { where: { id } });
    if (!result) return null;
    return incomeToEntityMap(result);
  }

  async listAll(configs?: DatabaseConfig): Promise<Income[]> {
    const rows = await this.database.listAll('incomes', configs);
    return rows.map((row) => incomeToEntityMap(row));
  }

  async listPaginate(options?: ListPaginateRepositoryOption): Promise<PaginatedResult<Income>> {
    const { query, size, page } = options || {};

    const result = await this.database.listPaginate('incomes', {
      where: { title: { value: query, op: 'like' } },
      size,
      page,
    });

    return {
      ...result,
      data: result.data.map((row) => incomeToEntityMap(row)),
    };
  }
}
