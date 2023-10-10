export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type LoginWithEmailPassword = {
  email: string;
  password: string;
};

export type SignWithEmailPassword = {
  name: string;
  email: string;
  password: string;
};

export interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  signWithEmailPassword(input: SignWithEmailPassword): Promise<void>;
  loginWithEmailPassword(input: LoginWithEmailPassword): Promise<void>;
  loginWithGoogle(): Promise<void>;
  logout(): Promise<void>;
}
