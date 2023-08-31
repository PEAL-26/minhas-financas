import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "@/components/modals";
import { FormularioRegistoDespesa } from "../formulario-registo";
import { DespesasModalProps } from "./types";

export function DespesasModalEdit({ loading }: DespesasModalProps) {
  return (
    <div>
      <Modal.OpenButton icon={AiOutlinePlus} className="p-2">
        {(open) => <FormularioRegistoDespesa open={open} onLoading={loading} />}
      </Modal.OpenButton>
    </div>
  );
}
