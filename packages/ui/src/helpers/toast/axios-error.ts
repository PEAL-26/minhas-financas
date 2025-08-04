import { AxiosError } from 'axios';

export function axiosErrorToMessage(error: any) {
  if (!(error instanceof AxiosError)) return String(error);
  const dataMessages = error.response?.data?.message || error.response?.data?.errors;

  if (
    error.code === 'ECONNABORTED' ||
    error.code === 'ECONNRESET' ||
    error.code === 'ERR_NETWORK'
  ) {
    return 'Não foi possível estabelecer uma conexão com servidor, tente mais tarde.';
  }

  if (Array.isArray(dataMessages)) {
    const mensagens = dataMessages?.map((error: any) => {
      if (typeof error === 'object') {
        return `${error.message} `;
      }

      return String(error).trim();
    });

    return mensagens.join('\n');
  }

  if (typeof dataMessages === 'object') return String(dataMessages?.message || '');

  return String(dataMessages).trim();
}
