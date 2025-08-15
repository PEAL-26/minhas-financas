//import { AxiosError } from 'axios';
import { FirebaseError } from 'firebase/app';
import { ZodError } from 'zod';

//import { axiosErrorToMessage } from './axios-error';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '@repo/constants/messages';
import { propertiesMap } from '@repo/types/schemas/properties-map';
import { firebaseAuthErrorMap } from './firebase';

const checkTypeErrors = (err: any) => {
  if (typeof err === 'string') return err;

  // if (err instanceof AxiosError) {
  //   return axiosErrorToMessage(err);
  // }

  if (err instanceof ZodError) {
    const errors = err._zod.def
      .map((e) => {
        const names = e.path
          .map((name) => propertiesMap?.[name as keyof typeof propertiesMap] || 'unknown')
          .join(', ');

        return `${names}, ${e.message.toLowerCase()}`;
      })
      .join(' ');

    return errors;
  }

  if (err instanceof FirebaseError) {
    return firebaseAuthErrorMap[err.code];
  }

  if (err instanceof Error) {
    return err.message;
  }

  console.error(err);
  return null;
};

export function messageErrorMap(err: any) {
  let message = checkTypeErrors(err);

  return message || INTERNAL_SERVER_ERROR_MESSAGE;
}
