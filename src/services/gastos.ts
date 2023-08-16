import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "@/libs/firebase";

export interface GastosProps {
  id: string;
  data: Date;
  data_termino: Date | null;
  descricao: string;
  quantidade: number;
  local?: string;
  preco: number;
  total: number;
  created_at: Date;
}

export async function createGastos(
  props: Omit<GastosProps, "id" | "created_at">
) {
  const inputData = {
    data: new Date(props.data),
    data_termino: props.data_termino ? new Date(props.data_termino) : null,
    descricao: props.descricao,
    quantidade: props.quantidade,
    local: props.local,
    preco: props.preco,
    total: props.total,
    created_at: new Date(),
  };

  const postCollection = collection(db(), "gastos");
  await addDoc(postCollection, inputData);
}

export async function listarTodosGastos(): Promise<GastosProps[]> {
  const gastos: GastosProps[] = [];
  const gastosCollection = collection(db(), "gastos");
  const gastosQuery = query(gastosCollection, orderBy("data", "desc"));
  const querySnapshot = await getDocs(gastosQuery);

  querySnapshot.forEach((doc) => {
    const {
      data,
      descricao,
      local,
      data_termino,
      quantidade,
      preco,
      total,
      created_at,
    } = doc.data();

    gastos.push({
      id: doc.id,
      data: data.toDate(),
      data_termino: data_termino && data_termino.toDate(),
      descricao,
      local,
      quantidade,
      preco,
      total,
      created_at: created_at.toDate(),
    });
  });

  return gastos;
}
