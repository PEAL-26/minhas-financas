import { randomUUID } from '@repo/database/helpers/uuid';
import { wait } from '@repo/helpers/wait';
import { paginateData } from '../helpers/pagination';
import {
  DatabaseConfig,
  Field,
  IDatabase,
  ListPaginateConfigs,
  PaginatedResult,
  UpdateBulkData,
} from '../types';

export class DatabaseInMemory implements IDatabase {
  private repositories: Record<string, Record<string, any>[]> = {};

  transaction(callback: () => Promise<void>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  sqlUnsafe(sql: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  query<T>(sql: string): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  async listAll<T>(tableName: string, configs?: DatabaseConfig): Promise<T[]> {
    await wait();
    const rows = this.repositories[tableName] || [];
    return rows as T[];
  }

  async listPaginate<T>(
    tableName: string,
    configs?: ListPaginateConfigs,
  ): Promise<PaginatedResult<T>> {
    await wait();
    const { page = 1, size = 10 } = configs || {};
    const data = (this.repositories[tableName] || []) as T[];
    return paginateData(data, { totalItems: data.length, page, limit: size });
  }

  listAllEach<T>(tableName: string, configs?: ListPaginateConfigs): AsyncIterableIterator<T> {
    throw new Error('Method not implemented.');
  }

  async insert<T>(tableName: string, data: Record<string, any>): Promise<T> {
    await wait();
    if (!this.repositories[tableName]) this.repositories[tableName] = [];
    this.repositories[tableName].push({
      ...data,
      id: randomUUID(),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    });

    return data as T;
  }

  insertBulk(tableName: string, data: Record<string, any>[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async update<T>(tableName: string, data: Record<string, any>, id: any): Promise<T> {
    await wait();
    const rows = this.repositories[tableName] ?? [];

    const row = rows.find((r) => r.id === id);

    if (!row) {
      throw new Error('resource not found.');
    }

    const dataUpdated = { ...row };

    this.repositories[tableName] = rows.map((row) => {
      if (row.id === id) {
        Object.entries(data).forEach(([property, value]) => {
          if (value !== undefined && value !== dataUpdated[property]) {
            dataUpdated[property] = value;
          }
        });

        dataUpdated.updatedAt = new Date().getTime();
        return dataUpdated;
      }

      return row;
    });

    return dataUpdated as T;
  }

  updateBulk<T>(tableName: string, data: UpdateBulkData[]): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  async delete(tableName: string, where: Record<string, any>): Promise<void> {
    await wait();
    const rows = this.repositories[tableName] ?? [];

    const newRows = rows.filter((r) => !filter(r, where));

    this.repositories[tableName] = newRows;
  }

  select<T>(fields: Field<T>, tableName: string): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  async getFirst<T>(tableName: string, configs?: DatabaseConfig): Promise<T | null> {
    await wait();
    const { where = {} } = configs || {};

    const rows = this.repositories[tableName] || [];
    const row = rows.find((r) => filter(r, where));

    return (row as T) || null;
  }
}

const filter = (row: Record<string, any>, where: Record<string, any>) => {
  let match = false;

  Object.entries(where).forEach(([property, value]) => {
    match = false;

    if (row[property] === value) {
      match = true;
    }
  });

  return match;
};
