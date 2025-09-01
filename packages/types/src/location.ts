export type Location = {
  id: string;
  name: string;
  type: LOCATION_TYPE_ENUM;
  country?: string;
  province?: string;
  city?: string;
  address?: string | null;
  coordinate?: Coordinate | null;
  contacts?: string[];
  createdAt: Date;
  updatedAt: Date;
};

export const locationHelps: Partial<Record<keyof Location, string>> = {
  name: '',
  type: '',
  country: '',
  province: '',
  city: '',
  address: '',
  coordinate: '',
  contacts: '',
};

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type Price = {
  location: Location;
  amount: number;
};

export enum LOCATION_TYPE_ENUM {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
}

export const LOCATION_TYPE_MAP = {
  [LOCATION_TYPE_ENUM.PHYSICAL]: { display: 'Físico' },
  [LOCATION_TYPE_ENUM.DIGITAL]: { display: 'Digital' },
};
