export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash?: string | null;
  providerId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
