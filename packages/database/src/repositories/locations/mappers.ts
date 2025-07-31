import { Location } from '@repo/types';

export function locationToEntityMap(raw: any): Location {
  return {
    id: raw.id,
    name: raw.name,
    type: raw.type,
    province: raw?.province,
    city: raw?.city,
    address: raw?.address,
    coordinate: raw?.coordinate,
    contacts: raw?.contacts,
    createdAt: raw?.createdAt ? new Date(raw?.createdAt) : raw?.createdAt,
    updatedAt: raw?.updatedAt ? new Date(raw?.updatedAt) : raw?.updatedAt,
  };
}
