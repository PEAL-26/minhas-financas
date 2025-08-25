import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import { Location } from '@repo/types/location';
import { toDatabasePropertiesCommonMap, toEntityPropertiesCommonMap } from '../../helpers/map';

export function toEntityMap(raw: any): Location {
  return {
    name: raw.name,
    type: raw.type,
    country: raw?.country,
    province: raw?.province,
    city: raw?.city,
    address: raw?.address,
    coordinate: raw?.coordinate,
    contacts: raw?.contacts,
    ...toEntityPropertiesCommonMap(raw),
  };
}

export function toDatabaseMap(entity: Partial<Location>) {
  return {
    name: checkNullUndefinedValue(entity.name, { convert: 'emptyToUndefined' }),
    type: checkNullUndefinedValue(entity.type, { convert: 'emptyToUndefined' }),
    province: checkNullUndefinedValue(entity.province, { convert: 'emptyToUndefined' }),
    city: checkNullUndefinedValue(entity.city, { convert: 'emptyToNull' }),
    address: checkNullUndefinedValue(entity.address, { convert: 'emptyToNull' }),
    coordinate: checkNullUndefinedValue(entity.coordinate, { convert: 'emptyToNull' }),
    contacts: checkNullUndefinedValue(entity.contacts, { convert: 'emptyToNull' }),
    ...toDatabasePropertiesCommonMap(entity),
  };
}
