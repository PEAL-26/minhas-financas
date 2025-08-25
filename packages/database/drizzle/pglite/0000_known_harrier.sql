CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"currencies" json,
	"site_url" text,
	"swift_code" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon" text,
	"color" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" text PRIMARY KEY NOT NULL,
	"wishlist_id" text,
	"income_id" text,
	"category_id" text,
	"description" text,
	"estimated_date" timestamp,
	"priority" integer DEFAULT 2,
	"type" text DEFAULT 'unique',
	"recurrence" integer,
	"start_date" timestamp,
	"end_date" timestamp,
	"estimated_amount" real DEFAULT 0 NOT NULL,
	"quantity" real DEFAULT 1 NOT NULL,
	"total" real DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'pending',
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expenses_prices" (
	"location_id" text NOT NULL,
	"expense_id" text NOT NULL,
	"amount" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "incomes" (
	"id" text PRIMARY KEY NOT NULL,
	"wallet_id" text,
	"description" text,
	"amount" real DEFAULT 0 NOT NULL,
	"type" text DEFAULT 'unique',
	"recurrence" integer,
	"duration" integer,
	"start_date" timestamp,
	"end_date" timestamp,
	"currency" varchar(3),
	"estimated_date_receipt" timestamp,
	"status" text DEFAULT 'pending',
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"country" text,
	"province" text,
	"city" text,
	"address" text,
	"coordinate" json,
	"contacts" json,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"date" timestamp NOT NULL,
	"total_amount" real DEFAULT 0 NOT NULL,
	"note" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions_expenses" (
	"transaction_id" text NOT NULL,
	"expense_id" text NOT NULL,
	"amount" real DEFAULT 0 NOT NULL,
	"quantity" real DEFAULT 1 NOT NULL,
	"total" real DEFAULT 0 NOT NULL,
	"location_id" integer,
	"income_id" text
);
--> statement-breakpoint
CREATE TABLE "transactions_incomes" (
	"transaction_id" text NOT NULL,
	"income_id" text NOT NULL,
	"amount" real DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text,
	"provider_id" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"account_id" text NOT NULL,
	"reference" text NOT NULL,
	"iban" text,
	"details" text,
	"currencies" json,
	"active" boolean DEFAULT true,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wallets_reference_unique" UNIQUE("reference"),
	CONSTRAINT "wallets_iban_unique" UNIQUE("iban")
);
--> statement-breakpoint
CREATE TABLE "wishlist" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" text DEFAULT 'unique' NOT NULL,
	"recurrence" integer,
	"category_id" text,
	"target_date" timestamp,
	"priority" integer DEFAULT 2,
	"expected_location_id" text,
	"estimated_cost" real,
	"quantity" real,
	"total" real,
	"status" text DEFAULT 'pending',
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wishlist_prices" (
	"wishlist_id" text,
	"location_id" text,
	"amount" real NOT NULL
);
