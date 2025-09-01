import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import { Transaction, TRANSACTION_TYPE_ENUM } from '@repo/types/transaction';
import { toDatabasePropertiesCommonMap, toEntityPropertiesCommonMap } from '../../helpers/map';
import * as expenseMappers from '../expenses';
import * as incomeMappers from '../incomes';
import * as locationMappers from '../locations';
import * as walletMappers from '../wallet';

export function toEntityMap(raw: any): Transaction {
  return {
    type: checkNullUndefinedValue(raw?.type, { convert: 'emptyToUndefined' }),
    date: checkNullUndefinedValue(raw?.date, { fn: (value) => new Date(value) }),
    wallet: checkNullUndefinedValue(raw.wallet, {
      convert: 'emptyToNull',
      fn: (value) => walletMappers.toEntityMap(value),
    }),
    incomes:
      raw.incomes?.map((item: any) => ({
        income: checkNullUndefinedValue(item.income, {
          convert: 'emptyToUndefined',
          fn: (value) => incomeMappers.toEntityMap(value),
        }),
        description: descriptionIncome(item?.description, item?.income),
        amount: checkNullUndefinedValue(item?.amount, {
          convert: 'emptyToUndefined',
          fn: (value) => Number(value),
        }),
      })) || [],
    expenses:
      raw.expenses?.map((item: any) => ({
        expense: checkNullUndefinedValue(item.expense, {
          convert: 'emptyToUndefined',
          fn: (value) => expenseMappers.toEntityMap(value),
        }),
        description: item?.description,
        amount: checkNullUndefinedValue(item?.amount, {
          convert: 'emptyToUndefined',
          fn: (value) => Number(value),
        }),
        quantity: checkNullUndefinedValue(item?.quantity, {
          convert: 'emptyToUndefined',
          fn: (value) => Number(value),
        }),
        total: checkNullUndefinedValue(item?.total, {
          convert: 'emptyToUndefined',
          fn: (value) => Number(value),
        }),
        location: checkNullUndefinedValue(item?.location, {
          convert: 'emptyToNull',
          fn: (value) => locationMappers.toEntityMap(value),
        }),
        income: checkNullUndefinedValue(item?.income, {
          convert: 'emptyToNull',
          fn: (value) => incomeMappers.toEntityMap(value),
        }),
      })) || [],
    totalAmount: checkNullUndefinedValue(raw?.totalAmount, {
      convert: 'emptyToUndefined',
      fn: (value) => Number(value),
    }),
    note: raw.note,
    ...toEntityPropertiesCommonMap(raw),
  };
}

export function toDatabaseMap(entity: Partial<Transaction>) {
  const incomes =
    entity?.incomes?.map((item) => ({
      incomeId: checkNullUndefinedValue(item.income, {
        convert: 'emptyToNull',
        fn: (value) => value?.id,
      }),
      description: checkNullUndefinedValue(item.description, {
        convert: 'emptyToNull',
        fn: (value) => String(value).trim(),
      }),
      amount: Number(item?.amount || 0),
    })) || [];

  const expenses =
    entity?.expenses?.map((item) => ({
      expenseId: checkNullUndefinedValue(item.expense, {
        convert: 'emptyToNull',
        fn: (value) => value?.id,
      }),
      description: descriptionExpense(
        item?.description,
        item?.expense,
        entity.expenses?.length || 0,
      ),
      amount: Number(item?.amount || 0),
      quantity: Number(item?.quantity || 1),
      total: Number(item?.amount || 0) * Number(item?.quantity || 1),
      locationId: checkNullUndefinedValue(item?.location, {
        convert: 'emptyToNull',
        fn: (value) => value?.id,
      }),
      incomeId: checkNullUndefinedValue(item?.income, {
        convert: 'emptyToNull',
        fn: (value) => value?.id,
      }),
    })) || [];

  return {
    type: checkNullUndefinedValue(entity.type, { convert: 'emptyToUndefined' }),
    date: checkNullUndefinedValue(entity.date, {
      convert: 'emptyToUndefined',
      fn: (value) => new Date(value).getTime(),
    }),
    walletId: checkNullUndefinedValue(entity.wallet, {
      convert: 'emptyToNull',
      fn: (value) => value?.id,
    }),
    incomes,
    expenses,
    totalAmount: calculateTotalAmount(entity?.type, incomes, expenses),
    note: checkNullUndefinedValue(entity?.note, {
      convert: 'emptyToNull',
      fn: (value) => String(value || '').trim(),
    }),
    ...toDatabasePropertiesCommonMap(entity),
  };
}

function calculateTotalAmount(
  type: TRANSACTION_TYPE_ENUM | undefined,
  incomes: { amount: number }[],
  expenses: { total: number }[],
) {
  if (!type) return 0;

  if (type === TRANSACTION_TYPE_ENUM.INCOME)
    return incomes.reduce((total, item) => total + item.amount, 0);

  if (type === TRANSACTION_TYPE_ENUM.EXPENSE)
    return expenses.reduce((total, item) => total + item.total, 0);
}

function descriptionIncome(description: string | undefined | null, income: any) {
  const descriptions = [
    income?.wallet?.account?.name || '',
    income?.wallet?.title || '',
    income?.description || '',
  ].filter((des) => String(des).trim() !== '');

  return description ? String(description).trim() : `${descriptions.join(' | ')}`;
}

function descriptionExpense(description: string | undefined | null, expense: any, length: number) {
  const descriptions = [expense?.category?.name || '', expense?.wishlist?.name || ''].filter(
    (des) => String(des).trim() !== '',
  );

  return description
    ? String(description).trim()
    : `${descriptions.join(' | ')} ${length > 2 ? ', mais...' : ''}`.trim();
}
