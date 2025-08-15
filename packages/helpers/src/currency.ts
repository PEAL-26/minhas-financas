interface Options {
  locales?: string | string[];
  currency?: string;
}

export const formatCurrency = (value?: number | null, options?: Options) => {
  const { locales = 'pt-AO', currency = 'AOA' } = options || {};
  const formattedValue = new Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);

  return currency === 'AOA' ? formattedValue.replace('AOA', 'Kz') : formattedValue;
};
