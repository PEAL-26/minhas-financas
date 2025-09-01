export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash?: string | null;
  providerId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const userHelps: Partial<Record<keyof User, string>> = {
  name: '',
  email: '',
  passwordHash: '',
  providerId: '',
};
