import { User } from '@repo/types/user';
import { toDatabasePropertiesCommonMap, toEntityPropertiesCommonMap } from '../../helpers/map';

export function toEntityMap(raw: any): User {
  // TODO Melhorar o mapeamento
  return {
    name: raw.name,
    email: raw.email,
    passwordHash: raw.passwordHash,
    providerId: raw.providerId,
    ...toEntityPropertiesCommonMap(raw),
  };
}

export function toDatabaseMap(entity: Partial<User>) {
  return {
    name: entity.name,
    email: entity.email,
    passwordHash: entity.passwordHash,
    providerId: entity.providerId,
    ...toDatabasePropertiesCommonMap(entity),
  };
}
