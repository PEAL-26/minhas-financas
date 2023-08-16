import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  where,
  doc,
  writeBatch,
  Timestamp,
  FieldPath,
  WhereFilterOp,
  OrderByDirection,
  CollectionReference,
  Query,
  QueryCompositeFilterConstraint,
} from "firebase/firestore";
import { db } from "@/libs/firebase";
import { monthNumberToString } from "@/helpers/converter-mes";

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

export async function createBulkGastos(
  input: Omit<GastosProps, "id" | "created_at">[]
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
    const docRef = doc(collection(db(), "gastos"));
    batch.set(docRef, data);
  });

  return batch.commit();
}

type Filtros = {
  where?: Array<[string | FieldPath, WhereFilterOp, unknown]>;
  orderBy?: Array<[string | FieldPath, OrderByDirection]>;
};

function construirConsulta(
  collectionRef: CollectionReference,
  filtros?: Filtros
) {
  let queryResult;

  if (filtros?.where) {
    filtros.where.forEach(([field, op, value]) => {
        queryResult = query(collectionRef, where(field, op, value));
    });
  }

  if (filtros?.orderBy) {
    filtros.orderBy.forEach(([campo, direcao]) => {
      queryResult = query(collectionRef, orderBy(campo, direcao));
    });
  }

  return queryResult || collectionRef;
}

export async function listarTodosGastos(
  filtros?: Filtros
): Promise<GastosProps[]> {
  const gastos: GastosProps[] = [];
  const gastosCollection = collection(db(), "gastos");

  const consulta = construirConsulta(gastosCollection, filtros);
  const querySnapshot = await getDocs(consulta);

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

// Filtro: Total de Gastos por mês
export async function totalMonthlyExpenses(year: number) {
  const gastosCollection = collection(db(), "gastos");

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

  const gastosQuery = query(
    gastosCollection,
    filtroAnoInicio,
    filtroAnoFim,
    orderBy("data", "asc")
  );

  const monthlyTotals = Object({});
  const querySnapshot = await getDocs(gastosQuery);
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
  const gastosCollection = collection(db(), "gastos");

  const consulta = query(gastosCollection, orderBy("data", "asc"));
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

// Filtro: Total de Gastos por Local
export const getTotalExpensesByLocation = async () => {
  const data = await listarTodosGastos();
  const expensesByLocation = {} as GastosProps;

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
  const data = await listarTodosGastos();
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

// Filtro: Evolução dos Gastos ao Longo do Tempo
const getExpenseEvolutionOverTime = async () => {
  const data = await listarTodosGastos();
  const evolutionOverTime = {};

  data.forEach((item) => {
    const { data, total } = item;
    // Implemente a lógica para agrupar os gastos por período (mês, trimestre, ano, etc.)
    // e calcule o total gasto em cada período
    // Adicione os dados no objeto evolutionOverTime
  });

  return evolutionOverTime;
};

// Filtro: Distribuição dos Preços dos Produtos
const getPriceDistribution = async () => {
  const data = await listarTodosGastos();
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
  const data = await listarTodosGastos();
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
  const data = await listarTodosGastos();
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

// Filtro: Comparação de Gastos por Categoria
const compareExpensesByCategory = async () => {
  const data = await listarTodosGastos();
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
  const data = await listarTodosGastos();
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
  const data = await listarTodosGastos();
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

// Filtro: Gastos por Período
const getExpensesByPeriod = async (startDate: Date, endDate: Date) => {
  const data = await listarTodosGastos();
  // const expensesByPeriod = [];

  // data.forEach((item) => {
  //   const { data: expenseDate, total } = item;
  //   if (expenseDate >= startDate && expenseDate <= endDate) {
  //     expensesByPeriod.push({ data: expenseDate, total });
  //   }
  // });

  // return expensesByPeriod;
};
