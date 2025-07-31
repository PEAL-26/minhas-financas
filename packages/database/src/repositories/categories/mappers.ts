import { Category } from '@repo/types';

export function categoryToEntityMap(raw: any): Category {
  return {
    id: raw.id,
    name: raw.name,
    icon: raw?.icon,
    createdAt: raw?.createdAt ? new Date(raw?.createdAt) : raw?.createdAt,
    updatedAt: raw?.updatedAt ? new Date(raw?.updatedAt) : raw?.updatedAt,
  };
}
