import { Location } from '@repo/types/location';
import {
  DatabaseConfig,
  IDatabase,
  ListPaginateRepositoryOption,
  PaginatedResult,
} from '../../types';
import { ILocationRepository } from './interface';
import * as mapper from './mappers';

export class LocationRepository implements ILocationRepository {
  constructor(private database: IDatabase) {}

  async create(
    input: Pick<
      Location,
      'name' | 'type' | 'province' | 'city' | 'address' | 'contacts' | 'coordinate'
    >,
  ): Promise<void> {
    const data = mapper.toDatabaseMap(input);
    await this.database.insert('locations', data);
  }

  async update(
    input: Pick<
      Location,
      'name' | 'type' | 'province' | 'city' | 'address' | 'contacts' | 'coordinate'
    >,
    id: string,
  ): Promise<void> {
    const data = mapper.toDatabaseMap(input);
    await this.database.update('locations', data, id);
  }

  async delete(id: string): Promise<void> {
    await this.database.delete('locations', { id });
  }

  async getById(id: string): Promise<Location | null> {
    const result = await this.database.getFirst('locations', { where: { id } });
    if (!result) return null;
    return mapper.toEntityMap(result);
  }

  async listAll(configs?: DatabaseConfig): Promise<Location[]> {
    const rows = await this.database.listAll('locations', configs);
    return rows.map((row) => mapper.toEntityMap(row));
  }

  async listPaginate(options?: ListPaginateRepositoryOption): Promise<PaginatedResult<Location>> {
    const { query, size, page } = options || {};

    const result = await this.database.listPaginate('locations', {
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
