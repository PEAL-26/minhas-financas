export type Account = {
  id: string;
  name: string;
  type: ACCOUNT_TYPE_ENUM;
  currencies?: string[];
  siteUrl?: string | null;
  swiftCode?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export enum ACCOUNT_TYPE_ENUM {
  BANK = 'bank',
  E_WALLET = 'e_wallet',
  CRYPTO = 'crypto',
}

export const ACCOUNT_TYPE_ENUM_MAP = {
  [ACCOUNT_TYPE_ENUM.BANK]: 'Conta Bancária',
  [ACCOUNT_TYPE_ENUM.E_WALLET]: 'Carteira Digital',
  [ACCOUNT_TYPE_ENUM.CRYPTO]: 'Cripto-moeda',
};
