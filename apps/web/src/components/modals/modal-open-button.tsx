'use client';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { cn } from '@repo/ui/lib/utils';
import { ElementType, ReactElement, ReactNode, useState } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from '../compounds/container';
import { ModalRoot } from './modal-root';

type Open = () => void;

interface ModalOpenButtonProps {
  children?(open: boolean): ReactNode;
  titleButton?: string;
  titleModal?: string;
  className?: string;
  icon?: ElementType<IconBaseProps>;
  iconClassName?: string;
  close?(): void;
  buttonCustom?(open: Open): ReactElement;
}

export function ModalOpenButton(props: ModalOpenButtonProps) {
  const {
    children,
    titleButton,
    titleModal,
    className,
    icon: Icon,
    buttonCustom: ButtonCustom,
  } = props;
  const [openModal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
    close && close();
  };

  return (
    <>
      {(ButtonCustom && ButtonCustom(() => handleOpenModal())) || (
        <button
          className={cn(
            'group flex items-center justify-between gap-2 rounded-full bg-white p-2 px-5 py-2.5 text-center text-sm font-medium text-green-500 shadow hover:bg-green-600 hover:text-white',
            className,
          )}
          onClick={handleOpenModal}
        >
          {Icon && <Icon size={20} />}
          {titleButton}
        </button>
      )}

      <ModalRoot show={openModal} onClose={setModal} className="bg-transparent p-0">
        <Container.Root>
          <Container.Header title={titleModal}>
            <button onClick={handleClose}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </Container.Header>
          <Container.Body className="p-5 pt-0">{children && children(openModal)}</Container.Body>
        </Container.Root>
      </ModalRoot>
    </>
  );
}
