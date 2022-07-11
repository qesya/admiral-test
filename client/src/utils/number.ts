export const displayCurrency = (
  number: number,
  format = 'en-US',
  currency?: string
) => {
  const formatter = new Intl.NumberFormat(format, {
    style: 'currency',
    currency: currency || 'USD',
  });

  return formatter.format(number);
};
