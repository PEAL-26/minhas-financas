import { db } from "@/libs/firebase";
import { DocumentData, addDoc, collection, getDocs } from "firebase/firestore";
import { Filtros, Replace, construirConsulta } from "./_generics";

export type PrioridadeType = 0 | 1 | 2;

export const prioridadeToString = (prioridade: PrioridadeType): string => {
  const prioridades: Record<PrioridadeType, string> = {
    0: "Mínima",
    1: "Normal",
    2: "Máxima",
  };

  return prioridades[prioridade] || "";
};

export const TIPO_NECESSIDADE = {
  unica: { valor: 0, display: "Única" },
  diaria: { valor: 1, display: "Diária" },
  semanal: { valor: 7, display: "Semanal" },
  mensal: { valor: 30, display: "Mensal" },
  anual: { valor: 365, display: "Anual" },
};

export interface NecessidadeProps {
  id?: string;
  item: string;
  descricao?: string;
  categoria: string;
  prioridade: PrioridadeType;
  tipo: (typeof TIPO_NECESSIDADE)[keyof typeof TIPO_NECESSIDADE];
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
    tipo,
    valor,
  };
}

export async function listarTodasNecessidades(
  filtros?: Filtros
): Promise<NecessidadeProps[]> {
  const necessidadesCollection = collection(db(), "necessidades");
  const consulta = construirConsulta(necessidadesCollection, filtros);
  const querySnapshot = await getDocs(consulta);
  const necessidades = querySnapshot.docs.map((doc) => firebaseMapper(doc));

  return necessidades;
}

export async function createNecessidade(input: Omit<NecessidadeProps, "id">) {
  const postCollection = collection(db(), "necessidades");
  await addDoc(postCollection, input);
}
