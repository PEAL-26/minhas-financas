export type Category = {
  id: string;
  name: string;
  icon?: string | null;
  color?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const categoryHelps: Partial<Record<keyof Category, string>> = {
  name: '',
};
