import {
  DatabaseConfig,
  Field,
  IDatabase,
  ListPaginateConfigs,
  PaginatedResult,
  UpdateBulkData,
} from '../types';

export class DatabaseFirebase implements IDatabase {
  constructor(private connection: any) {}

  transaction(callback: () => Promise<void>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  sqlUnsafe(sql: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  query<T>(sql: string): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  listAll<T>(tableName: string, configs?: DatabaseConfig): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  listPaginate<T>(tableName: string, configs?: ListPaginateConfigs): Promise<PaginatedResult<T>> {
    throw new Error('Method not implemented.');
  }

  listAllEach<T>(tableName: string, configs?: ListPaginateConfigs): AsyncIterableIterator<T> {
    throw new Error('Method not implemented.');
  }

  insert<T>(tableName: string, data: Record<string, any>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  insertBulk(tableName: string, data: Record<string, any>[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update<T>(tableName: string, data: Record<string, any>, id: number): Promise<T> {
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
