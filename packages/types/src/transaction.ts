export type Transaction = {};

export enum TRANSACTION_TYPE_ENUM {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const TRANSACTION_TYPE_MAP = {
  [TRANSACTION_TYPE_ENUM.INCOME]: 'Renda',
  [TRANSACTION_TYPE_ENUM.EXPENSE]: 'Despesa',
};
