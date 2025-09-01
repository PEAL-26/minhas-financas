import { DatabaseIncludeProps } from '@repo/database/types';

export const accountInclude = {
  select: {
    id: true,
    name: true,
    type: true,
    currencies: true,
    siteUrl: true,
    swiftCode: true,
  },
  as: 'transactions_wallet_account',
  singular: 'account',
  type: 'LEFT',
  references: {
    left: 'transactions_wallet_account.id',
    right: 'transactions_wallet.account_id',
  },
} as const;

export const walletInclude = {
  select: {
    id: true,
    title: true,
    reference: true,
    iban: true,
    details: true,
    currencies: true,
    active: true,
  },
  as: 'transactions_wallet',
  references: {
    left: 'transactions_wallet.id',
    right: 'transactions.wallet_id',
  },
  singular: 'wallet',
  type: 'LEFT',
  include: {
    accounts: accountInclude,
  },
} as const;

export const incomeInclude: DatabaseIncludeProps = {
  as: 'incomes',
  structure: 'array',
  type: 'LEFT',
  references: {
    left: 'transactions.id',
    right: 'incomes.transaction_id',
  },
  select: {
    description: true,
  },
};

export const expenseInclude: DatabaseIncludeProps = {
  as: 'expenses',
  singular: 'expense',
  structure: 'array',
  type: 'LEFT',
  references: {
    left: 'transactions.id',
    right: 'expenses.transaction_id',
  },
  select: {
    description: true,
    amount: true,
    quantity: true,
    total: true,
    locationId: true,
    incomeId: true,
  },
};
