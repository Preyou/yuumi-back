import { pgTable, unique, integer, varchar, boolean, text, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const permissions = pgTable("permissions", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "permissions_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 255 }).notNull(),
	path: varchar({ length: 100 }).notNull(),
	isPublic: boolean("is_public").default(false).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("permissions_path_unique").on(table.path),
]);
