export type Account = {
  id: string;
  name: string;
  type: ACCOUNT_TYPE;
  currencies?: string[];
  siteUrl?: string | null;
  swiftCode?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export enum ACCOUNT_TYPE {
  BANK = 'bank',
  E_WALLET = 'e_wallet',
  CRYPTO = 'crypto',
}

export const ACCOUNT_TYPE_MAP = {
  [ACCOUNT_TYPE.BANK]: 'Conta Bancária',
  [ACCOUNT_TYPE.E_WALLET]: 'Carteira Digital',
  [ACCOUNT_TYPE.CRYPTO]: 'Cripto-moeda',
};
