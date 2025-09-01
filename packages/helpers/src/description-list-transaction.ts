export function descriptionListTransaction(item: any) {
  console.log(item);
  
  if (item.incomes?.length) {
    const { description, income } = item.incomes[0];
    const wallet = income?.wallet;
    const account = income?.wallet?.account;
    console.log({ description, income, wallet, account, t: item.incomes });
    return '';
  }

  if (item.expenses?.length) {
    const expenses = item.expenses.slice(3);
    console.log({ expenses });
    return '';
  }

  return '';
}
