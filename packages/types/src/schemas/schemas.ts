import { accountSchema } from './account';
import { categorySchema } from './category';
import { expenseSchema } from './expense';
import { incomeSchema } from './income';
import { locationSchema } from './location';
import { transactionSchema } from './transaction';
import { userSchema } from './user';
import { walletSchema } from './wallet';
import { wishlistSchema } from './wishlist';

export const schemaTypes = {
  account: accountSchema,
  category: categorySchema,
  expense: expenseSchema,
  income: incomeSchema,
  location: locationSchema,
  transaction: transactionSchema,
  user: userSchema,
  wallet: walletSchema,
  wishlist: wishlistSchema,
};
