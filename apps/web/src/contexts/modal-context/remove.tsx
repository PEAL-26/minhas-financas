import { Modal } from '@/components/modals';

export interface ModalRemoveContextProps {
  id: string;
  show: boolean;
  hide(): void;
  queryKey?: string[];
  removeFn?(id: string): Promise<void>;
}

export function ModalRemoveContext(props: ModalRemoveContextProps) {
  const { id, show, hide, removeFn, queryKey } = props;

  return (
    <Modal.Remove id={id || ''} open={show} close={hide} onYes={removeFn} queryKey={queryKey} />
  );
}
