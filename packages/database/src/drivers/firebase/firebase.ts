import * as firebaseApp from 'firebase/app';
import * as firebaseFirestore from 'firebase/firestore';
import { Firebase } from '../../libs/firebase';
import {
  DatabaseConfig,
  Field,
  IDatabase,
  ListPaginateConfigs,
  PaginatedResult,
  UpdateBulkData,
} from '../../types';
import { queryBuild } from './utils';

export class DatabaseFirebase implements IDatabase {
  private firestore: firebaseFirestore.Firestore | undefined;

  constructor(private options: firebaseApp.FirebaseOptions) {
    this.init();
  }

  async init() {
    if (!this.firestore) {
      const firebase = new Firebase(this.options);
      this.firestore = await firebase.getFirestore();
    }
  }

  //#region hidden
  transaction(callback: () => Promise<void>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  sqlUnsafe(sql: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  select<T>(fields: Field<T>, tableName: string): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  query<T>(sql: string): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  listAllEach<T>(tableName: string, configs?: ListPaginateConfigs): AsyncIterableIterator<T> {
    throw new Error('Method not implemented.');
  }
  //#endregion

  async listAll<T>(tableName: string, configs?: DatabaseConfig): Promise<T[]> {
    if (!this.firestore) {
      await this.init();
    }

    if (!this.firestore) {
      throw new Error('firestore required');
    }

    const collection = firebaseFirestore.collection(this.firestore, tableName);
    const queryConfig = queryBuild(collection, configs);
    const { docs, empty, metadata, size, query } = await firebaseFirestore.getDocs(queryConfig);

    return docs as T[];
  }

  listPaginate<T>(tableName: string, configs?: ListPaginateConfigs): Promise<PaginatedResult<T>> {
    throw new Error('Method not implemented.');
  }

  async insert<T>(tableName: string, data: Record<string, any>): Promise<T> {
    if (!this.firestore) {
      await this.init();
    }

    if (!this.firestore) {
      throw new Error('firestore required');
    }

    const collection = firebaseFirestore.collection(this.firestore, tableName);
    const response = await firebaseFirestore.addDoc(collection, data);

    return {} as T;
  }

  insertBulk(tableName: string, data: Record<string, any>[]): Promise<void> {
    // const batch = writeBatch(db());

    // inputs.map((props) => {
    //   const data = necessidadeMapper({ ...props, id: undefined });
    //   const docRef = doc(collection(db(), 'necessidades'));
    //   batch.set(docRef, data);
    // });

    // return batch.commit();
    throw new Error('Method not implemented.');
  }

  async update<T>(tableName: string, data: Record<string, any>, id: any): Promise<T> {
    if (!this.firestore) {
      await this.init();
    }

    if (!this.firestore) {
      throw new Error('firestore required');
    }

    const docRef = firebaseFirestore.doc(this.firestore, tableName, id);
    await firebaseFirestore.updateDoc(docRef, data);

    return {} as T;
  }

  updateBulk<T>(tableName: string, data: UpdateBulkData[]): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  async delete(tableName: string, where: Record<string, any>): Promise<void> {
    if (!this.firestore) {
      await this.init();
    }

    if (!this.firestore) {
      throw new Error('firestore required');
    }

    const paths = Object.values(where).map((value) => String(value));
    const docRef = firebaseFirestore.doc(this.firestore, tableName, ...paths);
    await firebaseFirestore.deleteDoc(docRef);
  }

  async getFirst<T>(tableName: string, configs?: DatabaseConfig): Promise<T | null> {
    const { where = {} } = configs || {};
    if (!this.firestore) {
      await this.init();
    }

    if (!this.firestore) {
      throw new Error('firestore required');
    }

    const paths = Object.values(where).map((value) => String(value));
    const docRef = firebaseFirestore.doc(this.firestore, tableName, ...paths);
    const docSnap = await firebaseFirestore.getDoc(docRef);

    if (!docSnap.exists()) return null;

    return docSnap.data() as T;
  }
}
