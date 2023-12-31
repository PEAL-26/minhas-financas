import {
  collection,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  getDocs,
  orderBy,
  where,
  doc,
  writeBatch,
  Timestamp,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/libs/firebase";
import { monthNumberToString } from "@/helpers/converter-mes";
import { Filtros, construirConsulta } from "./_generics";

export interface DespesasProps {
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

export async function createDespesa(
  props: Omit<DespesasProps, "id" | "created_at">
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

  const postCollection = collection(db(), "despesas");
  await addDoc(postCollection, inputData);
}

export async function createBulkDespesas(
  input: Omit<DespesasProps, "id" | "created_at">[]
) {
  const inputData = input.map((props) => ({
    data: new Date(props.data),
    data_termino: props.data_termino ? new Date(props.data_termino) : null,
    descricao: props.descricao,
    quantidade: props.quantidade,
    local: props.local,
    preco: props.preco,
    total: props.total,
    created_at: new Date(),
  }));

  const batch = writeBatch(db());

  inputData.forEach((data) => {
    const docRef = doc(collection(db(), "despesas"));
    batch.set(docRef, data);
  });

  return batch.commit();
}

export async function updateDespesa(props: Omit<DespesasProps, "created_at">) {
  const inputData = {
    data: new Date(props.data),
    data_termino: props.data_termino ? new Date(props.data_termino) : null,
    descricao: props.descricao,
    quantidade: props.quantidade,
    local: props.local,
    preco: props.preco,
    total: props.total,
  };

  const docRef = doc(db(), "despesas", props.id);
  await updateDoc(docRef, inputData);
}

export async function removeDespesa(id: string) {
  await deleteDoc(doc(db(), "despesas", id));
}

function firebaseMapper(doc: DocumentData): DespesasProps {
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

  return {
    id: doc.id,
    data: data.toDate(),
    data_termino: data_termino && data_termino.toDate(),
    descricao,
    local,
    quantidade,
    preco,
    total,
    created_at: created_at.toDate(),
  };
}

export async function listarTodosDespesas(
  filtros?: Filtros
): Promise<DespesasProps[]> {
  const despesasCollection = collection(db(), "despesas");
  const consulta = construirConsulta(despesasCollection, filtros);
  const querySnapshot = await getDocs(consulta);
  const despesas = querySnapshot.docs.map((doc) => firebaseMapper(doc));

  return despesas;
}

export async function buscarDespesaPorId(id: string) {
  const docRef = doc(db(), "despesas", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const despesa = firebaseMapper(docSnap);

    return despesa;
  }

  return null;
}

// Filtro: Total de Despesas por mês
export async function totalMonthlyExpenses(year: number) {
  const despesasCollection = collection(db(), "despesas");

  const filtroAnoInicio = where(
    "data",
    ">=",
    Timestamp.fromDate(new Date(`${year}-01-01`))
  );
  const filtroAnoFim = where(
    "data",
    "<=",
    Timestamp.fromDate(new Date(`${year}-12-31`))
  );

  const despesasQuery = query(
    despesasCollection,
    filtroAnoInicio,
    filtroAnoFim,
    orderBy("data", "asc")
  );

  const monthlyTotals = Object({});
  const querySnapshot = await getDocs(despesasQuery);
  querySnapshot.forEach((doc) => {
    const { data, total } = doc.data();
    const month = data.toDate().getMonth();

    const key = monthNumberToString(month);

    if (!monthlyTotals[key]) {
      monthlyTotals[key] = 0;
    }

    monthlyTotals[key] += total;
  });

  return monthlyTotals;
}

// fILTRO:período médio de compra para um determinado produto.
export const averagePurchasePeriod = async () => {
  const despesasCollection = collection(db(), "despesas");

  const consulta = query(despesasCollection, orderBy("data", "asc"));
  const querySnapshot = await getDocs(consulta);

  const itens = Object({});
  querySnapshot.forEach((doc) => {
    const { data, descricao } = doc.data();

    const key = descricao.toUpperCase();
    if (!itens[key]) {
      itens[key] = [];
    }

    itens[key].push(data.toDate());
  });

  const itensMedia = Object({});
  for (const item in itens) {
    if (itens[item].length <= 1) continue;

    const datas = itens[item];
    const totalDias = datas.length - 1;
    let totalIntervaloDias = 0;

    for (let i = 1; i < datas.length; i++) {
      const diffTime = Math.abs(datas[i] - datas[i - 1]);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      totalIntervaloDias += diffDays;
    }

    const mediaDias = totalIntervaloDias / totalDias;

    itensMedia[item] = mediaDias;
  }

  return itensMedia;
};

// Filtro: Total de Despesas por Local
export const getTotalExpensesByLocation = async () => {
  const data = await listarTodosDespesas();
  const expensesByLocation = {} as DespesasProps;

  // data.forEach((item) => {
  //   const { local, total } = item;
  //   if (local && total) {
  //     if (!expensesByLocation[local]) {
  //       expensesByLocation[local] = 0;
  //     }
  //     expensesByLocation[local] += total;
  //   }
  // });

  // return expensesByLocation;
};

// Filtro: Quantidade Vendida por Descrição
const getQuantitySoldByDescription = async () => {
  const data = await listarTodosDespesas();
  const quantitySoldByDescription = {};

  // data.forEach((item) => {
  //   const { descricao, quantidade } = item;
  //   if (descricao && quantidade) {
  //     if (!quantitySoldByDescription[descricao]) {
  //       quantitySoldByDescription[descricao] = 0;
  //     }
  //     quantitySoldByDescription[descricao] += quantidade;
  //   }
  // });

  // return quantitySoldByDescription;
};

// Filtro: Evolução dos Despesas ao Longo do Tempo
const getExpenseEvolutionOverTime = async () => {
  const data = await listarTodosDespesas();
  const evolutionOverTime = {};

  data.forEach((item) => {
    const { data, total } = item;
    // Implemente a lógica para agrupar os despesas por período (mês, trimestre, ano, etc.)
    // e calcule o total gasto em cada período
    // Adicione os dados no objeto evolutionOverTime
  });

  return evolutionOverTime;
};

// Filtro: Distribuição dos Preços dos Produtos
const getPriceDistribution = async () => {
  const data = await listarTodosDespesas();
  const priceDistribution = {};

  data.forEach((item) => {
    const { descricao, preco } = item;
    // Implemente a lógica para categorizar os preços dos produtos em intervalos
    // e conte quantos produtos estão em cada intervalo
    // Adicione os dados no objeto priceDistribution
  });

  return priceDistribution;
};

// Filtro: Relação entre Preço e Total
const getPriceTotalRelation = async () => {
  const data = await listarTodosDespesas();
  const priceTotalRelation = {};

  // data.forEach((item) => {
  //   const { descricao, preco, total } = item;
  //   if (descricao && preco && total) {
  //     if (!priceTotalRelation[descricao]) {
  //       priceTotalRelation[descricao] = [];
  //     }
  //     priceTotalRelation[descricao].push({ preco, total });
  //   }
  // });

  // return priceTotalRelation;
};

// Filtro: Quantidade Vendida e Total por Descrição
const getQuantitySoldAndTotalByDescription = async () => {
  const data = await listarTodosDespesas();
  const quantitySoldAndTotalByDescription = {};

  // data.forEach((item) => {
  //   const { descricao, quantidade, total } = item;
  //   if (descricao && quantidade && total) {
  //     if (!quantitySoldAndTotalByDescription[descricao]) {
  //       quantitySoldAndTotalByDescription[descricao] = [];
  //     }
  //     quantitySoldAndTotalByDescription[descricao].push({ quantidade, total });
  //   }
  // });

  // return quantitySoldAndTotalByDescription;
};

// Filtro: Comparação de Despesas por Categoria
const compareExpensesByCategory = async () => {
  const data = await listarTodosDespesas();
  const expensesByCategory = {};

  // data.forEach((item) => {
  //   const { categoria, total } = item;
  //   if (categoria && total) {
  //     if (!expensesByCategory[categoria]) {
  //       expensesByCategory[categoria] = 0;
  //     }
  //     expensesByCategory[categoria] += total;
  //   }
  // });

  // return expensesByCategory;
};

// Filtro: Top N Produtos Mais Vendidos
const getTopNBestSellingProducts = async (n: number) => {
  const data = await listarTodosDespesas();
  const products = {};

  // data.forEach((item) => {
  //   const { descricao, quantidade } = item;
  //   if (descricao && quantidade) {
  //     if (!products[descricao]) {
  //       products[descricao] = 0;
  //     }
  //     products[descricao] += quantidade;
  //   }
  // });

  // // Ordena os produtos mais vendidos
  // const sortedProducts = Object.keys(products).sort(
  //   (a, b) => products[b] - products[a]
  // );

  // // Retorna os primeiros N produtos
  // return sortedProducts.slice(0, n);
};

// Filtro: Relação entre Quantidade e Total
const getQuantityTotalRelation = async () => {
  const data = await listarTodosDespesas();
  const quantityTotalRelation = {};

  // data.forEach((item) => {
  //   const { quantidade, total } = item;
  //   if (quantidade && total) {
  //     const relation = total / quantidade;
  //     quantityTotalRelation[item.descricao] = relation;
  //   }
  // });

  // return quantityTotalRelation;
};

// Filtro: Despesas por Período
const getExpensesByPeriod = async (startDate: Date, endDate: Date) => {
  const data = await listarTodosDespesas();
  // const expensesByPeriod = [];

  // data.forEach((item) => {
  //   const { data: expenseDate, total } = item;
  //   if (expenseDate >= startDate && expenseDate <= endDate) {
  //     expensesByPeriod.push({ data: expenseDate, total });
  //   }
  // });

  // return expensesByPeriod;
};
