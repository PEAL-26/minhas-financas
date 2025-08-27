import { Income } from '@repo/types/income';
import { toDatabasePropertiesCommonMap, toEntityPropertiesCommonMap } from '../../helpers/map';

export function toEntityMap(raw: any): Income {
  // TODO Melhorar esse mapeamento
  return {
    wallet: raw.wallet,
    description: raw.description,
    amount: raw.amount,
    type: raw.type,
    recurrence: raw.recurrence,
    duration: raw.duration,
    startDate: raw.startDate,
    endDate: raw.endDate,
    currency: raw.currency,
    estimatedDateReceipt: raw.estimatedDateReceipt,
    status: raw.status,
    ...toEntityPropertiesCommonMap(raw),
  };
}

export function toDatabaseMap(entity: Partial<Income>) {
  // TODO Melhorar esse mapeamento
  return {
    walletId: entity.wallet?.id,
    description: entity.description,
    amount: entity.amount,
    type: entity.type,
    recurrence: entity.recurrence,
    duration: entity.duration,
    startDate: entity.startDate,
    endDate: entity.endDate,
    currency: entity.currency,
    estimatedDateReceipt: entity.estimatedDateReceipt,
    status: entity.status,
    ...toDatabasePropertiesCommonMap(entity),
  };
}
