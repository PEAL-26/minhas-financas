export enum RECURRENCE_ENUM {
  DAILY = 1,
  WEEKLY = 7,
  MONTHLY = 30,
  YEARLY = 365,
}

export enum RECURRENCE_TYPE_ENUM {
  UNIQUE = 'unique',
  RECURRENCE = 'recurrence',
}

export const RECURRENCE_MAP = {
  [RECURRENCE_ENUM.DAILY]: 'Diária',
  [RECURRENCE_ENUM.WEEKLY]: 'Semanal',
  [RECURRENCE_ENUM.MONTHLY]: 'Mensal',
  [RECURRENCE_ENUM.YEARLY]: 'Anual',
};

export const RECURRENCE_TYPE_MAP = {
  [RECURRENCE_TYPE_ENUM.UNIQUE]: 'Única',
  [RECURRENCE_TYPE_ENUM.RECURRENCE]: 'Recorrente',
};
