import { toast } from 'sonner';
import { messageErrorMap } from './message-error-map';

export function showToastDefault(message: string, title = '') {
  toast(title, {
    duration: 5000,
    description: message,
    descriptionClassName: 'text-black',
  });
}

export function showToastSuccess(message: string) {
  toast('Sucesso!', {
    duration: 5000,
    description: message,
    descriptionClassName: 'text-black',
    className: 'bg-green-500',
  });
}

export function showToastWarning(message: string) {
  toast('Alerta!', {
    duration: 5000,
    description: message,
    descriptionClassName: 'text-black',
    className: 'bg-yellow-500',
  });
}

export function showToastError(err: any) {
  console.log(err)
  const message = typeof err === 'string' ? err : messageErrorMap(err);
  toast('Oops! Algo deu errado.', {
    duration: 5000,
    description: message,
    descriptionClassName: 'text-black',
  });
}
