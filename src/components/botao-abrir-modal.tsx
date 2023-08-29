"use client";
import { twMerge } from "tailwind-merge";
import { ElementType, ReactNode, SVGProps, useState } from "react";
import { IconBaseProps } from "react-icons";
import { Modal } from "./modal";

interface BotaoAbrirModalProps {
  children?(open: boolean): ReactNode;
  title?: string;
  className?: string;
  icon?: ElementType<IconBaseProps>;
  close?(): void;
  closeButton?: boolean;
}

export function BotaoAbrirModal(props: BotaoAbrirModalProps) {
  const { children, title, className, icon: Icon, closeButton = true } = props;
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

      <Modal closeButton={closeButton} show={openModal} onClose={setModal}>
        {children && children(openModal)}
      </Modal>
    </>
  );
}
