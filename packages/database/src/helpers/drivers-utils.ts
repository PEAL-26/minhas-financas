import {
  DATABASE_COLUMNS_TYPE_ENUM,
  DatabaseConfigSelect,
  DatabaseCreateTableColumns,
  DatabaseInclude,
  DatabaseOptions,
  DatabaseWhere,
  DatabaseWhereField,
  ListPaginateConfigs,
} from '../types';

import { camelToSnake, snakeToCamel } from 'case-naming-converter';

export function generateQueryFields(select?: DatabaseConfigSelect) {
  if (!select) return ['*'];
  let selectFields: string[] = [];
  const fields = Object.entries(select);

  for (const [field, value] of fields) {
    if (typeof value === 'boolean') {
      selectFields.push(field);
      continue;
    }
    if (typeof value === 'object') {
      const { as } = value;
      selectFields.push(`${field}${as ? ` AS ${as}` : ''}`);
      continue;
    }
  }

  return selectFields;
}

export function generateWhereClause(where?: DatabaseWhere): string {
  if (!where) return '';

  const conditions = Object.entries(where)
    .map(([key, condition]) => {
      let column = key;
      let value: DatabaseWhereField = condition;
      let op = 'equal';
      if (typeof condition === 'object') {
        column = condition?.as || key;
        value = condition?.value !== undefined ? condition.value : undefined;
        op = condition?.op || 'equal';
      }

      if (value !== undefined) {
        const where = {
          equal: `${column} = '${value}'`,
          like: `LOWER(${column}) LIKE LOWER('%${value}%')`,
        }[op];
        return where || '';
      }

      return '';
    })
    .filter(Boolean);

  return conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
}

type Table = { name: string; original: string; type: 'array' | 'object'; reference: string };

let joins: string[] = [];
let fields: string[] = [];
let tables: Table[] = [];

export function generateIncludes(
  tableMain: string,
  include?: DatabaseInclude,
  recursive = false,
  clear = true,
  reference = '',
) {
  if (clear) {
    joins = [];
    fields = [];
    tables = [];
  }

  if (!recursive) {
    joins = [];
    fields = [];
  }

  if (include) {
    const includes = Object.entries(include);
    for (const [table, attributes] of includes) {
      const { singular, as, include, select, type, references, structure: data = 'object' } = attributes;
      const { left, right } = references || {};

      const tableDisplay = `${as || singular || table}`;
      const tableReference = reference ? `${reference}-` : '';
      const queryFields = select
        ? generateQueryFields(select).map((field) => `${tableReference}${tableDisplay}.${field}`)
        : [`${tableReference}${tableDisplay}.*`];

      const tableName = `${table} ${as || singular ? `AS ${as || singular}` : ''}`.trim();

      const referenceLeft = left || `${tableDisplay}.id`;
      const referenceRight = right || `${tableMain}.${singular}_id`;
      const join = `${
        type || ''
      } JOIN ${tableName} ON ${referenceLeft} = ${referenceRight} `.trim();

      tables.push({ name: tableDisplay, original: table, type: data, reference });
      fields.push(...queryFields);
      joins.push(join);

      if (include) {
        generateIncludes(table, include, true, false, tableDisplay);
      }
    }
  }

  return { fields, joins: joins.join('\n'), tables };
}

export function serialize(data: any, tableNames: string[], configs?: { fields: string[] }) {
  const mainTable = tableNames[0];
  let obj: Record<string, any> = {};
  const restTables = tableNames.slice(1);

  for (const [field, value] of Object.entries(data)) {
    if (field.startsWith(mainTable)) {
      const fieldReplaced = field.replaceAll(`${mainTable}_`, '');
      obj[fieldReplaced] = value;
    }

    if (!restTables.length) {
      obj[field] = value;
    }

    let _continue = false;
    if (restTables.length) {
      for (const table of restTables) {
        if (field.startsWith(table)) {
          const fieldReplaced = field.replaceAll(`${table}_`, '');
          if (field === `${table}_${fieldReplaced}`) {
            setNestedValue(obj, `${table}.${fieldReplaced}`, value);
            _continue = true;
            break;
          }
        }
      }
    }

    if (_continue) continue;

    obj[field] = value;
  }

  return snakeToCamel(obj);
}

export function fieldsMap(fields: string[], tables: string[], configs?: { separator?: string }) {
  const { separator = '\`' } = configs || {};
  const newFields = [];
  for (const fieldOld of fields) {
    let referenceTable = '';
    let field = fieldOld;

    if (fieldOld.indexOf('-') > -1) {
      const fieldSplitted = fieldOld.split('-');
      referenceTable = `${fieldSplitted[0]}_`;
      field = fieldSplitted[1];
    }

    if (field === '*' && tables.length === 1) {
      newFields.push(`${tables[0]}.*`);
      break;
    }

    const fieldSplitted = field.split(' AS ');
    const main = fieldSplitted[0]?.trim();
    const fieldAs = fieldSplitted[1]?.trim();
    const [table, _field] = (fieldAs || main).split('.');
    const tableFound = tables.find((t) => t === table);

    if (tableFound) {
      if (_field === '*') {
        newFields.push(`${table}.*`);
      } else {
        const newField = `${referenceTable}${table}_${_field}`;
        newFields.push(`${main} AS ${separator}${newField}${separator}`);
      }
    }

    if (!_field && table && tables.length === 1) {
      const newField = `${referenceTable}${tables[0]}_${table}`;
      newFields.push(`${tables[0]}.${main} AS ${separator}${newField}${separator}`);
    }
  }

  return newFields.join(', ');
}

export function setNestedValue(obj: Record<string, any>, path: string, value: any) {
  const keys = path.split('.');
  let current = obj;

  keys.forEach((key, index) => {
    if (!current[key]) {
      current[key] = {};
    }

    if (index === keys.length - 1) {
      current[key] = value;
    }

    current = current[key];
  });

  return obj;
}

export function generateOrderByClause(orderBy?: Record<string, 'asc' | 'desc'>[]): string {
  if (!orderBy || orderBy.length === 0) {
    return '';
  }

  const orderByClauses = orderBy
    .map((item) => {
      const [column, direction] = Object.entries(item)[0];
      return `${column} ${direction.toUpperCase()}`;
    })
    .join(', ');

  return `ORDER BY ${orderByClauses}`;
}

const NOT_STRING_TYPES = ['boolean', 'number'];

export function generateFieldsValuesCreate(data: Record<string, any>, options?: DatabaseOptions) {
  let fields: string[] = [];
  let values: any[] = [];

  const { casing } = options || {};

  for (const [field, value] of Object.entries(data || {})) {
    if (value === undefined) {
      continue;
    }

    const fieldConvert = caseConverting(field, casing);
    fields.push(fieldConvert);

    if (value === null) {
      values.push(null);
      continue;
    }

    if (typeof value === 'object') {
      values.push(JSON.stringify(value));
      continue;
    }

    // if (typeof value !== "object" && NOT_STRING_TYPES.includes(typeof value)) {
    //   values.push(value);
    //   continue;
    // }

    // values.push(`"${value}"`);
    values.push(value);
  }

  return { fields, values };
}

export function generateFieldsValuesUpdate(data: Record<string, any>, options?: DatabaseOptions) {
  const { casing, symbol = '$' } = options || {};
  let sets: string[] = [];
  let values: string[] = [];
  let order = 0;

  for (const [property, value] of Object.entries(data)) {
    if (property === 'id') continue;

    order++;

    const fieldValue = symbol === '?' ? '?' : `$${order}`;
    const fieldName = caseConverting(property, casing);

    sets.push(`${fieldName}=${fieldValue}`);
    values.push(value);
  }

  if (!sets.length) throw new Error('Deve informar os dados a serem salvos.');

  return { sets, values };
}

export function join(array: any[], separator?: string) {
  let data: string = '';

  let index = 1;
  for (const value of array) {
    let _separator = array.length > index ? separator || '' : '';
    data += `${value}${_separator}`;
    index++;
  }

  return data.trim();
}

export function generateCreateTableScript(
  tableName: string,
  columns: DatabaseCreateTableColumns,
): string {
  // Validação básica
  if (!tableName || !columns || Object.keys(columns).length === 0) {
    throw new Error('O nome da tabela e as colunas são obrigatórios.');
  }

  // Gerar as definições de colunas

  const constraints: string[] = [];
  const columnsDefinition = Object.entries(columns).map(([columnName, attributes]) => {
    if (!DATABASE_COLUMNS_TYPE_ENUM[attributes.dataType]) {
      throw new Error(`Tipo de dado inválido: ${attributes.dataType}`);
    }

    if (attributes?.pk) {
      constraints.push(`PRIMARY KEY (\`${columnName}\`)`);
    }

    if (attributes?.fk) {
      /* TODO Implementar depois */
      constraints.push(
        `CONSTRAINT fk_${attributes.fk.table} FOREIGN KEY (\`${columnName}\`) REFERENCES \`${attributes.fk.table}\` (\`${attributes.fk.reference}\`)`,
      );
    }

    const notNull = attributes?.pk ? 'NOT NULL' : attributes?.notNull ? 'NOT NULL' : 'NULL';

    const defaultValue =
      attributes?.defaultValue !== undefined ? `DEFAULT ${attributes.defaultValue}` : '';

    const autoIncrement = ''; //attributes?.autoIncrement ? `AUTO_INCREMENT` : "";

    return `\`${columnName}\` ${
      DATABASE_COLUMNS_TYPE_ENUM[attributes.dataType]
    } ${autoIncrement} ${notNull} ${defaultValue}`.trim();
  });

  const definitions = [...columnsDefinition, ...constraints];
  // Construir o script de criação da tabela
  const createTableScript = `CREATE TABLE IF NOT EXISTS ${tableName} (${definitions.join(', ')});`;

  return createTableScript;
}

export function generateFn(fn?: Record<string, string>) {
  if (!fn) return '';

  let generate = [];
  for (const [field, value] of Object.entries(fn)) {
    generate.push(`${value} AS ${field}`);
  }

  return generate.join(', ');
}

export function generateGroupBy(group?: string[]) {
  if (!group || !group.length) return '';
  return `GROUP BY ${group.join(', ')}`;
}

export function generateQuerySql(tableName: string, configs?: ListPaginateConfigs) {
  const { select, where, include, orderBy, groupBy, fn } = configs || {};
  const fields = generateQueryFields(select);
  const includes = generateIncludes(tableName, include);

  const whereClause = generateWhereClause(where);
  const includesFields =
    includes.fields.length > 0
      ? `, ${fieldsMap(
          includes.fields,
          includes.tables.map((t) => t.name),
        )}`
      : '';
  const fns = generateFn(fn);
  const orderByClause = generateOrderByClause(orderBy);
  const groups = generateGroupBy(groupBy);

  const baseQuery = `SELECT ${fieldsMap(fields, [tableName])}${includesFields}${
    fns ? `, ${fns}` : ''
  } FROM ${tableName} ${includes.joins} ${whereClause} ${groups} ${orderByClause}`.trim();

  return { baseQuery, includes };
}

export function caseConverting(value: any, casing?: 'snakeCase' | 'camelCase') {
  if (!casing) return value;

  if (casing === 'camelCase') {
    return snakeToCamel(value);
  }

  if (casing === 'snakeCase') {
    return camelToSnake(value);
  }
}

export function insertSql(input: { tableName: string; fields: string[]; symbol?: '$' | '?' }) {
  const { tableName, fields, symbol = '$' } = input;

  const fieldValues = fields
    .map((_, index) => {
      if (symbol === '?') return '?';
      return `$${index + 1}`;
    })
    .join(', ');

  return `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${fieldValues});`;
}

export function updateSql(input: { tableName: string; sets: string[]; symbol?: '$' | '?' }) {
  const { tableName, sets, symbol = '$' } = input;
  const fieldId = symbol === '?' ? '?' : `$${sets.length + 1}`;
  return `UPDATE ${tableName} SET ${sets.join(', ')} WHERE id=${fieldId}`;
}

export function generateIncludeFields(input: {
  fields: string[];
  tables: Table[];
  separator?: string;
}) {
  const { fields, tables, separator } = input;
  if (fields.length > 0) {
    return `, ${fieldsMap(
      fields,
      tables.map((t) => t.name),
      { separator },
    )}`;
  }

  return '';
}

export function generateSelectFields(input: {
  fields: string[];
  tableName: string;
  separator?: string;
}) {
  const { fields, tableName, separator } = input;
  return fieldsMap(fields, [tableName], {
    separator,
  });
}
