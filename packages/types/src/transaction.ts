import { Expense } from './expense';
import { Income } from './income';
import { Location } from './location';

export type TransactionIncome = {
  income: Income;
  amount: number;
};

export type TransactionExpense = {
  expense: Expense;
  amount: number;
  quantity: number;
  total: number;
  local?: Location;
  income?: Income;
};

export type Transaction = {
  id: string;
  type: TRANSACTION_TYPE_ENUM;
  incomes?: TransactionIncome[];
  expenses?: TransactionExpense[];
  totalAmount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export enum TRANSACTION_TYPE_ENUM {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const TRANSACTION_TYPE_MAP = {
  [TRANSACTION_TYPE_ENUM.INCOME]: 'Renda',
  [TRANSACTION_TYPE_ENUM.EXPENSE]: 'Despesa',
};
