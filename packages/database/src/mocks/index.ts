import {
  ACCOUNT_TYPE_ENUM,
  EXPENSE_STATUS_ENUM,
  INCOME_STATUS_ENUM,
  LOCATION_TYPE_ENUM,
  PRIORITY_ENUM,
  RECURRENCE_TYPE_ENUM,
  TRANSACTION_TYPE_ENUM,
  WISHLIST_STATUS_ENUM,
} from '@repo/types/index';

export const usersMockData = [
  {
    id: 'user_1',
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  {
    id: 'user_2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
  },
];

export const accountsMockData = [
  {
    id: 'acc_1',
    name: 'Main Bank Account',
    type: ACCOUNT_TYPE_ENUM.BANK,
    currencies: ['USD', 'EUR'],
    siteUrl: 'https://examplebank.com',
    swiftCode: 'EXMPLBNK',
  },
  {
    id: 'acc_2',
    name: 'Credit Card',
    type: ACCOUNT_TYPE_ENUM.E_WALLET,
    currencies: ['USD'],
  },
];

export const categoriesMockData = [
  {
    id: 'cat_1',
    name: 'Groceries',
    icon: 'shopping-cart',
    color: '#FF6347', // Tomato color
  },
  {
    id: 'cat_2',
    name: 'Utilities',
    icon: 'lightbulb',
    color: '#4682B4', // Steel Blue color
  },
  {
    id: 'cat_3',
    name: 'Salary',
    icon: 'briefcase',
    color: '#32CD32', // Lime Green color
  },
];

export const walletMockData = [
  {
    id: 'wallet_1',
    title: 'Primary Wallet',
    account: accountsMockData[0],
    reference: 'WALLET_REF_1',
    iban: 'US123456789',
    currencies: ['USD'],
    active: true,
  },
  {
    id: 'wallet_2',
    title: 'Secondary Wallet',
    account: accountsMockData[1],
    reference: 'WALLET_REF_2',
    currencies: ['EUR'],
    active: true,
  },
];

export const incomesMockData = [
  {
    id: 'inc_1',
    wallet: walletMockData[0],
    description: 'Monthly Salary',
    amount: 5000,
    type: RECURRENCE_TYPE_ENUM.RECURRENCE,
    recurrence: 30,
    startDate: new Date('2024-01-01'),
    currency: 'USD',
    status: INCOME_STATUS_ENUM.DONE,
  },
  {
    id: 'inc_2',
    wallet: walletMockData[1],
    description: 'Freelance Project',
    amount: 1500,
    type: RECURRENCE_TYPE_ENUM.UNIQUE,
    recurrence: null,
    estimatedDateReceipt: new Date('2024-08-15'),
    currency: 'EUR',
    status: INCOME_STATUS_ENUM.PENDING,
  },
];

export const expensesMockData = [
  {
    id: 'exp_1',
    category: categoriesMockData[0],
    description: 'Weekly Groceries',
    estimatedAmount: 100,
    type: RECURRENCE_TYPE_ENUM.RECURRENCE,
    recurrence: 7,
    priority: PRIORITY_ENUM.HIGH,
    status: EXPENSE_STATUS_ENUM.PENDING,
  },
  {
    id: 'exp_2',
    category: categoriesMockData[1],
    description: 'Electricity Bill',
    estimatedAmount: 75,
    type: RECURRENCE_TYPE_ENUM.RECURRENCE,
    recurrence: 30,
    status: EXPENSE_STATUS_ENUM.DONE,
  },
];

export const locationsMockData = [
  {
    id: 'loc_1',
    name: 'Supermarket',
    type: LOCATION_TYPE_ENUM.PHYSICAL,
    country: 'USA',
    city: 'New York',
  },
  {
    id: 'loc_2',
    name: 'Online Store',
    type: LOCATION_TYPE_ENUM.DIGITAL,
  },
];

export const transactionsMockData = [
  {
    id: 'trans_1',
    type: TRANSACTION_TYPE_ENUM.EXPENSE,
    date: new Date(),
    totalAmount: 75,
  },
  {
    id: 'trans_2',
    type: TRANSACTION_TYPE_ENUM.INCOME,
    date: new Date(),
    totalAmount: 5000,
  },
];

export const transactionIncomesMockData = [
  {
    transactionId: 'trans_2',
    incomeId: 'inc_1',
    amount: 5000,
  },
];

export const transactionExpensesMockData = [
  {
    transactionId: 'trans_1',
    expenseId: 'exp_2',
    amount: 75,
    quantity: 1,
    total: 75,
    locationId: 'loc_1',
  },
];

export const wishlistMockData = [
  {
    id: 'wish_1',
    name: 'New Laptop',
    category: categoriesMockData[0],
    estimatedCost: 1200,
    type: 'unique',
    priority: PRIORITY_ENUM.HIGH,
    status: WISHLIST_STATUS_ENUM.PENDING,
  },
];
