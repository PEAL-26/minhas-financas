import { schemaTypes } from '@repo/types';
import { repositories } from '../repositories';

export type RepositoryName = keyof typeof repositories;
export type SchemaTypes = keyof typeof schemaTypes;
