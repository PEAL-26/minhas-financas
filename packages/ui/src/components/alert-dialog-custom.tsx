'use client';
import { Loader2Icon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';
import { Button } from './button';

interface Props {
  open: boolean;
  id?: string;
  children?: ReactNode;
  triggerButtonText?: string;
  confirmText?: string;
  cancelText?: string;
  title?: string;
  description?: string;
  isDirty?: boolean;
  fn?(id: string): Promise<void>;
  onCancel?(): void;
  onConfirm?(): void;
  onClose?(): void;
}

export function AlertDialogCustom(props: Props) {
  const {
    open,
    id = '',
    children,
    triggerButtonText,
    title = 'Tem Certeza?',
    description = 'Esta ação não pode ser desfeita. Isso excluirá permanentemente o item.',
    cancelText = 'Cancelar',
    confirmText = 'Confirmar',
    isDirty,
    fn,
    onConfirm,
    onCancel,
    onClose,
  } = props;

  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      if (fn && !id) throw new Error('id obrigatório');
      await fn?.(id);
      onConfirm?.();
      onClose?.();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (isLoading) return;
    onCancel?.();
    onClose?.();
  };

  return (
    <AlertDialog open={open}>
      {(children || triggerButtonText) && (
        <AlertDialogTrigger asChild>
          {children ? (
            children
          ) : (
            <Button variant="destructive" className="w-full">
              {triggerButtonText}
            </Button>
          )}
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} onClick={handleCancel}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={handleConfirm}>
            {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
