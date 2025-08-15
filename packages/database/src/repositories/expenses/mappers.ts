import { Expense } from '@repo/types/expense';

export function expenseToEntityMap(raw: any): Expense {
  // TODO Melhorar esse mapeamento
  return {
    id: raw.id,
    wishlist: raw.wishlist,
    income: raw.income,
    category: raw.category,
    description: raw.description,
    estimatedDate: raw.estimatedDate,
    priority: raw.priority,
    type: raw.type,
    recurrence: raw.recurrence,
    startDate: raw.startDate,
    endDate: raw.endDate,
    estimatedAmount: raw.estimatedAmount,
    quantity: raw.quantity,
    total: raw.total,
    prices: raw.prices,
    status: raw.status,
    createdAt: raw?.createdAt ? new Date(raw?.createdAt) : raw?.createdAt,
    updatedAt: raw?.updatedAt ? new Date(raw?.updatedAt) : raw?.updatedAt,
  };
}

export function expenseToDatabaseMap(expense: Expense) {
  // TODO Melhorar esse mapeamento
  return {
    wishlistId: expense.wishlist?.id,
    incomeId: expense.income?.id,
    categoryId: expense.category?.id,
    description: expense.description,
    estimatedDate: expense.estimatedDate,
    priority: expense.priority,
    type: expense.type,
    recurrence: expense.recurrence,
    startDate: expense.startDate,
    endDate: expense.endDate,
    estimatedAmount: expense.estimatedAmount,
    quantity: expense.quantity,
    total: expense.total,
    prices: expense.prices,
    status: expense.status,
  };
}
