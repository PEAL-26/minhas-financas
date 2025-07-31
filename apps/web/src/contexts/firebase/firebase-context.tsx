'use client';
import { ReactNode, createContext, useContext, useEffect } from 'react';

import { FirebaseContextProps } from './types';

const FirebaseContext = createContext<FirebaseContextProps>({} as FirebaseContextProps);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  useEffect(() => {}, []);

  return <FirebaseContext.Provider value={{}}>{children}</FirebaseContext.Provider>;
}

export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error('useFirebaseContext deve ser usado dentro do FirebaseProvider.');
  }

  return context;
};
