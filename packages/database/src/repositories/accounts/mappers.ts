import { Account } from '@repo/types/account';

export function accountToEntityMap(raw: any): Account {
  return {
    id: raw.id,
    name: raw.name,
    type: raw.type,
    currencies: raw.currencies,
    siteUrl: raw.siteUrl,
    swiftCode: raw.swiftCode,
    createdAt: raw?.createdAt ? new Date(raw?.createdAt) : raw?.createdAt,
    updatedAt: raw?.updatedAt ? new Date(raw?.updatedAt) : raw?.updatedAt,
  };
}
