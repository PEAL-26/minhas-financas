import { schemaTypes } from '@repo/types/schemas';
import { repositories } from '../../repositories';
import { IDatabase } from '../../types';
import { RepositoryName, SchemaTypes } from './types';

export function getRepository(repositoryName: RepositoryName, database: IDatabase) {
  const repository = new repositories[repositoryName](database);
  return repository;
}

export function getSchema(type: SchemaTypes) {
  const schema = schemaTypes[type];
  return schema;
}
