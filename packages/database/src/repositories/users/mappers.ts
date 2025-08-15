import { User } from '@repo/types/user';

export function userToEntityMap(raw: any): User {
  // TODO Melhorar o mapeamento
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    passwordHash: raw.passwordHash,
    providerId: raw.providerId,
    createdAt: raw?.createdAt ? new Date(raw?.createdAt) : raw?.createdAt,
    updatedAt: raw?.updatedAt ? new Date(raw?.updatedAt) : raw?.updatedAt,
  };
}

export function userToDatabaseMap(entity: User) {
  return {
    name: entity.name,
    email: entity.email,
    passwordHash: entity.passwordHash,
    providerId: entity.providerId,
  };
}
