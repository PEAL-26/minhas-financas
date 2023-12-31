import { ReactNode, useEffect } from "react";
import { GrClose } from "react-icons/gr";

interface ModalProps {
  show?: boolean;
  onClose?(state: boolean): void;
  children?: ReactNode;
  closeButton?: boolean;
}

export function Modal(props: ModalProps) {
  const { children, show, onClose, closeButton = true } = props;

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [show]);

  const handleClose = () => {
    onClose && onClose(false);
  };

  return (
    <div
      data-show={show}
      className="fixed inset-0 z-[9999] h-full w-full items-center justify-center bg-black/50 data-[show=true]:flex data-[show=false]:hidden"
      onClick={(e) => e.target == e.currentTarget && handleClose()}
    >
      <div
        className="relative flex flex-col rounded-md bg-white p-5 pt-14 shadow"
        onClick={(e) => e.stopPropagation()}
      >
        {closeButton && (
          <button onClick={handleClose} className="absolute right-4 top-4">
            <GrClose size={30} className="" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
