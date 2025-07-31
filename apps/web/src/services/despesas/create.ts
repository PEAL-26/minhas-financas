// import { db } from '@/libs/firebase';
// import { addDoc, collection } from 'firebase/firestore';

import { DespesasProps } from './types';

export async function createDespesa(
  props: Omit<DespesasProps, 'id' | 'created_at'>,
  //   userId: string
) {
  // const inputData = {
  //   data: new Date(props.data),
  //   data_termino: props.data_termino ? new Date(props.data_termino) : null,
  //   descricao: props.descricao,
  //   quantidade: props.quantidade,
  //   local: props.local,
  //   preco: props.preco,
  //   total: props.total,
  //   created_at: new Date(),
  // };

  // const postCollection = collection(db(), 'despesas');
  // await addDoc(postCollection, inputData);
}
