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
  [RECURRENCE_ENUM.DAILY]: { display: 'Diária' },
  [RECURRENCE_ENUM.WEEKLY]: { display: 'Semanal' },
  [RECURRENCE_ENUM.MONTHLY]: { display: 'Mensal' },
  [RECURRENCE_ENUM.YEARLY]: { display: 'Anual' },
};

export const RECURRENCE_TYPE_MAP = {
  [RECURRENCE_TYPE_ENUM.UNIQUE]: { display: 'Única' },
  [RECURRENCE_TYPE_ENUM.RECURRENCE]: { display: 'Recorrente' },
};

export function displayRecurrence(recurrence?: RECURRENCE_ENUM | number | null) {
  if (!recurrence) return '';
  if (recurrence === RECURRENCE_ENUM.DAILY) return 'Diariamente';
  if (recurrence === RECURRENCE_ENUM.WEEKLY) return 'Semanalmente';
  if (recurrence === RECURRENCE_ENUM.MONTHLY) return 'Mensalmente';
  if (recurrence === RECURRENCE_ENUM.YEARLY) return 'Anualmente';

  return `A cada ${recurrence} dias`;
}
