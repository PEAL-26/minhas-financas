import Modal from '@/components/modals';
import { useAlertContext } from '@/contexts/alert-context';
import { Button, Typography } from '@/libs/material-tailwind';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ModalRemoveProps {
  id: string;
  open: boolean;
  close?(state: boolean): void;
  onYes?(id: string): Promise<void>;
  queryKey?: string[];
}

export function ModalRemove(props: ModalRemoveProps) {
  const { id, open, queryKey, close, onYes } = props;

  const { showAlert } = useAlertContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: onYes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleCancel = () => {
    close && close(false);
  };

  const handleYes = async () => {
    try {
      if (mutation.isLoading) return;

      await mutation.mutateAsync(id);
      handleCancel();
    } catch (error) {
      showAlert(<span className="text-center text-white">Erro ao remover registo!</span>);
    }
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
            disabled={mutation.isLoading}
            data-loading={mutation.isLoading}
            variant="outlined"
            className="border-red-500 text-red-500 data-[loading=true]:cursor-wait"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
