import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "@/components/modals";

import { FormularioRegistoDespesa } from "../formulario-registo";

export function ActionButtonsAdd() {
  return (
    <div>
      <Modal.OpenButton icon={AiOutlinePlus} className="p-2">
        {(open) => <FormularioRegistoDespesa open={open} />}
      </Modal.OpenButton>
    </div>
  );
}
