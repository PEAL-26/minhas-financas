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
}

export function BotaoAbrirModal(props: BotaoAbrirModalProps) {
  const { children, title, className, icon: Icon } = props;
  const [openModal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };

  return (
    <>
      <button
        className={twMerge(
          "group flex items-center justify-between gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300",
          className
        )}
        onClick={handleOpenModal}
      >
        {Icon && <Icon size={20} />}
        {title}
      </button>

      <Modal show={openModal} onClose={setModal}>
        {children && children(openModal)}
      </Modal>
    </>
  );
}
