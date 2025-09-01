import { Account } from './account';

export type Wallet = {
  id: string;
  title: string;
  account: Account;
  reference: string;
  iban?: string | null;
  details?: string | null;
  currencies?: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const walletHelps: Partial<Record<keyof Wallet, string>> = {
  title: '',
  account: '',
  reference: '',
  iban: '',
  details: '',
  currencies: '',
  active: '',
};
