import { Expense } from './expense';
import { Income } from './income';
import { Location } from './location';
import { Wallet } from './wallet';

export type TransactionIncome = {
  income?: Income | null;
  description?: string | null;
  amount: number;
};

export const transactionIncomeHelps: Partial<Record<keyof TransactionIncome, string>> = {
  income: '',
  description: '',
  amount: '',
};

export type TransactionExpense = {
  expense?: Expense | null;
  description?: string | null;
  amount: number;
  quantity: number;
  total: number;
  location?: Location;
  income?: Income;
};

export const transactionExpenseHelps: Partial<Record<keyof TransactionExpense, string>> = {
  expense: '',
  description: '',
  amount: '',
  quantity: '',
  total: '',
  location: '',
  income: '',
};

export type Transaction = {
  id: string;
  type: TRANSACTION_TYPE_ENUM;
  date: Date;
  incomes?: TransactionIncome[];
  expenses?: TransactionExpense[];
  wallet?: Wallet | null;
  totalAmount: number;
  note?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const transactionHelps: Partial<Record<keyof Transaction, string>> = {
  type: '',
  date: '',
  incomes: '',
  expenses: '',
  wallet: '',
  totalAmount: '',
  note: '',
};

export enum TRANSACTION_TYPE_ENUM {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const TRANSACTION_TYPE_MAP = {
  [TRANSACTION_TYPE_ENUM.INCOME]: { display: 'Renda', color: '#2AB546' },
  [TRANSACTION_TYPE_ENUM.EXPENSE]: { display: 'Despesa', color: '#ef4444' },
};
