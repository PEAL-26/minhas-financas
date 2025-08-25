export function isEmpty(value: any) {
  if (value === null || value === undefined) return true;

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  if (typeof value === 'string') {
    return value?.trim() === '';
  }

  return false;
}
