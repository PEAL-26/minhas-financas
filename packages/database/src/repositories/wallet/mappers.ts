import { Wallet } from '@repo/types';

export function walletToEntityMap(raw: any): Wallet {
  // TODO Melhorar o mapeamento
  return {
    id: raw.id,
    title: raw.title,
    account: raw.account,
    reference: raw.reference,
    iban: raw.iban,
    details: raw.details,
    currencies: raw.currencies,
    active: raw.active,
    createdAt: raw?.createdAt ? new Date(raw?.createdAt) : raw?.createdAt,
    updatedAt: raw?.updatedAt ? new Date(raw?.updatedAt) : raw?.updatedAt,
  };
}

export function walletToDatabaseMap(entity: Wallet) {
  return {
    title: entity.title,
    accountId: entity.account.id,
    reference: entity.reference,
    iban: entity.iban,
    details: entity.details,
    currencies: entity.currencies,
    active: entity.active,
  };
}
