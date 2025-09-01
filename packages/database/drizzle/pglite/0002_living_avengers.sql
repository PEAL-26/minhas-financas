ALTER TABLE "transactions_expenses" ALTER COLUMN "expense_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions_incomes" ALTER COLUMN "income_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "note" text;--> statement-breakpoint
ALTER TABLE "incomes" ADD COLUMN "note" text;--> statement-breakpoint
ALTER TABLE "transactions_expenses" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "transactions_incomes" ADD COLUMN "description" text;