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

export const ACCOUNT_TYPE_MAP = {
  [ACCOUNT_TYPE_ENUM.BANK]: { display: 'Conta Bancária', icon: 'credit-card', color: '#007bff' },
  [ACCOUNT_TYPE_ENUM.E_WALLET]: { display: 'Carteira Digital', icon: 'wallet', color: '#28a745' },
  [ACCOUNT_TYPE_ENUM.CRYPTO]: { display: 'Cripto Moeda', icon: 'bitcoin', color: '#ffcc00' },
};
