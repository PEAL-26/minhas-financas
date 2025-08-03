import { Category } from '@repo/types';
import {
  DatabaseConfig,
  IDatabase,
  ListPaginateRepositoryOption,
  PaginatedResult,
} from '../../types';
import { CategoryCreateData, CategoryUpdateData, ICategoryRepository } from './interface';
import { categoryToEntityMap } from './mappers';

export class CategoryRepository implements ICategoryRepository {
  constructor(private database: IDatabase) {}

  async create(data: CategoryCreateData): Promise<void> {
    await this.database.insert('categories', data);
  }

  async update(data: CategoryUpdateData, id: string): Promise<void> {
    await this.database.update('categories', data, id);
  }

  async delete(id: string): Promise<void> {
    await this.database.delete('categories', { id });
  }

  async getById(id: string): Promise<Category | null> {
    const result = await this.database.getFirst('categories', { where: { id } });
    if (!result) return null;
    return categoryToEntityMap(result);
  }

  async listAll(configs?: DatabaseConfig): Promise<Category[]> {
    const rows = await this.database.listAll('categories', configs);
    return rows.map((row) => categoryToEntityMap(row));
  }

  async listPaginate(options?: ListPaginateRepositoryOption): Promise<PaginatedResult<Category>> {
    const { query, size, page } = options || {};

    const result = await this.database.listPaginate('categories', {
      where: { name: { value: query, op: 'like' } },
      size,
      page,
    });

    return {
      ...result,
      data: result.data.map((row) => categoryToEntityMap(row)),
    };
  }
}
