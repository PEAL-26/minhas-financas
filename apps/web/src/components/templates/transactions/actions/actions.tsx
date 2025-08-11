'use client';

import { SearchFormButton } from '@/components/ui/search-form-button';
import { useOpenModal } from '@/hooks/use-open-modal';
import { Button } from '@repo/ui/button';
import { PlusIcon } from '@repo/ui/lib/lucide';
import { TransactionFormSheet } from '../form';

interface Props {}

export function ListTransactionsActions(props: Props) {
  const {} = props;
  const { openComponent, mountComponent, handleOpen, handleClose } = useOpenModal();

  return (
    <>
      <div className="flex items-center gap-2">
        <SearchFormButton />
        <Button variant="default" size="default" className="gap-1" onClick={handleOpen}>
          <PlusIcon className="size-4 text-white" /> Adicionar
        </Button>
      </div>

      {mountComponent && <TransactionFormSheet open={openComponent} onClose={handleClose} />}
    </>
  );
}
