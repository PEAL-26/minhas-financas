import * as firebaseApp from 'firebase/app';
import * as firebaseFirestore from 'firebase/firestore';

export class Firebase {
  private app: firebaseApp.FirebaseApp;
  private firestore: firebaseFirestore.Firestore | undefined;

  constructor(private options: firebaseApp.FirebaseOptions) {
    this.app = firebaseApp.initializeApp(options);
  }

  async getApp() {
    if (this.app) return this.app;

    const apps = firebaseApp.getApps();
    let _app = null;

    if (apps.length) {
      _app = apps[0];
    } else {
      _app = firebaseApp.initializeApp(this.options);
    }

    return _app;
  }

  async getFirestore() {
    if (this.firestore) return this.firestore;

    const app = await this.getApp();
    const firestore = firebaseFirestore.getFirestore(app);

    this.firestore = firestore;

    return firestore;
  }
}
