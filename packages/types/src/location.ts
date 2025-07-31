export type Location = {};

export enum LOCATION_TYPE_ENUM {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
}

export const LOCATION_TYPE_MAP = {
  [LOCATION_TYPE_ENUM.PHYSICAL]: 'Física',
  [LOCATION_TYPE_ENUM.DIGITAL]: 'Digital',
};
