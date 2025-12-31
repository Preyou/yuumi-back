import { sql } from 'drizzle-orm'
import { check, integer, pgTable, unique, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull(),
  id: integer().primaryKey().generatedAlwaysAsIdentity({ cache: 1, increment: 1, maxValue: 2147483647, minValue: 1, name: 'users_id_seq', startWith: 1 }),
  name: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
}, table => [
  unique('users_email_unique').on(table.email),
  check('users_age_check', sql`${table.age} > 0 and ${table.age} < 200`),
])
