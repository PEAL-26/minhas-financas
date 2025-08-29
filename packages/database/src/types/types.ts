import { DatabaseOptions } from './database';

export type Field<T> = Record<keyof T, SelectField>;
export type SelectField = boolean | { as?: string; to_replace?: boolean };
export type DatabaseConfigSelect = {
  [key: string]: SelectField;
};

export type DatabaseWhereFieldValue = string | number | boolean | undefined | null;
export type WhereOp = 'equal' | 'like';
export type DatabaseWhereField =
  | DatabaseWhereFieldValue
  | {
      value: DatabaseWhereFieldValue;
      as?: string;
      op?: WhereOp;
    };

export type DatabaseWhere = {
  [key: string]: DatabaseWhereField;
};

export type DatabaseCasingTypes = 'camelCase' | 'snakeCase';

export type DatabaseIncludeProps = {
  structure?: 'object' | 'array';
  type?: 'INNER' | 'LEFT' | 'RIGHT';
  as?: string;
  singular?: string;
  select?: DatabaseConfigSelect;
  include?: DatabaseInclude;
  references?: { left: string; right: string };
};

export type DatabaseInclude = {
  [key: string]: DatabaseIncludeProps;
};

export type DatabaseMutationIncludeProps = Pick<DatabaseIncludeProps, 'as'> & {
  data: any;
  foreignKey: string;
  key?: string;
  tableName: string;
};

export type DatabaseMutationInputData = Record<string, any>;

export type DatabaseMutationConfig = {
  include?: {
    [key: string]: DatabaseMutationIncludeProps;
  };
};

export interface BuildInsertIncludeSqlInput {
  mainId: string;
  include?: Record<string, DatabaseMutationIncludeProps>;
  options?: DatabaseOptions;
}

export type DatabaseConfig = {
  select?: DatabaseConfigSelect;
  fn?: Record<string, string>;
  where?: DatabaseWhere;
  include?: DatabaseInclude;
  orderBy?: Record<string, 'asc' | 'desc'>[];
  groupBy?: string[];
};

export interface ListPaginateConfigs extends DatabaseConfig {
  size?: number;
  page?: number;
}

export interface GenerateQuerySqlConfig extends ListPaginateConfigs {
  separator?: string;
  casing?: DatabaseCasingTypes;
}

export interface ListPaginateRepositoryOption {
  query?: string;
  size?: number;
  page?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  prev: number | null;
  next: number | null;
}

export type UpdateBulkData = Record<string, any> & {
  id: any;
};

export enum DATABASE_COLUMNS_TYPE_ENUM {
  'INTEGER' = 'INTEGER',
  'TEXT' = 'TEXT',
  'BLOB' = 'BLOB',
  'REAL' = 'REAL',
  'NUMERIC' = 'NUMERIC',
}

export const DATABASE_COLUMNS_TYPE_ENUM_MAP: Record<DATABASE_COLUMNS_TYPE_ENUM, string> = {
  INTEGER: 'Inteiro',
  TEXT: 'Texto',
  BLOB: 'Dados',
  REAL: 'Real',
  NUMERIC: 'Numérico',
};

type FK = {
  table: string;
  reference: string;
};

type DatabaseCreateTableColumnsAttribute = {
  dataType: DATABASE_COLUMNS_TYPE_ENUM;
  as?: string;
  fk?: FK;
  pk?: boolean;
  notNull?: boolean;
  autoIncrement?: boolean;
  defaultValue?: any;
};

export type DatabaseCreateTableColumns = Record<string, DatabaseCreateTableColumnsAttribute>;
