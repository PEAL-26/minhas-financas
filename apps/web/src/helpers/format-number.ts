export const formatCurrencyKz = (value: number) => {
  const formattedValue = new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return formattedValue.replace('AOA', 'Kz');
};
