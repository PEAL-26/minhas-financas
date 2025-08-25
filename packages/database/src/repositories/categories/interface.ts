import { Category } from '@repo/types/category';
import { IRepository } from '../../types';

export type CategoryCreateData = Pick<Category, 'name' | 'icon' | 'color'>;

export type CategoryUpdateData = Partial<Category>;

export abstract class ICategoryRepository extends IRepository<
  Category,
  CategoryCreateData,
  CategoryUpdateData
> {}
