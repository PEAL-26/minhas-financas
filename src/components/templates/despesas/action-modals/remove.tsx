import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "@/components/modals";
import { FormularioRegistoDespesa } from "../formulario-registo";
import { DespesasModalProps } from "./types";

export function DespesasModalRemove({ loading }: DespesasModalProps) {
  const handleRemoveDespesa = async (id: string) => {
    // try {
    //   setError(false);
    //   await removeDespesa(id);
    //   await listarDespesas();
    // } catch (error) {
    //   setError(true);
    //   console.log(error);
    // }
  };

  return (
    <div>
      <Modal.OpenButton icon={AiOutlinePlus} className="p-2">
        {(open) => (
          <div className="">
            <span className="text-center">Deseja remover esse item?</span>
            <div className="flex items-center justify-center gap-3">
              <button
                className="rounded bg-green-600 px-4 py-2 text-white"
                // onClick={() => handleRemoveDespesa(id)}
              >
                Sim
              </button>
              <button className="rounded bg-red-500 px-4 py-2 text-white ">
                Não
              </button>
            </div>
          </div>
        )}
      </Modal.OpenButton>
    </div>
  );
}
