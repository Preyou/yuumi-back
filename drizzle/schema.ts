import { sql } from 'drizzle-orm'
import { pgTable, serial, smallint, timestamp, unique, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
  email: varchar({ length: 100 }),
  id: serial().primaryKey().notNull(),
  nickname: varchar({ length: 50 }),
  password: varchar({ length: 255 }).notNull(),
  status: smallint().default(1),
  updatedAt: timestamp('updated_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
  username: varchar({ length: 50 }).notNull(),
}, table => [
  unique('users_username_key').on(table.username),
  unique('users_email_key').on(table.email),
])
