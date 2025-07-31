//import { db } from '@/libs/firebase';
//import { collection, doc, writeBatch } from 'firebase/firestore';

import { DespesasProps } from './types';

export async function createBulkDespesas(input: Omit<DespesasProps, 'id' | 'created_at'>[]) {
  // const inputData = input.map((props) => ({
  //   data: new Date(props.data),
  //   data_termino: props.data_termino ? new Date(props.data_termino) : null,
  //   descricao: props.descricao,
  //   quantidade: props.quantidade,
  //   local: props.local,
  //   preco: props.preco,
  //   total: props.total,
  //   created_at: new Date(),
  // }));

  // const batch = writeBatch(db());

  // inputData.forEach((data) => {
  //   const docRef = doc(collection(db(), 'despesas'));
  //   batch.set(docRef, data);
  // });

  // return batch.commit();
}
