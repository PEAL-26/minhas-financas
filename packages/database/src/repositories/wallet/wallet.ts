import { Wallet } from '@repo/types/wallet';
import {
  DatabaseConfig,
  IDatabase,
  ListPaginateRepositoryOption,
  PaginatedResult,
} from '../../types';
import { IWalletRepository, WalletCreateData } from './interface';
import { walletToEntityMap } from './mappers';

export class WalletRepository implements IWalletRepository {
  constructor(private database: IDatabase) {}

  async create(data: WalletCreateData): Promise<void> {
    await this.database.insert('wallets', data);
  }

  async update(data: Partial<WalletCreateData>, id: string): Promise<void> {
    await this.database.update('wallets', data, id);
  }

  async delete(id: string): Promise<void> {
    await this.database.delete('wallets', { id });
  }

  async getById(id: string): Promise<Wallet | null> {
    const result = await this.database.getFirst('wallets', { where: { id } });
    if (!result) return null;
    return walletToEntityMap(result);
  }

  async listAll(configs?: DatabaseConfig): Promise<Wallet[]> {
    const rows = await this.database.listAll('wallets', configs);
    return rows.map((row) => walletToEntityMap(row));
  }

  async listPaginate(options?: ListPaginateRepositoryOption): Promise<PaginatedResult<Wallet>> {
    const { query, size, page } = options || {};

    const result = await this.database.listPaginate('wallets', {
      where: { title: { value: query, op: 'like' } },
      size,
      page,
    });

    return {
      ...result,
      data: result.data.map((row) => walletToEntityMap(row)),
    };
  }
}
