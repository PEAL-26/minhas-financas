import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import { Income } from '@repo/types/income';
import { INCOME_STATUS_ENUM } from '@repo/types/status';
import { toDatabasePropertiesCommonMap, toEntityPropertiesCommonMap } from '../../helpers/map';
import * as walletMappers from '../wallet';

export function toEntityMap(raw: any): Income {
  return {
    wallet: checkNullUndefinedValue(raw.wallet, {
      fn: (value) => walletMappers.toEntityMap(value),
    }),
    description: checkNullUndefinedValue(raw.description, { convert: 'emptyToUndefined' }),
    amount: checkNullUndefinedValue(raw.amount, { fn: (value) => Number(value) }),
    type: checkNullUndefinedValue(raw.type, { convert: 'emptyToUndefined' }),
    recurrence: checkNullUndefinedValue(raw.recurrence, { fn: (value) => Number(value) }),
    duration: checkNullUndefinedValue(raw.duration, { fn: (value) => Number(value) }),
    startDate: checkNullUndefinedValue(raw.startDate, { fn: (value) => new Date(value) }),
    endDate: checkNullUndefinedValue(raw.endDate, { fn: (value) => new Date(value) }),
    currency: checkNullUndefinedValue(raw.currency, { convert: 'emptyToUndefined' }),
    estimatedDateReceipt: checkNullUndefinedValue(raw.estimatedDateReceipt, {
      fn: (value) => new Date(value),
    }),
    status: raw.status || INCOME_STATUS_ENUM.ACTIVE,
    note: raw.note,
    ...toEntityPropertiesCommonMap(raw),
  };
}

export function toDatabaseMap(entity: Partial<Income>) {
  return {
    walletId: checkNullUndefinedValue(entity.wallet, {
      convert: 'emptyToNull',
      fn: (value) => value.id,
    }),
    description: checkNullUndefinedValue(entity.description, {
      convert: 'emptyToNull',
      fn: (value) => String(value || '').trim(),
    }),
    amount: checkNullUndefinedValue(entity?.amount, {
      convert: 'emptyToUndefined',
      fn: (value) => Number(value),
    }),
    type: checkNullUndefinedValue(entity?.type, { convert: 'emptyToUndefined' }),
    recurrence: checkNullUndefinedValue(entity?.recurrence, { convert: 'emptyToNull' }),
    duration: checkNullUndefinedValue(entity.duration, {
      convert: 'emptyToNull',
      fn: (value) => Number(value) || null,
    }),
    startDate: checkNullUndefinedValue(entity?.startDate, {
      convert: 'emptyToNull',
      fn: (value) => new Date(value).getTime(),
    }),
    endDate: checkNullUndefinedValue(entity?.endDate, {
      convert: 'emptyToNull',
      fn: (value) => new Date(value).getTime(),
    }),
    currency: checkNullUndefinedValue(entity?.currency, { convert: 'emptyToUndefined' }),
    estimatedDateReceipt: checkNullUndefinedValue(entity?.estimatedDateReceipt, {
      convert: 'emptyToNull',
      fn: (value) => new Date(value).getTime(),
    }),
    status: entity?.status || INCOME_STATUS_ENUM.ACTIVE,
    note: checkNullUndefinedValue(entity?.note, {
      convert: 'emptyToNull',
      fn: (value) => String(value).trim(),
    }),
    ...toDatabasePropertiesCommonMap(entity),
  };
}
