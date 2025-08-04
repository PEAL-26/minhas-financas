import { toast } from 'sonner';
import { messageErrorMap } from './message-error-map';

export function showToastDefault(message: string, title = '') {
  toast(title, {
    duration: 5000,
    description: message,
  });
}

export function showToastSuccess(message: string) {
  toast('Sucesso!', {
    duration: 5000,
    description: message,
  });
}

export function showToastWarning(message: string) {
  toast('Alerta!', {
    duration: 5000,
    description: message,
  });
}

export function showToastError(err: any) {
  const message = typeof err === 'string' ? err : messageErrorMap(err);
  toast('Oops! Algo deu errado.', {
    duration: 5000,
    description: message,
  });
}
