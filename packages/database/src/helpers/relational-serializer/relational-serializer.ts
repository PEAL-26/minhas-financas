import { DatabaseInclude } from '../../types';
import {
  ConfigProps,
  RawRow,
  RelationshipConfig,
  SerializationConfig,
  SerializedData,
} from './types';

export class RelationalSerializer {
  private config: ConfigProps;

  constructor(config: SerializationConfig) {
    this.config = {
      mainTable: config.mainTable,
      fields: this.buildFields(config.rowFields, config.includesFields),
      includes: this.buildInclude(config.include),
    };
  }

  private buildFields(rowFields: string[], excludeFields: string[]) {
    let result = rowFields;

    excludeFields.forEach((field) => {
      result = result.filter(
        (rowField) => rowField != field.replaceAll('.', '_').replaceAll('-', '_'),
      );
    });

    return result;
  }

  private buildInclude(input?: DatabaseInclude): RelationshipConfig[] {
    return Object.entries(input || {}).map(([tableName, values]) => {
      return {
        tableName,
        alias: values?.singular || values?.as,
        structure: values.structure || 'object',
        fields: this.buildFields(Object.keys(values.select || {}), []),
        includes: this.buildInclude(values.include),
      };
    });
  }

  public serializeResults<T = RawRow>(rows: T[]): SerializedData[] {
    if (rows.length === 0) return [];

    const resultMap = new Map<string, SerializedData>();

    for (const row of rows as RawRow[]) {
      const mainId = row[`${this.config.mainTable}_id`] || row.id;

      if (!resultMap.has(mainId)) {
        resultMap.set(mainId, this.serializeMainRow(row));
      }

      const currentResult = resultMap.get(mainId)!;

      if (this.config.includes) {
        this.processIncludes(row, currentResult, this.config.includes);
      }
    }

    return Array.from(resultMap.values());
  }

  private serializeMainRow(row: RawRow): SerializedData {
    const result: SerializedData = {};

    if (this.config.fields.length === 0) {
      Object.entries(row).forEach(([field]) => {
        if (row[field] !== undefined) {
          result[field] = row[field];
        }
      });
    } else {
      this.config.fields.forEach((field) => {
        const dbField = field;
        const resultField = field.includes('.') ? field.split('.')[1] : field;

        if (row[dbField] !== undefined) {
          result[resultField] = row[dbField];
        }
      });
    }

    return result;
  }

  private processIncludes(
    row: RawRow,
    result: SerializedData,
    includes: RelationshipConfig[],
    parentPrefix?: string,
  ): void {
    for (const include of includes) {
      const tableName = include.alias || include.tableName;
      const prefix = parentPrefix ? `${parentPrefix}_${tableName}` : `${tableName}`;

      this.processSingleInclude(row, result, include, prefix);
    }
  }

  private processSingleInclude(
    row: RawRow,
    result: SerializedData,
    include: RelationshipConfig,
    prefix: string,
  ): void {
    const relationshipField = include.alias || include.tableName;

    // Verifica se há dados para esta relação
    const hasData = include.fields?.some(
      (field) => row[`${prefix}_${field}`] !== undefined && row[`${prefix}_${field}`] !== null,
    );

    if (!hasData) {
      if (include.structure === 'object') {
        result[relationshipField] = null;
      } else {
        result[relationshipField] = result[relationshipField] || [];
      }
      return;
    }

    if (include.structure === 'object') {
      if (!result[relationshipField]) {
        result[relationshipField] = this.serializeIncludeObject(row, include, prefix);
      }
    } else {
      // Para arrays, precisamos verificar se este item específico já foi adicionado
      result[relationshipField] = result[relationshipField] || [];

      const serializedItem = this.serializeIncludeObject(row, include, prefix);
      result[relationshipField].push(serializedItem);
    }

    // Processa includes aninhados
    if (include.includes) {
      const currentData =
        include.structure === 'object'
          ? result[relationshipField]
          : result[relationshipField][result[relationshipField].length - 1];

      if (currentData) {
        this.processIncludes(row, currentData, include.includes, prefix);
      }
    }
  }

  private serializeIncludeObject(
    row: RawRow,
    include: RelationshipConfig,
    prefix: string,
  ): SerializedData {
    const result: SerializedData = {};

    if (include.fields) {
      include.fields.forEach((field) => {
        const dbField = `${prefix}_${field}`;
        if (row[dbField] !== undefined) {
          result[field] = row[dbField];
        }
      });
    }

    return result;
  }
}
