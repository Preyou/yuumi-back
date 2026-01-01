/* eslint-disable perfectionist/sort-objects */
import { sql } from 'drizzle-orm'
import { boolean, check, integer, pgTable, text, timestamp, unique, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({
      cache: 1,
      increment: 1,
      maxValue: 2147483647,
      minValue: 1,
      name: 'users_id_seq',
      startWith: 1,
    }),

  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),

  /* ======  createAt：常量，插入后永不可改（应用层约束）  ====== */
  createAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),

  /* ======  updateAt：自动刷新，禁止手动  ====== */
  updateAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    // 初始值 = now()
    .defaultNow()
    // 每次行更新时自动刷新
    .$onUpdate(() => sql`now()`),

  password: varchar({ length: 255 }).notNull(),
}, table => [
  unique('users_email_unique').on(table.email),
  check('users_age_check', sql`${table.age} > 0 and ${table.age} < 200`),
])

export const permissions = pgTable('permissions', {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({
      cache: 1,
      increment: 1,
      maxValue: 2147483647,
      minValue: 1,
      name: 'permissions_id_seq',
      startWith: 1,
    }),
  name: varchar({ length: 255 }).notNull(),
  path: varchar({ length: 100 }).notNull(),
  isPublic: boolean('is_public').notNull().default(false),
  description: text(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, table => [
  unique('permissions_path_unique').on(table.path),
])
