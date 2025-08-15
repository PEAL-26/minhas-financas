import { Account } from '@repo/types/account';
import { IRepository } from '../../types';

export type AccountCreateData = Pick<
  Account,
  'name' | 'type' | 'siteUrl' | 'swiftCode' | 'currencies'
>;

export type AccountUpdateData = Partial<AccountCreateData>;

export abstract class IAccountRepository extends IRepository<
  Account,
  AccountCreateData,
  AccountUpdateData
> {}
