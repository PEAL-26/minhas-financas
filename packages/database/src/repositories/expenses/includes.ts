export const categoryInclude = {
  select: {
    id: true,
    name: true,
    color: true,
    icon: true,
  },
  singular: 'category',
  type: 'LEFT',
} as const;

export const wishlistInclude = {
  select: {
    id: true,
    name: true,
    type: true,
    recurrence: true,
    targetDate: true,
    priority: true,
    expectedLocationId: true,
    estimatedCost: true,
    quantity: true,
    total: true,
    status: true,
  },
  singular: 'wishlist',
  type: 'LEFT',
  include: {
    categories: { ...categoryInclude, as: 'wishlist_category' },
  },
} as const;

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
    right: 'income.wallet_id',
  },
  singular: 'wallet',
  type: 'LEFT',
  include: {
    accounts: accountInclude,
  },
} as const;

export const incomeInclude = {
  select: {
    id: true,
    description: true,
    amount: true,
    type: true,
    recurrence: true,
    duration: true,
    startDate: true,
    endDate: true,
    currency: true,
    estimatedDateReceipt: true,
    status: true,
  },
  singular: 'income',
  type: 'LEFT',
  include: {
    wallets: walletInclude,
  },
} as const;

export const expensesPricesInclude = {
  as: 'prices',
  structure: 'array',
  select: { amount: true },
  type: 'LEFT',
  references: {
    left: 'prices.expense_id',
    right: 'expenses.id',
  },
  include: {
    locations: {
      select: {
        id: true,
        name: true,
        type: true,
        country: true,
        province: true,
        city: true,
        address: true,
        coordinate: true,
        contacts: true,
      },
      singular: 'location',
      type: 'LEFT',
      references: {
        left: 'prices.location_id',
        right: 'location.id',
      },
    },
  },
} as const;
