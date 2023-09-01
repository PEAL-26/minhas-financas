import { Modal } from "@/components/modals";

interface RemoveModalProps {
  id?: string;
  open: boolean;
  close?(state: boolean): void;
}

export function ActionRemove(props: RemoveModalProps) {
  const { id, open, close } = props;
  const handleRemoveDespesa = async () => {
    // try {
    //   setError(false);
    //   await removeDespesa(id);
    //   await listarDespesas();
    // } catch (error) {
    //   setError(true);
    //   console.log(error);
    // }
  };

  return <Modal.Remove open={open} close={close} onYes={handleRemoveDespesa} />;
}
