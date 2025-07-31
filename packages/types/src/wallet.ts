import { Account } from './account';

export type Wallet = {
  id: string;
  title: string;
  details?: string | null;
  account: Account;
  reference: string;
  iban?: string | null;
  currencies?: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};
