export abstract class IConnection<
  TParams,
  TSQLiteStatement,
  TTransaction,
  SQLiteBindParams,
  SQLiteRunResult extends { lastInsertRowId: any },
  SQLiteVariadicBindParams extends Array<TParams>,
> {
  abstract isInTransactionAsync(): Promise<boolean>;
  abstract closeAsync(): Promise<void>;
  abstract execAsync(source: string): Promise<void>;
  abstract serializeAsync(databaseName: string): Promise<Uint8Array>;
  abstract prepareAsync(source: string): Promise<TSQLiteStatement>;
  abstract withTransactionAsync(task: () => Promise<void>): Promise<void>;
  abstract withExclusiveTransactionAsync(task: (txn: TTransaction) => Promise<void>): Promise<void>;
  abstract isInTransactionSync(): boolean;
  abstract closeSync(): void;
  abstract execSync(source: string): void;
  abstract serializeSync(databaseName: string): Uint8Array;
  abstract prepareSync(source: string): TSQLiteStatement;
  abstract withTransactionSync(task: () => void): void;
  abstract runAsync(source: string, params: SQLiteBindParams): Promise<SQLiteRunResult>;
  abstract runAsync(source: string, ...params: SQLiteVariadicBindParams): Promise<SQLiteRunResult>;
  abstract runAsync(source: string, ...params: any[]): Promise<SQLiteRunResult>;
  abstract getFirstAsync<T>(source: string, params: SQLiteBindParams): Promise<T | null>;
  abstract getFirstAsync<T>(source: string, ...params: SQLiteVariadicBindParams): Promise<T | null>;
  abstract getFirstAsync<T>(source: string, ...params: any[]): Promise<T | null>;
  abstract getEachAsync<T>(source: string, params: SQLiteBindParams): AsyncIterableIterator<T>;
  abstract getEachAsync<T>(
    source: string,
    ...params: SQLiteVariadicBindParams
  ): AsyncIterableIterator<T>;
  abstract getAllAsync<T>(source: string, params: SQLiteBindParams): Promise<T[]>;
  abstract getAllAsync<T>(source: string, ...params: SQLiteVariadicBindParams): Promise<T[]>;
  abstract getAllAsync<T>(source: string, ...params: any[]): Promise<T[]>;
  abstract runSync(source: string, params: SQLiteBindParams): SQLiteRunResult;
  abstract runSync(source: string, ...params: SQLiteVariadicBindParams): SQLiteRunResult;
  abstract runSync(source: string, ...params: any[]): SQLiteRunResult;
  abstract getFirstSync<T>(source: string, params: SQLiteBindParams): T | null;
  abstract getFirstSync<T>(source: string, ...params: SQLiteVariadicBindParams): T | null;
  abstract getFirstSync<T>(source: string, ...params: any[]): T | null;
  abstract getEachSync<T>(source: string, params: SQLiteBindParams): IterableIterator<T>;
  abstract getEachSync<T>(source: string, ...params: SQLiteVariadicBindParams): IterableIterator<T>;
  abstract getAllSync<T>(source: string, params: SQLiteBindParams): T[];
  abstract getAllSync<T>(source: string, ...params: SQLiteVariadicBindParams): T[];
  abstract getAllSync<T>(source: string, ...params: any[]): T[];
}
