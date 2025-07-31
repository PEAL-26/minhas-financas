import { Wishlist } from '@repo/types';
import { IRepository } from '../../types';

export type WishlistCreateData = Pick<
  Wishlist,
  | 'name'
  | 'type'
  | 'recurrence'
  | 'category'
  | 'targetDate'
  | 'priority'
  | 'expectedLocation'
  | 'estimatedCost'
  | 'quantity'
  | 'total'
  | 'status'
  | 'prices'
>;

export type WishlistUpdateData = Partial<WishlistCreateData>;

export abstract class IWishlistRepository extends IRepository<
  Wishlist,
  WishlistCreateData,
  WishlistUpdateData
> {}
