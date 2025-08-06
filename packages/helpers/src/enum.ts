export function includesEnum<TEnum extends {}>(compare: TEnum, input: any) {
  return Object.values(compare)
    .map((value) => String(value))
    .includes(input);
}
