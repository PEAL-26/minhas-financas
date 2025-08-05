type ConvertTypes = 'emptyToNull' | 'emptyToUndefined' | 'nullToEmpty' | 'undefinedToEmpty';
interface CheckNullUndefinedValueOption {
  fn?: (value: any) => any;
  convert?: ConvertTypes;
}

export function checkNullUndefinedValue(input: any, options?: CheckNullUndefinedValueOption) {
  const { fn, convert } = options || {};

  const value = convertTo(input, convert);

  if (value === null) return null;
  if (value === undefined) return undefined;

  if (fn) {
    return fn(value);
  }

  return value;
}

function convertTo(value: any, type?: ConvertTypes) {
  if (!type) return value;

  if (type === 'emptyToNull' && String(value).trim() === '') {
    return null;
  }

  if (type === 'emptyToUndefined' && String(value).trim() === '') {
    return undefined;
  }

  if (type === 'nullToEmpty' && value === null) {
    return '';
  }

  if (type === 'undefinedToEmpty' && value === undefined) {
    return '';
  }

  return value;
}
