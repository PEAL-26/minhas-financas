// import { db } from '@/libs/firebase';
// import {
//   DocumentData,
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDoc,
//   getDocs,
//   updateDoc,
//   writeBatch,
// } from 'firebase/firestore';
import { Filtros, construirConsulta } from './_generics';

export interface RendaProps {
  id?: string;
  tipo: string;
  descricao: string;
  moeda?: string;
  valor: number;
  created_at?: Date;
}

function firebaseMapper(doc:any /*DocumentData*/): RendaProps {
  const { tipo, descricao, moeda, valor, created_at } = doc.data();

  return {
    id: doc.id,
    tipo,
    descricao,
    moeda,
    valor,
    created_at: created_at.toDate(),
  };
}

function rendaMapper(renda: RendaProps): RendaProps {
  const { id, tipo, descricao, moeda, valor, created_at } = renda;

  return {
    id,
    tipo,
    descricao,
    moeda,
    valor,
    created_at: created_at || new Date(),
  };
}

export async function createRenda(props: Omit<RendaProps, 'id' | 'created_at'>) {
  // const inputData = {
  //   tipo: props.tipo,
  //   descricao: props.descricao,
  //   moeda: props.moeda,
  //   valor: props.valor,
  //   created_at: new Date(),
  // };

  // const postCollection = collection(db(), 'rendas');
  // await addDoc(postCollection, inputData);
}

export async function createBulkRendas(inputs: Omit<RendaProps, 'id' | 'created_at'>[]) {
  // const batch = writeBatch(db());

  // inputs.map((props) => {
  //   const data = rendaMapper({ ...props, id: undefined });
  //   const docRef = doc(collection(db(), 'rendas'));
  //   batch.set(docRef, data);
  // });

  // return batch.commit();

  return {} as any;
}

export async function updateRenda(props: Omit<RendaProps, 'created_at'>) {
  // const inputData = {
  //   tipo: props.tipo,
  //   descricao: props.descricao,
  //   moeda: props.moeda,
  //   valor: props.valor,
  // };

  // if (props.id) {
  //   const docRef = doc(db(), 'rendas', props.id);
  //   await updateDoc(docRef, inputData);
  // }
}

export async function removeRenda(id: string) {
  // await deleteDoc(doc(db(), 'rendas', id));
}

export async function listarTodasRendas(filtros?: Filtros): Promise<RendaProps[]> {
  // const rendasCollection = collection(db(), 'rendas');
  // const consulta = construirConsulta(rendasCollection, filtros);
  // const querySnapshot = await getDocs(consulta);
  // const rendas = querySnapshot.docs.map((doc) => firebaseMapper(doc));

  // return rendas;

  return []
}

export async function buscarRendaPorId(id: string) {
  // const docRef = doc(db(), 'rendas', id);
  // const docSnap = await getDoc(docRef);

  // return docSnap.exists() ? firebaseMapper(docSnap) : null;

  return null
}
