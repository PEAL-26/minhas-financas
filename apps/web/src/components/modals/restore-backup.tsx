'use client';

import { Button } from '@repo/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/dialog';
import { AlertTriangleIcon, UploadIcon } from '@repo/ui/lib/lucide';
import type React from 'react';
import { useRef, useState } from 'react';

interface RestoreBackupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RestoreBackupModal({ open, onOpenChange }: RestoreBackupModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files?.[0];
    // if (file && file.type === 'application/json') {
    //   setSelectedFile(file);
    // } else {
    //   showToastError({
    //     title: 'Arquivo inválido',
    //     description: 'Por favor, selecione um arquivo JSON válido.',
    //     variant: 'destructive',
    //   });
    // }
  };

  const handleRestore = async () => {
    if (!selectedFile) return;

    setIsRestoring(true);

    // Simular processo de restauração
    setTimeout(() => {
      // toast({
      //   title: 'Backup restaurado',
      //   description: 'Seus dados foram restaurados com sucesso.',
      // });
      setIsRestoring(false);
      setSelectedFile(null);
      onOpenChange(false);
    }, 2000);
  };

  const handleClose = () => {
    setSelectedFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UploadIcon className="h-5 w-5" />
            Restaurar Cópia de Segurança
          </DialogTitle>
          <DialogDescription className="text-left">
            <div className="flex items-start gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-3">
              <AlertTriangleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                <strong>Atenção:</strong> Esta ação substituirá todos os seus dados existentes pelos
                dados do arquivo de backup.
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />

            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => (fileInputRef.current as any)?.click()}
            >
              <UploadIcon className="mr-2 h-4 w-4" />
              Selecionar Arquivo de Backup
            </Button>

            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                Arquivo selecionado: {selectedFile.name}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={handleRestore} disabled={!selectedFile || isRestoring}>
              {isRestoring ? 'Restaurando...' : 'Restaurar Backup'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
