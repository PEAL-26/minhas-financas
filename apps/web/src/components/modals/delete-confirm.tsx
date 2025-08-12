'use client';

import { Button } from '@repo/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/dialog';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';
import { AlertTriangleIcon } from '@repo/ui/lib/lucide';
import { useState } from 'react';

interface DeleteConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ open, onOpenChange, onConfirm }: DeleteConfirmModalProps) {
  const [confirmText, setConfirmText] = useState('');
  const isConfirmEnabled = confirmText === 'APAGAR';

  const handleConfirm = () => {
    if (isConfirmEnabled) {
      onConfirm();
      setConfirmText('');
    }
  };

  const handleClose = () => {
    setConfirmText('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangleIcon className="h-5 w-5" />
            Apagar Todos os Dados
          </DialogTitle>
          <DialogDescription className="text-left">
            Esta ação é <strong>irreversível</strong> e removerá permanentemente todos os seus
            dados: contas, transações, categorias, despesas, rendimentos e listas de desejos.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="confirm-input">
              Digite <strong>APAGAR</strong> para confirmar:
            </Label>
            <Input
              id="confirm-input"
              value={confirmText}
              onChange={(e) => setConfirmText((e.target as any).value)}
              placeholder="Digite APAGAR"
              className="font-mono"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={!isConfirmEnabled}>
              Apagar Todos os Dados
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
