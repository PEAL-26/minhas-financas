import { checkNullUndefinedValue } from '@repo/helpers/checkers';
import * as locationMapper from './locations';

export function pricesToEntityMap(prices: any) {
  if (!prices) return [];

  return prices.map((price: any) => {
    return {
      location: checkNullUndefinedValue(price.location, {
        convert: 'emptyToNull',
        fn: (value) => {
          return locationMapper.toEntityMap(value);
        },
      }),
      amount: Number(price.amount),
    };
  });
}
