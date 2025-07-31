import { randomUUID } from '@repo/database/helpers/uuid';
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
    const rows = this.repositories[tableName] || [];
    return rows as T[];
  }

  listPaginate<T>(tableName: string, configs?: ListPaginateConfigs): Promise<PaginatedResult<T>> {
    throw new Error('Method not implemented.');
  }

  listAllEach<T>(tableName: string, configs?: ListPaginateConfigs): AsyncIterableIterator<T> {
    throw new Error('Method not implemented.');
  }

  async insert<T>(tableName: string, data: Record<string, any>): Promise<T> {
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

  update<T>(tableName: string, data: Record<string, any>, id: any): Promise<T> {
    throw new Error('Method not implemented.');
  }

  updateBulk<T>(tableName: string, data: UpdateBulkData[]): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  delete(tableName: string, where: Record<string, any>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  select<T>(fields: Field<T>, tableName: string): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  getFirst<T>(tableName: string, configs?: DatabaseConfig): Promise<T | null> {
    throw new Error('Method not implemented.');
  }
}
