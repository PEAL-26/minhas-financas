import { Category } from '@repo/types';
import { IRepository } from '../../types';

export type CategoryCreateData = Pick<Category, 'name' | 'icon'>;

export type CategoryUpdateData = Partial<CategoryCreateData>;

export abstract class ICategoryRepository extends IRepository<
  Category,
  CategoryCreateData,
  CategoryUpdateData
> {}
