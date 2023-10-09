// import admin, { ServiceAccount, cert } from 'firebase-admin/app'
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth as getAuthFirebase } from "firebase/auth";

import { firebaseConfig } from "@/configs/firebase-config";

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
