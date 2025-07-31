'use client';
import { ReactNode, createContext, useContext, useState } from 'react';
import { ModalRegistoContext } from './registo';
import { ModalRemoveContext } from './remove';

type RegistoProps = {
  title: string;
  content: ReactNode | null;
};

type RemoveProps = {
  id: string;
  removeFn?(id: string): Promise<void>;
  queryKey?: string[];
};

interface ModalContextProps {
  showModalRegisto(title: string, content: ReactNode): void;
  showModalRemove(props: RemoveProps): void;
}

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const [registo, setRegisto] = useState<RegistoProps | null>(null);
  const [remove, setRemove] = useState<RemoveProps | null>(null);

  const showModalRegisto = (title: string, content: ReactNode) => {
    setShow(true);
    setRegisto({ title, content });
  };

  const showModalRemove = (props: RemoveProps) => {
    setShow(true);
    setRemove(props);
  };

  const handleHide = () => {
    setShow(false);
    setRemove(null);
    setRegisto(null);
  };

  return (
    <ModalContext.Provider value={{ showModalRegisto, showModalRemove }}>
      {children}
      {registo && (
        <ModalRegistoContext
          show={show}
          title={registo.title}
          content={registo.content}
          handleHide={handleHide}
        />
      )}
      {remove && (
        <ModalRemoveContext
          id={remove.id}
          removeFn={remove.removeFn}
          queryKey={remove.queryKey}
          show={show}
          hide={handleHide}
        />
      )}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext deve ser usado dentro do ModalProvider.');
  }

  return context;
};
