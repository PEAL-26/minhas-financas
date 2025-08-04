import { User } from '@repo/types';
import {
  DatabaseConfig,
  IDatabase,
  ListPaginateRepositoryOption,
  PaginatedResult,
} from '../../types';
import { IUserRepository, UserCreateData } from './interface';
import { userToEntityMap } from './mappers';

export class UserRepository implements IUserRepository {
  constructor(private database: IDatabase) {}

  async create(data: UserCreateData): Promise<void> {
    await this.database.insert('users', data);
  }

  async update(data: Partial<UserCreateData>, id: string): Promise<void> {
    await this.database.update('users', data, id);
  }

  async delete(id: string): Promise<void> {
    await this.database.delete('users', { id });
  }

  async getById(id: string): Promise<User | null> {
    const result = await this.database.getFirst('users', { where: { id } });
    if (!result) return null;
    return userToEntityMap(result);
  }

  async listAll(configs?: DatabaseConfig): Promise<User[]> {
    const rows = await this.database.listAll('users', configs);
    return rows.map((row) => userToEntityMap(row));
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
      data: result.data.map((row) => userToEntityMap(row)),
    };
  }
}
