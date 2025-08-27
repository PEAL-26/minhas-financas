import { User } from '@repo/types/user';
import {
  DatabaseConfig,
  IDatabase,
  ListPaginateRepositoryOption,
  PaginatedResult,
} from '../../types';
import { IUserRepository, UserCreateData } from './interface';
import * as mappers from './mappers';

export class UserRepository implements IUserRepository {
  constructor(private database: IDatabase) {}

  async create(input: UserCreateData): Promise<void> {
    const data = mappers.toDatabaseMap(input);
    await this.database.insert('users', data);
  }

  async update(input: Partial<UserCreateData>, id: string): Promise<void> {
    const data = mappers.toDatabaseMap(input);
    await this.database.update('users', data, id);
  }

  async delete(id: string): Promise<void> {
    await this.database.delete('users', { id });
  }

  async getById(id: string): Promise<User | null> {
    const result = await this.database.getFirst('users', { where: { id } });
    if (!result) return null;
    return mappers.toEntityMap(result);
  }

  async listAll(configs?: DatabaseConfig): Promise<User[]> {
    const rows = await this.database.listAll('users', configs);
    return rows.map((row) => mappers.toEntityMap(row));
  }

  async listPaginate(options?: ListPaginateRepositoryOption): Promise<PaginatedResult<User>> {
    const { query, size, page } = options || {};

    const result = await this.database.listPaginate('users', {
      where: { name: { value: query, op: 'like' } },
      size,
      page,
    });

    return {
      ...result,
      data: result.data.map((row) => mappers.toEntityMap(row)),
    };
  }
}
