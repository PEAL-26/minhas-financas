import Modal from "@/components/modals";
import { Container } from "@/components/compounds/container";

import { FormularioRegistoDespesa } from "../formulario-registo";

interface EditModalProps {
  open: boolean;
}

export function EditModal({ open }: EditModalProps) {
  return (
    <Modal show={open}>
      <Container.Root>
        <Container.Header title="Editar Despesa" />
        <Container.Body>
          <FormularioRegistoDespesa />
        </Container.Body>
      </Container.Root>
    </Modal>
  );
}
