import { XMarkIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@/libs/material-tailwind";

import Modal from "@/components/modals";
import { Container } from "@/components/compounds/container";

import { FormularioRegistoDespesa } from "../formulario-registo";

interface EditModalProps {
  id?: string;
  open: boolean;
  close?(state: boolean): void;
}

export function ActionEdit(props: EditModalProps) {
  const { id, open, close } = props;

  return (
    <Modal show={open} onClose={close} className="bg-transparent p-0">
      <Container.Root>
        <Container.Header title="Editar Despesa">
          <IconButton
            variant="text"
            color="white"
            onClick={() => close && close(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </Container.Header>
        <Container.Body className="p-5 pt-0">
          <FormularioRegistoDespesa open={open} id={id} />
        </Container.Body>
      </Container.Root>
    </Modal>
  );
}
