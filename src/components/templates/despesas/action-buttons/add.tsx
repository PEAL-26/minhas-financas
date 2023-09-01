import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "@/components/modals";
import { FormularioRegistoDespesa } from "../formulario-registo";
import { ActionButtonsProps } from "./types";

export function ActionButtonsAdd({ loading }: ActionButtonsProps) {
  return (
    <div>
      <Modal.OpenButton icon={AiOutlinePlus} className="p-2">
        {(open) => <FormularioRegistoDespesa open={open} onLoading={loading} />}
      </Modal.OpenButton>
    </div>
  );
}
