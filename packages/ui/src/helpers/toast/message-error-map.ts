//import { AxiosError } from 'axios';
import { FirebaseError } from 'firebase/app';
//import { axiosErrorToMessage } from './axios-error';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '@repo/constants/messages';
import { firebaseAuthErrorMap } from './firebase';

const checkTypeErrors = (err: any) => {
  if (typeof err === 'string') return err;

  // if (err instanceof AxiosError) {
  //   return axiosErrorToMessage(err);
  // }

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
