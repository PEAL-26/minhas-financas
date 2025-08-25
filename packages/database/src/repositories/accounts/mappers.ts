import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import { Account } from '@repo/types/account';
import { toDatabasePropertiesCommonMap, toEntityPropertiesCommonMap } from '../../helpers/map';

export function toEntityMap(raw: any): Account {
  return {
    name: raw.name,
    type: raw.type,
    currencies: raw.currencies,
    siteUrl: raw.siteUrl,
    swiftCode: raw.swiftCode,
    ...toEntityPropertiesCommonMap(raw),
  };
}

export function toDatabaseMap(entity: Partial<Account>) {
  return {
    name: checkNullUndefinedValue(entity.name, { convert: 'emptyToUndefined' }),
    type: checkNullUndefinedValue(entity.type, { convert: 'emptyToUndefined' }),
    currencies: checkNullUndefinedValue(entity.currencies, { convert: 'emptyToUndefined' }),
    siteUrl: checkNullUndefinedValue(entity.siteUrl, { convert: 'emptyToNull' }),
    swiftCode: checkNullUndefinedValue(entity.swiftCode, { convert: 'emptyToNull' }),
    ...toDatabasePropertiesCommonMap(entity),
  };
}
