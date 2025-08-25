export type JoinType = 'inner' | 'left' | 'right';

export interface RelationshipConfig {
  tableName: string;
  alias?: string;
  structure: 'object' | 'array';
  fields?: string[];
  includes?: RelationshipConfig[];
}

export interface SerializationConfig {
  mainTable: string;
  rowFields: string[];
  includesFields: string[];
  include: any;
}

export interface ConfigProps {
  mainTable: string;
  fields: string[];
  includes?: RelationshipConfig[];
}

export interface RawRow {
  [key: string]: any;
}

export interface SerializedData {
  [key: string]: any;
}
