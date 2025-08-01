import { QueryKey } from './types';

export function destructQueryKeys(queryKey: QueryKey) {
  const queryKeys = queryKey
    .flatMap((key) => {
      if (typeof key === 'object') {
        const newKeysValue = Object.entries(key as any).map(([_, value]) => value);
        return [...newKeysValue];
      }

      return [key];
    })
    .filter((value) => value !== undefined && value !== null);

  return queryKeys;
}
