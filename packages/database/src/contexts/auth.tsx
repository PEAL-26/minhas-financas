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
  isLoading: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
  platform: 'web' | 'mobile';
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider(props: AuthProviderProps) {
  const { children, platform } = props;

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setSiLoading] = useState(true);

  const getUser = async () => {
    if (user) return user;

    return [];
  };

  useEffect(() => {
    (async () => {
      setSiLoading(true);
      // TODO Implementar o código de carregar o usuário

      setSiLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      <>{children}</>
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthsContext deve ser usado dentro do AuthProvider.');
  }

  return context;
};
