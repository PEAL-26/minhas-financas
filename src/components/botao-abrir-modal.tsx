"use client";
import { ReactNode, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "./modal";

interface BotaoAbrirModalProps {
  children?: ReactNode;
}

export function BotaoAbrirModal({ children }: BotaoAbrirModalProps) {
  const [openModal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };

  return (
    <>
      <button
        className="flex items-center justify-between gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={handleOpenModal}
      >
        <AiOutlinePlus size={20} /> Adicionar
      </button>

      <Modal show={openModal} onClose={setModal}>
        {children}
      </Modal>
    </>
  );
}
