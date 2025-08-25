import { PGliteInterface } from '@electric-sql/pglite';
import { snakeToCamel } from 'case-naming-converter';
import {
  buildInsertIncludeSql,
  buildUpdateIncludeSql,
  deleteSql,
  generateFieldsValuesCreate,
  generateFieldsValuesUpdate,
  generateIncludeFields,
  generateIncludes,
  generateQueryFields,
  generateQuerySql,
  generateSelectFields,
  generateWhereClause,
  insertSql,
  serialize,
  updateSql,
} from '../../helpers/drivers-utils';
import { RelationalSerializer } from '../../helpers/relational-serializer';
import {
  DatabaseConfig,
  DatabaseMutationConfig,
  DatabaseOptions,
  Field,
  IDatabase,
  ListPaginateConfigs,
  PaginatedResult,
  UpdateBulkData,
} from '../../types';

export class DatabasePGLite implements IDatabase {
  constructor(
    private connection: PGliteInterface,
    private options?: DatabaseOptions,
  ) {
    const { symbol = '$', casing = 'snakeCase', separator = '', ...rest } = options || {};
    this.options = { ...rest, symbol, casing };
  }

  async transaction(callback: () => Promise<void>) {
    return this.connection.withTransactionAsync(callback);
  }

  async sqlUnsafe(sql: string): Promise<void> {
    await this.connection.exec(sql);
  }

  async query<T>(sql: string): Promise<T[]> {
    const result = await this.connection.query<T>(sql);
    return result.rows;
  }

  async insert<T>(
    tableName: string,
    data: Record<string, any>,
    configs?: DatabaseMutationConfig,
  ): Promise<T> {
    const { include } = configs || {};
    const options = { ...this.options, symbol: '$' as const };

    const { fields, values: mainValuesInsert } = generateFieldsValuesCreate(data, options);
    const mainSqlInsert = insertSql({ tableName, fields, symbol: options.symbol });
    const insertInclude = buildInsertIncludeSql({
      mainId: data.id,
      include,
      options: this.options,
    });

    await this.connection.transaction(async (tx) => {
      await tx.query(mainSqlInsert, mainValuesInsert);
      await Promise.all(insertInclude.map(({ sql, values }) => tx.query(sql, values)));
    });

    return data as T;
  }

  async insertBulk(tableName: string, data: Record<string, any>[]): Promise<void> {
    // TODO Aplicar o transaction
    await Promise.all(
      data.map((item) => {
        this.insert(tableName, item);
      }),
    );
  }

  async update<T>(
    tableName: string,
    data: Record<string, any>,
    id: string,
    configs?: DatabaseMutationConfig,
  ): Promise<T> {
    const { include } = configs || {};
    const options = { ...this.options, symbol: '$' as const };
    const { sets, values } = generateFieldsValuesUpdate(data, options);
    const sql = updateSql({ tableName, sets, symbol: options.symbol });
    const includeBuild = buildUpdateIncludeSql({ mainId: id, include, options });

    await this.connection.transaction(async (tx) => {
      await tx.query(sql, [...values, id]);

      await Promise.all(
        Object.entries(includeBuild.removes)
          .flatMap(([tableName, fieldsData]) => {
            return fieldsData.map((data) => {
              return deleteSql({ tableName, data, symbol: '$', casing: options?.casing });
            });
          })
          .map(({ sql, values }) => tx.query(sql, values)),
      );

      await Promise.all(includeBuild.inserts.map(({ sql, values }) => tx.query(sql, values)));
    });

    return data as T;
  }

  async updateBulk<T>(tableName: string, data: UpdateBulkData[]): Promise<T[]> {
    // TODO implementar transaction
    await Promise.all(
      data.map((item) => {
        this.update(tableName, item, item.id);
      }),
    );

    return data as T[];
  }

  async delete(tableName: string, where: Record<string, any>): Promise<void> {
    const whereClause = generateWhereClause(where);
    await this.connection.exec(`DELETE FROM ${tableName} ${whereClause}`);
  }

  async getFirst<T>(tableName: string, configs?: DatabaseConfig): Promise<T | null> {
    const { select, where, include } = configs || {};

    const fields = generateQueryFields(select);
    const includes = generateIncludes(tableName, include);
    const whereClause = generateWhereClause(where);
    const includesFields = generateIncludeFields({ ...includes, separator: '' });
    const selectFields = generateSelectFields({ fields, tableName, separator: '' });
    const allSelectFields = selectFields + includesFields;

    const sql = `SELECT ${allSelectFields} FROM ${tableName} ${includes.joins} ${whereClause}`;
    const result = await this.connection.query<T>(sql);

    if (result.rows.length === 0) return null;

    const [data] = new RelationalSerializer({
      mainTable: tableName,
      rowFields: Object.keys(result.rows[0] || {}),
      includesFields: includes.fields,
      include,
    }).serializeResults(result.rows);

    return snakeToCamel(data) as T;
  }

  select<T>(fields: Field<T>, tableName: string): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  async listAll<T>(tableName: string, configs?: DatabaseConfig): Promise<T[]> {
    const { baseQuery, includes } = generateQuerySql(tableName, configs);
    const result = await this.connection.query<T>(baseQuery);
    const data = result.rows.map(
      (item) => serialize(item, [tableName, ...includes.tables.map((t) => t.name)]) as T,
    );

    return data;
  }

  async listPaginate<T>(
    tableName: string,
    configs?: ListPaginateConfigs,
  ): Promise<PaginatedResult<T>> {
    const { size = 10, page = 1 } = configs || {};

    const offset = (page - 1) * size;
    const { baseQuery, includes } = generateQuerySql(tableName, { ...configs, separator: '' });

    const totalItemsQuery = `SELECT COUNT(*) as count FROM (${baseQuery}) as total_count_query`;
    const paginatedQuery = `${baseQuery} LIMIT ${size} OFFSET ${offset}`;

    const [totalItemsResult, result] = await Promise.all([
      this.connection.query<{
        count: number;
      }>(totalItemsQuery),
      this.connection.query<T>(paginatedQuery),
    ]);

    const totalItems = parseInt(String(totalItemsResult.rows?.[0]?.count), 10);
    // const data = result.rows.map(
    //   (item) => serialize(item, [tableName, ...includes.tables.map((t) => t.name)]) as T,
    // );

    const data = new RelationalSerializer({
      mainTable: tableName,
      rowFields: Object.keys(result.rows[0] || {}),
      includesFields: includes.fields,
      include: configs?.include,
    }).serializeResults(result.rows) as T[];

    const totalPages = Math.ceil(totalItems / size);
    const prev = page > 1 ? page - 1 : null;
    const next = page < totalPages ? page + 1 : null;

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
      prev,
      next,
    };
  }

  listAllEach<T>(tableName: string, configs?: DatabaseConfig): AsyncIterableIterator<T> {
    throw new Error('Method not implemented.');
    // const { select, where } = configs || {};
    // const fields = generateQueryFields(select);
    // return this.connection.getEachAsync(`SELECT ${fields} FROM ${tableName}`);
  }
}
