import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import { randomUUID } from './uuid';

export function toDatabasePropertiesCommonMap(entity: {
  id?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}) {
  return {
    id: entity?.id || randomUUID(),
    createdAt: entity?.createdAt ? new Date(entity?.createdAt).getTime() : new Date().getTime(),
    updatedAt: entity?.updatedAt ? new Date(entity?.updatedAt).getTime() : new Date().getTime(),
  };
}

export function toEntityPropertiesCommonMap(entity: {
  id: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}) {
  return {
    id: entity?.id,
    createdAt: checkNullUndefinedValue(entity?.createdAt, { fn: (value) => new Date(value) }),
    updatedAt: checkNullUndefinedValue(entity?.updatedAt, { fn: (value) => new Date(value) }),
  };
}
