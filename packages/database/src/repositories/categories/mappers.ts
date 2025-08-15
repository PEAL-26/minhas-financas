import { Category } from '@repo/types/category';

export function categoryToEntityMap(raw: any): Category {
  return {
    id: raw.id,
    name: raw.name,
    icon: raw?.icon,
    color: raw?.color,
    createdAt: raw?.createdAt ? new Date(raw?.createdAt) : raw?.createdAt,
    updatedAt: raw?.updatedAt ? new Date(raw?.updatedAt) : raw?.updatedAt,
  };
}
