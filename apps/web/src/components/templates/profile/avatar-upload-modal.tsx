'use client';

import type React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar';
import { Button } from '@repo/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@repo/ui/dialog';
import { showToastError } from '@repo/ui/helpers/toast';
import { Trash2, Upload } from 'lucide-react';
import { useRef, useState } from 'react';

interface AvatarUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAvatar: string;
  onAvatarUpdate: (newAvatar: string) => void;
}

export function AvatarUploadModal({
  open,
  onOpenChange,
  currentAvatar,
  onAvatarUpdate,
}: AvatarUploadModalProps) {
  const [previewAvatar, setPreviewAvatar] = useState(currentAvatar);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      showToastError({
        title: 'Erro',
        description: 'Por favor, selecione apenas arquivos de imagem.',
        variant: 'destructive',
      });
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToastError({
        title: 'Erro',
        description: 'A imagem deve ter no máximo 5MB.',
        variant: 'destructive',
      });
      return;
    }

    // Criar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewAvatar(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsLoading(true);

    // Simular upload
    setTimeout(() => {
      onAvatarUpdate(previewAvatar);
      setIsLoading(false);
      onOpenChange(false);
    }, 1500);
  };

  const handleRemove = () => {
    setPreviewAvatar('');
  };

  const handleClose = () => {
    setPreviewAvatar(currentAvatar);
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isLoading) {
      if (!newOpen) handleClose();
      else onOpenChange(newOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Alterar Avatar</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              {previewAvatar ? (
                <AvatarImage src={previewAvatar || '/placeholder.svg'} alt="Preview" />
              ) : (
                <AvatarFallback className="text-2xl">JS</AvatarFallback>
              )}
            </Avatar>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                <Upload className="mr-2 h-4 w-4" />
                Escolher Foto
              </Button>

              {previewAvatar && (
                <Button variant="outline" size="sm" onClick={handleRemove} disabled={isLoading}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remover
                </Button>
              )}
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Formatos aceitos: JPG, PNG, GIF
              <br />
              Tamanho máximo: 5MB
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isLoading || previewAvatar === currentAvatar}>
            {isLoading ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
