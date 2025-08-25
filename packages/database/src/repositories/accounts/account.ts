import { Account } from '@repo/types/account';
import {
  DatabaseConfig,
  IDatabase,
  ListPaginateRepositoryOption,
  PaginatedResult,
} from '../../types';
import { AccountCreateData, AccountUpdateData, IAccountRepository } from './interface';
import * as mappers from './mappers';

export class AccountRepository implements IAccountRepository {
  constructor(private database: IDatabase) {}

  async create(input: AccountCreateData): Promise<void> {
    const data = mappers.toDatabaseMap(input);
    await this.database.insert('accounts', data);
  }

  async update(input: AccountUpdateData, id: string): Promise<void> {
    const data = mappers.toDatabaseMap(input);
    await this.database.update('accounts', data, id);
  }

  async delete(id: string): Promise<void> {
    await this.database.delete('accounts', { id });
  }

  async getById(id: string): Promise<Account | null> {
    const result = await this.database.getFirst('accounts', { where: { id } });
    if (!result) return null;
    return mappers.toEntityMap(result);
  }

  async listAll(configs?: DatabaseConfig): Promise<Account[]> {
    const rows = await this.database.listAll('accounts', configs);
    return rows.map((row) => mappers.toEntityMap(row));
  }

  async listPaginate(options?: ListPaginateRepositoryOption): Promise<PaginatedResult<Account>> {
    const { query, size, page } = options || {};

    const result = await this.database.listPaginate('accounts', {
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
