import { PGliteInterface } from '@electric-sql/pglite';
import { isEmpty } from '@repo/helpers/empty';
import { snakeToCamel } from 'case-naming-converter';
import {
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
  ) {}

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
    const { fields, values: mainValuesInsert } = generateFieldsValuesCreate(data, this.options);
    const mainSqlInsert = insertSql({ tableName, fields, symbol: '$' });

    const setForeignKey = (data: any, include: any, foreignKeyValue: any) => {
      if (include?.foreignKey) {
        data[include?.foreignKey as any] = foreignKeyValue;
      }
    };

    const insertInclude: { sql: string; values: any[] }[] = [];
    for (const [property, values] of Object.entries(include || {})) {
      if (isEmpty(values.data)) continue;

      if (Array.isArray(values.data)) {
        for (let includeData of values.data) {
          setForeignKey(includeData, include?.[property], data.id);
          const includeFields = generateFieldsValuesCreate(includeData, this.options);
          const sql = insertSql({
            tableName: values.tableName,
            fields: includeFields.fields,
            symbol: '$',
          });
          insertInclude.push({ sql, values: includeFields.values });
        }
      } else {
        setForeignKey(values.data, include?.[property], data.id);
        const includeFields = generateFieldsValuesCreate(values.data, this.options);
        const sql = insertSql({
          tableName: values.tableName,
          fields: includeFields.fields,
          symbol: '$',
        });

        insertInclude.push({ sql, values: includeFields.values });
      }

      data[property] = values.data;
    }

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
    const { sets, values } = generateFieldsValuesUpdate(data, { ...this.options, symbol: '$' });
    const sql = updateSql({ tableName, sets, symbol: '$' });
    await this.connection.query(sql, [...values, id]);

    data.id = id;

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
    const { baseQuery, includes } = generateQuerySql(tableName, configs);

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
