export function stringEmpty(str: any) {
  if (str === null || str === undefined) return '';

  return String(str);
}
