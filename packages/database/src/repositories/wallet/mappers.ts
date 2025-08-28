import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import { Wallet } from '@repo/types/wallet';
import { toDatabasePropertiesCommonMap, toEntityPropertiesCommonMap } from '../../helpers/map';
import * as accountsMap from '../accounts';

export function toEntityMap(raw: any): Wallet {
  return {
    title: raw.title,
    account: checkNullUndefinedValue(raw.account, {
      fn: (value) => accountsMap.toEntityMap(value),
    }),
    reference: raw.reference,
    iban: raw?.iban,
    details: raw?.details,
    currencies: raw?.currencies || [],
    active: raw?.active ?? true,
    ...toEntityPropertiesCommonMap(raw),
  };
}

export function toDatabaseMap(entity: Partial<Wallet>) {
  return {
    title: entity.title,
    accountId: entity?.account?.id,
    reference: entity.reference,
    iban: checkNullUndefinedValue(entity?.iban, { convert: 'emptyToNull' }),
    details: checkNullUndefinedValue(entity?.details, { convert: 'emptyToNull' }),
    currencies: entity?.currencies || [],
    active: entity?.active ?? true,
    ...toDatabasePropertiesCommonMap(entity),
  };
}
