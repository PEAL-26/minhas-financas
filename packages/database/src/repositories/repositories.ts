import { AccountRepository } from './accounts';
import { CategoryRepository } from './categories';
import { ExpenseRepository } from './expenses';
import { IncomeRepository } from './incomes';
import { LocationRepository } from './locations';
import { TransactionRepository } from './transactions';
import { UserRepository } from './users';
import { WalletRepository } from './wallet';
import { WishlistRepository } from './wishlist';

export const repositories = {
  account: AccountRepository,
  category: CategoryRepository,
  expense: ExpenseRepository,
  income: IncomeRepository,
  location: LocationRepository,
  transaction: TransactionRepository,
  user: UserRepository,
  wallet: WalletRepository,
  wishlist: WishlistRepository,
};
