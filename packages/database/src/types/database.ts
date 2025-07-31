import {
  DatabaseConfig,
  Field,
  ListPaginateConfigs,
  ListPaginateRepositoryOption,
  PaginatedResult,
  UpdateBulkData,
} from './types';

export abstract class IDatabase {
  abstract transaction(callback: () => Promise<void>): Promise<void>;
  abstract sqlUnsafe(sql: string): Promise<void>;
  abstract query<T>(sql: string): Promise<T[]>;
  abstract listAll<T>(tableName: string, configs?: DatabaseConfig): Promise<T[]>;
  abstract listPaginate<T>(
    tableName: string,
    configs?: ListPaginateConfigs,
  ): Promise<PaginatedResult<T>>;
  abstract listAllEach<T>(
    tableName: string,
    configs?: ListPaginateConfigs,
  ): AsyncIterableIterator<T>;
  abstract insert<T>(tableName: string, data: Record<string, any>): Promise<T>;
  abstract insertBulk(tableName: string, data: Record<string, any>[]): Promise<void>;
  abstract update<T>(tableName: string, data: Record<string, any>, id: any): Promise<T>;
  abstract updateBulk<T>(tableName: string, data: UpdateBulkData[]): Promise<T[]>;
  abstract delete(tableName: string, where: Record<string, any>): Promise<void>;
  abstract select<T>(fields: Field<T>, tableName: string): Promise<T[]>;
  abstract getFirst<T>(tableName: string, configs?: DatabaseConfig): Promise<T | null>;
}

export abstract class IRepository<T, TCreate, TUpdate> {
  abstract create(data: TCreate): Promise<void>;
  abstract update(data: TUpdate, id: string): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract getById(id: string): Promise<T | null>;
  abstract listAll(): Promise<T[]>;
  abstract listPaginate(options?: ListPaginateRepositoryOption): Promise<PaginatedResult<T>>;
}
