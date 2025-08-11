'use client';

import { useOpenModal } from '@/hooks/use-open-modal';
import { Button } from '@repo/ui/button';
import { PlusIcon } from '@repo/ui/lib/lucide';
import { WalletFormSheet } from '../form';

export function AddWalletButton() {
  const { openComponent, mountComponent, handleOpen, handleClose } = useOpenModal();

  return (
    <>
      <Button variant="default" size="default" className="gap-1" onClick={handleOpen}>
        <PlusIcon className="size-4 text-white" /> Criar Carteira
      </Button>

      {mountComponent && <WalletFormSheet open={openComponent} onClose={handleClose} />}
    </>
  );
}
