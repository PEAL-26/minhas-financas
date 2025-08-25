import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import { Category } from '@repo/types/category';
import { toDatabasePropertiesCommonMap, toEntityPropertiesCommonMap } from '../../helpers/map';

export function toEntityMap(raw: any): Category {
  return {
    name: raw.name,
    icon: raw?.icon,
    color: raw?.color,
    ...toEntityPropertiesCommonMap(raw),
  };
}

export function toDatabaseMap(entity: Partial<Category>) {
  return {
    name: checkNullUndefinedValue(entity?.name, { convert: 'emptyToUndefined' }),
    icon: checkNullUndefinedValue(entity?.icon, { convert: 'emptyToNull' }),
    color: checkNullUndefinedValue(entity?.color, { convert: 'emptyToNull' }),
    ...toDatabasePropertiesCommonMap(entity),
  };
}
