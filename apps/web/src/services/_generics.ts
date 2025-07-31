// import {
//   CollectionReference,
//   FieldPath,
//   OrderByDirection,
//   WhereFilterOp,
//   orderBy,
//   query,
//   where,
// } from 'firebase/firestore';

export type Filtros = {
  // where?: Array<[string | FieldPath, WhereFilterOp, unknown]>;
  // orderBy?: Array<[string | FieldPath, OrderByDirection]>;
} & any;

export function construirConsulta(collectionRef: any/*CollectionReference*/, filtros?: Filtros) {
  // let queryResult;

  // if (filtros?.where) {
  //   filtros.where.forEach(([field, op, value]) => {
  //     queryResult = query(collectionRef, where(field, op, value));
  //   });
  // }

  // if (filtros?.orderBy) {
  //   filtros.orderBy.forEach(([campo, direcao]) => {
  //     queryResult = query(collectionRef, orderBy(campo, direcao));
  //   });
  // }

  // return queryResult || collectionRef;

  return {} as any
}

export type Replace<T, R> = Omit<T, keyof R> & R;
