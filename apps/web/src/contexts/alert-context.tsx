'use client';
import { Alert } from '@/components/compounds/alert';
import { ReactNode, createContext, useContext, useState } from 'react';

interface AlertContextProps {
  showAlert(content: ReactNode): void;
}

const AlertContext = createContext<AlertContextProps>({} as AlertContextProps);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const handleShow = (content: ReactNode) => {
    setShow(true);
    setContent(content);
  };

  const handleHide = () => {
    setShow(false);
    setContent(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert: handleShow }}>
      {content && (
        <Alert show={show} onHide={handleHide}>
          {content}
        </Alert>
      )}
      {children}
    </AlertContext.Provider>
  );
}

export const useAlertContext = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useAlertContext deve ser usado dentro do AlertProvider.');
  }

  return context;
};
