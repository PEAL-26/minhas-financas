export enum PRIORITY_ENUM {
  LOW = 1,
  NORMAL = 2,
  HIGH = 3,
}

export const PRIORITY_MAP = {
  [PRIORITY_ENUM.LOW]: { display: 'Baixa', color: '#2AB546' },
  [PRIORITY_ENUM.NORMAL]: { display: 'Normal', color: '#facc15' },
  [PRIORITY_ENUM.HIGH]: { display: 'Alta', color: '#ef4444' },
};
