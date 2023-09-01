"use client";
import { twMerge } from "tailwind-merge";
import { IconBaseProps } from "react-icons";
import { ElementType, ReactElement, ReactNode, useState } from "react";

import { ModalRoot } from "./modal-root";

type Open = () => void;

interface ModalOpenButtonProps {
  children?(open: boolean): ReactNode;
  title?: string;
  className?: string;
  icon?: ElementType<IconBaseProps>;
  iconClassName?: string;
  close?(): void;
  closeButton?: boolean;
  buttonCustom?(open: Open): ReactElement;
}

export function ModalOpenButton(props: ModalOpenButtonProps) {
  const {
    children,
    title,
    className,
    icon: Icon,
    closeButton = true,
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
          className={twMerge(
            "group flex items-center justify-between gap-2 rounded-full bg-white p-2 px-5 py-2.5 text-center text-sm font-medium text-green-500 shadow hover:bg-green-600  hover:text-white",
            className
          )}
          onClick={handleOpenModal}
        >
          {Icon && <Icon size={20} />}
          {title}
        </button>
      )}

      <ModalRoot closeButton={closeButton} show={openModal} onClose={setModal}>
        {children && children(openModal)}
      </ModalRoot>
    </>
  );
}
