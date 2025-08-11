export function enumValidate(map: Record<string, { display: string }>) {
  return {
    error: `Valor inválido (deve ser ${Object.values(map)
      .map((v) => v.display)
      .join(', ')})`,
  };
}
