import { ExpenseSchemaType } from '@repo/types';
import { ExpenseRepository } from '../repositories/expenses';

export class ExpenseService {
  constructor(private expenseRepository: ExpenseRepository) {}

  create(schema: ExpenseSchemaType) {}

  update(schema: ExpenseSchemaType, id: string) {}

  remove(id: string) {}
}
