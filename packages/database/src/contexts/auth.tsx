'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
};

interface AuthContextProps {
  user: User | null;
}

type AuthProviderProps = {
  children: ReactNode;
  platform: 'web' | 'mobile';
};

const AuthsContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider(props: AuthProviderProps) {
  const { children, platform } = props;
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    if (user) return user;

    return [];
  };

  useEffect(() => {
    if (!user) {
      //const db = getAuths();
      //setAuths(db);
    }
  }, []);

  return (
    <AuthsContext.Provider value={{ user }}>
      <>{children}</>
    </AuthsContext.Provider>
  );
}

export const useAuthsContext = () => {
  const context = useContext(AuthsContext);

  if (!context) {
    throw new Error('useAuthsContext deve ser usado dentro do AuthProvider.');
  }

  return context;
};
