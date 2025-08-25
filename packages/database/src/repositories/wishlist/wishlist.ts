import { Wishlist } from '@repo/types/wishlist';
import {
  DatabaseConfig,
  IDatabase,
  ListPaginateRepositoryOption,
  PaginatedResult,
} from '../../types';
import { IWishlistRepository, WishlistCreateData } from './interface';
import * as mapper from './mappers';

export class WishlistRepository implements IWishlistRepository {
  constructor(private database: IDatabase) {}

  async create(input: WishlistCreateData): Promise<void> {
    const { prices, ...data } = mapper.toDatabaseMap(input);
    await this.database.insert('wishlist', data, {
      include: {
        prices: {
          tableName: 'wishlist_prices',
          foreignKey: 'wishlistId',
          data: prices,
        },
      },
    });
  }

  async update(input: Partial<WishlistCreateData>, id: string): Promise<void> {
    const { prices, ...data } = mapper.toDatabaseMap(input);
    await this.database.update('wishlist', data, id, {
      include: {
        prices: {
          tableName: 'wishlist_prices',
          foreignKey: 'wishlistId',
          key: 'locationId',
          data: prices,
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.database.delete('wishlist', { id });
  }

  async getById(id: string): Promise<Wishlist | null> {
    const result = await this.database.getFirst('wishlist', {
      include: {
        categories: {
          select: {
            id: true,
            name: true,
            color: true,
            icon: true,
          },
          singular: 'category',
          type: 'LEFT',
        },
        locations: {
          select: {
            id: true,
            name: true,
            type: true,
            country: true,
            province: true,
            city: true,
            address: true,
            coordinate: true,
            contacts: true,
          },
          singular: 'expected_location',
          type: 'LEFT',
        },
        wishlist_prices: {
          as: 'prices',
          structure: 'array',
          select: { amount: true },
          type: 'LEFT',
          references: {
            left: 'prices.wishlist_id',
            right: 'wishlist.id',
          },
          include: {
            locations: {
              select: {
                id: true,
                name: true,
                type: true,
                country: true,
                province: true,
                city: true,
                address: true,
                coordinate: true,
                contacts: true,
              },
              singular: 'location',
              references: {
                left: 'prices.location_id',
                right: 'location.id',
              },
            },
          },
        },
      },
      where: { 'wishlist.id': id },
    });

    if (!result) return null;
    return mapper.toEntityMap(result);
  }

  async listAll(configs?: DatabaseConfig): Promise<Wishlist[]> {
    const rows = await this.database.listAll('wishlist', configs);
    return rows.map((row) => mapper.toEntityMap(row));
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
      data: result.data.map((row) => mapper.toEntityMap(row)),
    };
  }
}
