// import {
//   CollectionReference,
//   FieldPath,
//   OrderByDirection,
//   WhereFilterOp,
//   orderBy,
//   query,
//   where,
// } from 'firebase/firestore';

import * as firebaseFirestore from 'firebase/firestore';
import { DatabaseConfig, DatabaseWhereField, WhereOp } from '../../types';

type Collection = firebaseFirestore.CollectionReference<
  firebaseFirestore.DocumentData,
  firebaseFirestore.DocumentData
>;

const whereFilterOpMap: Record<WhereOp, firebaseFirestore.WhereFilterOp> = {
  //    '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in'
  like: 'array-contains',
  equal: '==',
};

export function queryBuild(collection: Collection, configs?: DatabaseConfig) {
  const { fn, groupBy, include, orderBy = {}, select, where = {} } = configs || {};
  const queries: firebaseFirestore.QueryConstraint[] = [];

  for (const [key, condition] of Object.entries(where)) {
    if (condition === undefined) continue;

    let column = key;
    let value: DatabaseWhereField = condition;
    let op: firebaseFirestore.WhereFilterOp = '==';

    if (typeof condition === 'object') {
      column = condition?.as || key;
      value = condition?.value !== undefined ? condition.value : undefined;
      op = whereFilterOpMap?.[condition?.op ?? 'equal'];
    }

    queries.push(firebaseFirestore.where(column, op, value));
  }

  Object.entries(orderBy).forEach(([property, value]) => {
    queries.push(firebaseFirestore.orderBy(property, value as firebaseFirestore.OrderByDirection));
  });

  return firebaseFirestore.query(collection, ...queries);
}

/*
  // let queryResult;

  // if (filtros?.where) {
  //   filtros.where.forEach(([field, op, value]) => {
  //     queryResult = query(collectionRef, where(field, op, value));
  //   });
  // }


  // return queryResult || collectionRef;
*/
