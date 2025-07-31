import { Wallet } from '@repo/types';
import { IRepository } from '../../types';

export type WalletCreateData = Pick<
  Wallet,
  'title' | 'account' | 'reference' | 'iban' | 'details' | 'currencies' | 'active'
>;

export type WalletUpdateData = Partial<WalletCreateData>;

export abstract class IWalletRepository extends IRepository<
  Wallet,
  WalletCreateData,
  WalletUpdateData
> {}
