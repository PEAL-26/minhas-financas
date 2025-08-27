import { Wallet } from '@repo/types/wallet';
import { toDatabasePropertiesCommonMap, toEntityPropertiesCommonMap } from '../../helpers/map';

export function toEntityMap(raw: any): Wallet {
  // TODO Melhorar o mapeamento
  return {
    title: raw.title,
    account: raw.account,
    reference: raw.reference,
    iban: raw.iban,
    details: raw.details,
    currencies: raw.currencies,
    active: raw.active,
    ...toEntityPropertiesCommonMap(raw),
  };
}

export function toDatabaseMap(entity: Partial<Wallet>) {
  return {
    title: entity.title,
    accountId: entity?.account?.id,
    reference: entity.reference,
    iban: entity.iban,
    details: entity.details,
    currencies: entity.currencies,
    active: entity.active,
    ...toDatabasePropertiesCommonMap(entity),
  };
}
