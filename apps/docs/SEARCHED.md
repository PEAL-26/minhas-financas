# Minhas Finanças | Pesquisas

## Libs

- [ElectricSQL](https://electric-sql.com/): é um mecanismo de sincronização do Postgres. Use-o para sincronizar subconjuntos dos seus dados do Postgres em aplicativos, serviços e ambientes locais.
- [PGlite](https://pglite.dev/docs/about) : PGlite é uma compilação WASM do Postgres compactada em uma biblioteca cliente TypeScript/JavaScript, que permite executar Postgres no navegador, Node.js e Bun, sem a necessidade de instalar outras dependências
- [zod](https://zod.dev/basics): para criar esquemas de validação para todas as entidades do banco de dados e garantir a integridade dos dados em toda a aplicação
- [drizzle](https://orm.drizzle.team/docs/overview): ORM com APIs de consulta relacionais e semelhantes a SQL , oferecendo o melhor dos dois mundos no acesso aos seus dados relacionais.
- [case-naming-converter](https://www.npmjs.com/package/case-naming-converter): Conversão de nomes ou propriedades de objetos de camelCase para snake_case e vice-versa


## Schema
- Criar o id, created e updated automaticamente, uuid com drizzle  

 id: p.serial().primaryKey(),

// columns.helpers.ts
const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
}

export const users = pgTable('users', {
  id: integer(),
  ...timestamps
})

export const posts = table(
  "posts",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    slug: t.varchar().$default(() => generateUniqueString(16)),
    title: t.varchar({ length: 256 }),
    ownerId: t.integer("owner_id").references(() => users.id),
  },
  (table) => [
    t.uniqueIndex("slug_idx").on(table.slug),
    t.index("title_idx").on(table.title),
  ]
);

function generateUniqueString(length: number = 12): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueString += characters[randomIndex];
  }
  return uniqueString;
}

import { json, pgTable } from "drizzle-orm/pg-core";
const table = pgTable('table', {
	json1: json(),
	json2: json().default({ foo: "bar" }),
	json3: json().default(sql`'{foo: "bar"}'::json`),
});

import { date, pgTable } from "drizzle-orm/pg-core";
const table = pgTable('table', {
	date: date(),
});


## Migrations

drizzle-kit generate                                     
1. read previous migration folders
2. find diff between current and previous schema
3. prompt developer for renames if necessary
4. generate SQL migration and persist to file

drizzle-kit migrate                                        
1. read migration.sql files in migrations folder  
2. fetch migration history from database 
3. pick previously unapplied migrations
4. apply new migration to the database 

// index.ts
import { drizzle } from "drizzle-orm/node-postgres"
import { migrate } from 'drizzle-orm/node-postgres/migrator';
const db = drizzle(process.env.DATABASE_URL);
await migrate(db);                                                     
  ├ 1. init database connection                             ┌──────────────────────────┐                                         
  └ 2. read migration.sql files in migrations folder 
    1. fetch migration history from database 
  ┌ 4. pick previously unapplied migrations 
  └ 5. apply new migration to the database 
[✓] done!  

drizzle-kit push


drizzle-kit pull

## Drizzle <> PGlite

npm i drizzle-orm @electric-sql/pglite
npm i -D drizzle-kit

Step 2 - Initialize the driver and make a query
import { drizzle } from 'drizzle-orm/pglite';
const db = drizzle();
await db.select().from(...);

If you need to provide your existing driver:
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
// In-memory Postgres
const client = new PGlite();
const db = drizzle({ client });
await db.select().from(users);


## Zod

try {
  Player.parse({ username: 42, xp: "100" });
} catch(error){
  if(error instanceof z.ZodError){
    error.issues; 
    /* [
      {
        expected: 'string',
        code: 'invalid_type',
        path: [ 'username' ],
        message: 'Invalid input: expected string'
      },
      {
        expected: 'number',
        code: 'invalid_type',
        path: [ 'xp' ],
        message: 'Invalid input: expected number'
      }
    ] */
  }
}