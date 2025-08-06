export enum BASE_STATUS_ENUM {
  PENDING = 'pending',
  DONE = 'done',
}

export const BASE_STATUS_MAP = {
  [BASE_STATUS_ENUM.PENDING]: { display: 'Pendente' },
  [BASE_STATUS_ENUM.DONE]: { display: 'Feito' },
};

export enum WISHLIST_STATUS_ENUM {
  PENDING = 'pending',
  DONE = 'done',
  STARTED = 'started',
  CONVERTED_EXPENSE = 'converted_expense',
}

export const WISHLIST_STATUS_MAP = {
  [WISHLIST_STATUS_ENUM.PENDING]: { display: 'Pendente', color: '' },
  [WISHLIST_STATUS_ENUM.DONE]: { display: 'Feito', color: '' },
  [WISHLIST_STATUS_ENUM.STARTED]: { display: 'Iniciada', color: '' },
  [WISHLIST_STATUS_ENUM.CONVERTED_EXPENSE]: { display: 'Convertida em Despesa', color: '' },
};

export enum EXPENSE_STATUS_ENUM {
  PENDING = 'pending',
  DONE = 'done',
  DELAYED = 'delayed',
}

export const EXPENSE_STATUS_MAP = {
  [EXPENSE_STATUS_ENUM.PENDING]: { display: 'Pendente' },
  [EXPENSE_STATUS_ENUM.DONE]: { display: 'Feito' },
  [EXPENSE_STATUS_ENUM.DELAYED]: { display: 'Atrasada' },
};

export enum INCOME_STATUS_ENUM {
  PENDING = 'pending',
  PARTIAL = 'partial',
  DONE = 'done',
}

export const INCOME_STATUS_MAP = {
  [INCOME_STATUS_ENUM.PENDING]: { display: 'Pendente' },
  [INCOME_STATUS_ENUM.PARTIAL]: { display: 'Partial' },
  [INCOME_STATUS_ENUM.DONE]: { display: 'Feito' },
};
