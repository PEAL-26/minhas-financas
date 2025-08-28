export const accountInclude = {
  select: {
    id: true,
    name: true,
    type: true,
    currencies: true,
    siteUrl: true,
    swiftCode: true,
  },
  singular: 'account',
  type: 'LEFT',
  references: {
    left: 'account.id',
    right: 'wallet.account_id',
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
  references: {
    left: 'wallet.id',
    right: 'incomes.wallet_id',
  },
  singular: 'wallet',
  type: 'LEFT',
  include: {
    accounts: accountInclude,
  },
} as const;
