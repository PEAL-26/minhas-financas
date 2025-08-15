import { Wishlist } from '@repo/types/wishlist';
import {
  DatabaseConfig,
  IDatabase,
  ListPaginateRepositoryOption,
  PaginatedResult,
} from '../../types';
import { IWishlistRepository, WishlistCreateData } from './interface';
import { wishlistToEntityMap } from './mappers';

export class WishlistRepository implements IWishlistRepository {
  constructor(private database: IDatabase) {}

  async create(data: WishlistCreateData): Promise<void> {
    await this.database.insert('wishlist', data);
  }

  async update(data: Partial<WishlistCreateData>, id: string): Promise<void> {
    await this.database.update('wishlist', data, id);
  }

  async delete(id: string): Promise<void> {
    await this.database.delete('wishlist', { id });
  }

  async getById(id: string): Promise<Wishlist | null> {
    const result = await this.database.getFirst('wishlist', { where: { id } });
    if (!result) return null;
    return wishlistToEntityMap(result);
  }

  async listAll(configs?: DatabaseConfig): Promise<Wishlist[]> {
    const rows = await this.database.listAll('wishlist', configs);
    return rows.map((row) => wishlistToEntityMap(row));
  }

  async listPaginate(options?: ListPaginateRepositoryOption): Promise<PaginatedResult<Wishlist>> {
    const { query, size, page } = options || {};

    const result = await this.database.listPaginate('wishlist', {
      where: { name: { value: query, op: 'like' } },
      size,
      page,
    });

    return {
      ...result,
      data: result.data.map((row) => wishlistToEntityMap(row)),
    };
  }
}
