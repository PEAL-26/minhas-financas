'use client';
import {
  parseAsBoolean,
  parseAsFloat,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString,
  useQueryState,
  type Options,
} from 'nuqs';

type ParseTypes = 'string' | 'int' | 'float' | 'date' | 'boolean';
type TType = string | number | Date | boolean;

const typeParsers = {
  string: parseAsString,
  int: parseAsInteger,
  float: parseAsFloat,
  date: parseAsIsoDateTime,
  boolean: parseAsBoolean,
};

const typeConverters = {
  int: <T extends TType = 'number'>(value: T | null) =>
    value !== null && value !== undefined ? Number(value) : null,
  float: <T extends TType = 'number'>(value: T | null) =>
    value !== null && value !== undefined ? Number(value) : null,
  date: <T extends TType = 'Date'>(value: T | null) =>
    value !== null && value !== undefined ? new Date(String(value)) : null,
  boolean: <T extends TType = 'boolean'>(value: T | null) =>
    value !== null && value !== undefined ? Boolean(value) : null,
  string: <T extends TType = 'string'>(value: T | null) =>
    value !== null && value !== undefined ? String(value) : null,
};

export function useGetQueryStateParams<T = string>(
  key: string,
  type: ParseTypes = 'string',
): T | undefined {
  const parser = typeParsers[type];
  const [value] = useQueryState(key, parser);
  return value === null ? undefined : (value as T);
}

export function useSetQueryStateParams<T extends TType = string>(
  key: string,
  parse: ParseTypes = 'string',
) {
  const parser = typeParsers[parse];
  const converter = typeConverters[parse];
  const [_, setValue] = useQueryState(key, parser);
  return (value: T | null, options?: Options) => setValue(converter<T>(value) as any, options);
}

export function useQueryStateParams<T extends TType = string>(
  key: string,
  parse: ParseTypes = 'string',
) {
  const parser = typeParsers[parse];
  const converter = typeConverters[parse];
  const [value, setValue] = useQueryState(key, parser);

  const returnSetValue = (value: T | null, options?: Options) =>
    setValue(converter<T>(value) as any, options);
  const newValue = value === null ? undefined : (value as unknown as T);
  return [newValue, returnSetValue] as const;
}
