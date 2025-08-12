'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type Setting = {
  name: string;
  display: string;
  description?: string;
  value: any;
};

interface SettingsContextProps {
  settings: Setting[];
  getSettings?(): Promise<Setting[]>;
}

type SettingsProviderProps = {
  children: ReactNode;
};

const SettingsContext = createContext<SettingsContextProps>({} as SettingsContextProps);

export function SettingsProvider(props: SettingsProviderProps) {
  const { children } = props;
  const [settings, setSettings] = useState<Setting[]>([]);

  const getSettings = async () => {
    if (settings) return settings;

    return [];
  };

  useEffect(() => {
    if (settings.length === 0) {
      //const db = getSettings();
      //setSettings(db);
    }
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, getSettings }}>
      <>{children}</>
    </SettingsContext.Provider>
  );
}

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettingsContext deve ser usado dentro do SettingsProvider.');
  }

  return context;
};
