import Modal from "@/components/modals";
import { Typography, Button } from "@/libs/material-tailwind";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

interface ModalRemoveProps {
  open: boolean;
  close?(state: boolean): void;
  onYes?(): void;
}

export function ModalRemove(props: ModalRemoveProps) {
  const { open, close, onYes } = props;

  const handleCancel = () => {
    close && close(false);
  };

  const handleYes = () => {
    onYes && onYes();
  };

  return (
    <Modal show={open} onClose={close} className="px-4 py-7">
      <div className="flex flex-col items-center justify-center">
        <ExclamationTriangleIcon width={72} className="mb-4 text-red-500" />
        <Typography variant="h3">Tem Certeza?</Typography>
        <Typography variant="small" className="max-w-md">
          Esta ação removerá o item. Você não poderá reverter isso.
        </Typography>

        <div className="mt-3 flex gap-2">
          <Button className="bg-red-500" onClick={handleYes}>
            Sim, remover
          </Button>
          <Button
            variant="outlined"
            className="border-red-500 text-red-500"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
