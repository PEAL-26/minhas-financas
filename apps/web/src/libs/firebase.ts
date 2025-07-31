// import admin, { ServiceAccount, cert } from 'firebase-admin/app'
import { getApps, initializeApp } from 'firebase/app';
import { getAuth as getAuthFirebase } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from '@/configs/firebase-config';

// Initialize Firebase
const verifyApp = () => {
  const app = getApps();
  if (app.length) {
    return app[0];
  }

  return initializeApp(firebaseConfig);
};

export const app = verifyApp();
export const db = () => getFirestore(app);
export const auth = getAuthFirebase(app);
