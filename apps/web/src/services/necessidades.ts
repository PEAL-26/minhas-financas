import { db } from '@/libs/firebase';
import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { Filtros, construirConsulta } from './_generics';

export type PrioridadeType = 0 | 1 | 2;

export const prioridadeToString = (prioridade: PrioridadeType): string => {
  const prioridades: Record<PrioridadeType, string> = {
    0: 'Mínima',
    1: 'Normal',
    2: 'Máxima',
  };

  return prioridades[prioridade] || '';
};

export const TIPO_NECESSIDADE = {
  unica: { valor: 0, display: 'Única' },
  diaria: { valor: 1, display: 'Diária' },
  semanal: { valor: 7, display: 'Semanal' },
  mensal: { valor: 30, display: 'Mensal' },
  anual: { valor: 365, display: 'Anual' },
  custom: { valor: null, display: 'Personalizado' },
};

export type TipoNecessidade = typeof TIPO_NECESSIDADE;
export type TipoNecessidadeKey = keyof typeof TIPO_NECESSIDADE;
export type TipoNecessidadeKeyType = 'valor' | 'display';
export interface NecessidadeProps {
  id?: string;
  item: string;
  descricao?: string;
  categoria: string;
  prioridade: PrioridadeType;
  tipo: TipoNecessidade;
  valor: number;
}

function firebaseMapper(doc: DocumentData): NecessidadeProps {
  const { item, descricao, categoria, prioridade, tipo, valor } = doc.data();

  return {
    id: doc.id,
    item,
    descricao,
    categoria,
    prioridade,
    tipo: tipo,
    valor,
  };
}

function necessidadeMapper(renda: NecessidadeProps): NecessidadeProps {
  const { id, item, descricao, categoria, prioridade, tipo, valor } = renda;

  return {
    id,
    item,
    descricao,
    categoria,
    prioridade,
    tipo,
    valor,
  };
}

export async function createNecessidade(input: Omit<NecessidadeProps, 'id'>) {
  const postCollection = collection(db(), 'necessidades');
  await addDoc(postCollection, input);
}

export async function createBulkNecessidades(
  inputs: Omit<NecessidadeProps, 'id' | 'created_at'>[],
) {
  const batch = writeBatch(db());

  inputs.map((props) => {
    const data = necessidadeMapper({ ...props, id: undefined });
    const docRef = doc(collection(db(), 'necessidades'));
    batch.set(docRef, data);
  });

  return batch.commit();
}

export async function updateNecessidade(props: NecessidadeProps) {
  const inputData = {
    item: props.item,
    descricao: props.descricao,
    categoria: props.categoria,
    prioridade: props.prioridade,
    tipo: props.tipo,
    valor: props.valor,
  };

  if (props.id) {
    const docRef = doc(db(), 'necessidades', props.id);
    await updateDoc(docRef, inputData);
  }
}

export async function removeNecessidade(id: string) {
  await deleteDoc(doc(db(), 'necessidades', id));
}

export async function listarTodasNecessidades(filtros?: Filtros): Promise<NecessidadeProps[]> {
  const necessidadesCollection = collection(db(), 'necessidades');
  const consulta = construirConsulta(necessidadesCollection, filtros);
  const querySnapshot = await getDocs(consulta);
  const necessidades = querySnapshot.docs.map((doc) => firebaseMapper(doc));

  return necessidades;
}

export async function buscarNecessidadePorId(id: string) {
  const docRef = doc(db(), 'necessidades', id);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? firebaseMapper(docSnap) : null;
}

export function getTipoNecessidadeValue(tipo: TipoNecessidade, key: TipoNecessidadeKeyType) {
  return TIPO_NECESSIDADE[Object.keys(tipo)[0] as TipoNecessidadeKey][key];
}
